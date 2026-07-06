import { useEffect, useState } from 'react'
import { allureR2BaseUrl, ciRepos, profile } from '../config.ts'
import {
  fetchWorkflowRuns,
  latestCompletedRunForWorkflow,
  latestRunPerWorkflow,
  relativeTime,
  runDuration,
  type WorkflowRun,
} from '../lib/github.ts'

type RunsByRepo = Record<string, WorkflowRun[] | 'error'>

function buildAllureUrl(
  repo: string,
  runId: number,
  suite: string | undefined,
): string {
  const base = allureR2BaseUrl.replace(/\/$/, '')
  const path = suite ? `${repo}/${runId}/${suite}/index.html` : `${repo}/${runId}/index.html`
  return `${base}/${path}`
}

function statusInfo(run: WorkflowRun): { cls: string; text: string } {
  if (run.status !== 'completed') return { cls: 'pill-running', text: run.status.replace('_', ' ') }
  switch (run.conclusion) {
    case 'success':
      return { cls: 'pill-pass', text: 'passed' }
    case 'failure':
      return { cls: 'pill-fail', text: 'failed' }
    case 'cancelled':
      return { cls: 'pill-neutral', text: 'cancelled' }
    default:
      return { cls: 'pill-neutral', text: run.conclusion ?? 'unknown' }
  }
}

export default function CiLab() {
  const [runs, setRuns] = useState<RunsByRepo>({})

  useEffect(() => {
    for (const { repo } of ciRepos) {
      fetchWorkflowRuns(profile.githubUser, repo)
        .then((all) =>
          setRuns((prev) => ({ ...prev, [repo]: latestRunPerWorkflow(all).slice(0, 3) })),
        )
        .catch(() => setRuns((prev) => ({ ...prev, [repo]: 'error' })))
    }
  }, [])

  return (
    <section className="section" id="ci-lab">
      <div className="container">
        <h2>Live CI Lab</h2>
        <p className="section-intro">
          Real pipelines, real results — fetched from the GitHub Actions API as you read this.
          Every framework runs lint, unit and E2E suites in CI. Click a run to inspect logs,
          reports and artifacts on GitHub.
        </p>
        <div className="ci-grid">
          {ciRepos.map(({ repo, label, stack, allureWorkflow, allureSuite }) => {
            const repoRuns = runs[repo]

            // Allure report link: find the latest successful nightly run and build the R2 URL
            const allureRun =
              allureWorkflow && Array.isArray(repoRuns)
                ? latestCompletedRunForWorkflow(repoRuns, allureWorkflow)
                : undefined
            const allureUrl =
              allureR2BaseUrl && allureRun
                ? buildAllureUrl(repo, allureRun.id, allureSuite)
                : undefined

            return (
              <article className="ci-card" key={repo}>
                <header className="ci-card-header">
                  <h3>{label}</h3>
                  <span className="ci-stack">{stack}</span>
                </header>
                {repoRuns === undefined && <p className="ci-note">Loading runs…</p>}
                {repoRuns === 'error' && (
                  <p className="ci-note">
                    Could not reach the GitHub API (rate limit). Check runs directly on{' '}
                    <a href={`${profile.github}/${repo}/actions`}>GitHub</a>.
                  </p>
                )}
                {Array.isArray(repoRuns) && (
                  <ul className="run-list">
                    {repoRuns.map((run) => {
                      const s = statusInfo(run)
                      return (
                        <li key={run.id}>
                          <a className="run-row" href={run.html_url} target="_blank" rel="noreferrer">
                            <span className={`pill ${s.cls}`}>{s.text}</span>
                            <span className="run-name">{run.name}</span>
                            <span className="run-meta">
                              {runDuration(run)} · {relativeTime(run.run_started_at)}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
                <footer className="ci-card-footer">
                  <a className="ci-all-link" href={`${profile.github}/${repo}/actions`} target="_blank" rel="noreferrer">
                    All runs →
                  </a>
                  {allureUrl && (
                    <a className="allure-link" href={allureUrl} target="_blank" rel="noreferrer">
                      📊 Allure report →
                    </a>
                  )}
                </footer>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

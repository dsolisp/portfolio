import { allureR2BaseUrl, profile } from '../config.ts'
import PipelineDiagram from './PipelineDiagram.tsx'

interface Stage {
  step: string
  title: string
  description: string
  tech: string[]
  parallel?: string[]
}

const stages: Stage[] = [
  {
    step: '01',
    title: 'Trigger & Orchestration',
    description:
      'Every push, pull request and nightly cron schedule fires GitHub Actions workflows ' +
      'defined as version-controlled .yml files in each repo (ci.yml, full-tests.yml, ' +
      'nightly.yml). Workflows checkout the code, provision Node/Java/Python toolchains ' +
      'and boot the dockerized practice app for hermetic UI runs.',
    tech: ['GitHub Actions', 'YAML workflows', 'cron schedules', 'Docker Compose'],
  },
  {
    step: '02',
    title: 'Parallel Execution',
    description:
      'Matrix jobs run the suites in parallel across four independent framework repos — ' +
      'UI E2E, API, visual regression, accessibility (Axe) and performance — each with ' +
      'continue-on-error isolation so one failing suite never blocks the rest.',
    tech: ['Matrix strategy', 'Hermetic SQLite', 'OpenTelemetry'],
    parallel: ['Cypress', 'Playwright', 'Java Selenium', 'Python Selenium'],
  },
  {
    step: '03',
    title: 'Reporting',
    description:
      'Each run generates a static Allure HTML report from the raw results, and a script ' +
      'distills machine-readable metrics — pass rate, test counts, duration, run id — ' +
      'into a compact summary.json per run.',
    tech: ['Allure', 'allure-commandline', 'summary.json'],
  },
  {
    step: '04',
    title: 'Storage',
    description:
      'Reports and metrics are pushed to Cloudflare R2 (S3-compatible object storage) with ' +
      'the AWS CLI pointed at the R2 endpoint. Allure HTML lands at {repo}/{run_id}/index.html ' +
      'on a public bucket; summary.json metrics go to a separate metrics bucket keyed by run.',
    tech: ['Cloudflare R2', 'S3 API', 'aws s3 cp'],
  },
  {
    step: '05',
    title: 'Presentation',
    description:
      'This site queries the GitHub REST API in the browser for the latest workflow runs per ' +
      'repo (status, duration, timing) and deep-links each successful run to its Allure report ' +
      'on R2 — no backend, no polling service: static React on GitHub Pages over live APIs.',
    tech: ['GitHub REST API', 'React + Vite', 'GitHub Pages'],
  },
]

export default function Architecture() {
  return (
    <section className="section" id="architecture">
      <div className="container">
        <h2>CI/CD Pipeline Architecture</h2>
        <p className="section-intro">
          The end-to-end data flow behind the Live CI Lab above: how a git push becomes a
          public, verifiable test report. Five stages, four test stacks, zero servers to
          maintain.
        </p>
        <PipelineDiagram />
        <ol className="arch-flow">
          {stages.map((s, i) => (
            <li className="arch-node" key={s.step}>
              <div className="arch-node-inner">
                <header className="arch-node-header">
                  <span className="arch-step">{s.step}</span>
                  <h3>{s.title}</h3>
                </header>
                {s.parallel && (
                  <div className="arch-parallel" aria-label="Suites running in parallel">
                    {s.parallel.map((p) => (
                      <span className="arch-lane" key={p}>{p}</span>
                    ))}
                  </div>
                )}
                <p className="arch-desc">{s.description}</p>
                <ul className="tag-list">
                  {s.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              {i < stages.length - 1 && (
                <div className="arch-arrow" aria-hidden="true">
                  ▼
                </div>
              )}
            </li>
          ))}
        </ol>
        <p className="arch-footnote">
          See it live: the <a href="#ci-lab">CI Lab</a> cards are rendered from stage 05 in
          real time, Allure reports are served straight from{' '}
          <a href={allureR2BaseUrl} target="_blank" rel="noreferrer">
            the R2 bucket
          </a>
          , and every workflow file is public on{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  )
}

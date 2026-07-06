// Minimal GitHub REST client for public data. No auth token: unauthenticated
// requests are limited to 60/hr per IP, so every call is cached in
// sessionStorage for CACHE_TTL_MS.

const API = 'https://api.github.com'
const CACHE_TTL_MS = 10 * 60 * 1000

interface CacheEntry<T> {
  at: number
  data: T
}

async function cachedFetch<T>(key: string, url: string): Promise<T> {
  const cacheKey = `gh:${key}`
  try {
    const raw = sessionStorage.getItem(cacheKey)
    if (raw) {
      const entry = JSON.parse(raw) as CacheEntry<T>
      if (Date.now() - entry.at < CACHE_TTL_MS) return entry.data
    }
  } catch {
    // ignore cache read errors
  }
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`)
  const data = (await res.json()) as T
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // ignore cache write errors (quota / private mode)
  }
  return data
}

export interface WorkflowRun {
  id: number
  name: string
  display_title: string
  status: string
  conclusion: string | null
  html_url: string
  run_started_at: string
  updated_at: string
  head_branch: string
  event: string
}

export async function fetchWorkflowRuns(
  owner: string,
  repo: string,
  perPage = 15,
): Promise<WorkflowRun[]> {
  const data = await cachedFetch<{ workflow_runs: WorkflowRun[] }>(
    `runs:${owner}/${repo}`,
    `${API}/repos/${owner}/${repo}/actions/runs?per_page=${perPage}`,
  )
  return data.workflow_runs
}

export interface RepoInfo {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
}

export async function fetchUserRepos(user: string): Promise<RepoInfo[]> {
  return cachedFetch<RepoInfo[]>(
    `repos:${user}`,
    `${API}/users/${user}/repos?per_page=100&sort=updated`,
  )
}

/**
 * Returns the latest completed run whose name matches `workflowName`,
 * or undefined if none found.
 */
export function latestCompletedRunForWorkflow(
  runs: WorkflowRun[],
  workflowName: string,
): WorkflowRun | undefined {
  return runs.find(
    (r) => r.name === workflowName && r.status === 'completed' && r.conclusion === 'success',
  )
}

/** Latest run per workflow name, newest first. */
export function latestRunPerWorkflow(runs: WorkflowRun[]): WorkflowRun[] {
  const seen = new Map<string, WorkflowRun>()
  for (const run of runs) {
    if (!seen.has(run.name)) seen.set(run.name, run)
  }
  return [...seen.values()]
}

export function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 48) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 60) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function runDuration(run: WorkflowRun): string {
  const ms = new Date(run.updated_at).getTime() - new Date(run.run_started_at).getTime()
  if (!Number.isFinite(ms) || ms <= 0) return ''
  const totalSec = Math.round(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return min > 0 ? `${min}m ${sec}s` : `${sec}s`
}

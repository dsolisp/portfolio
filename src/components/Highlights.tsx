import { useEffect, useState } from 'react'
import { profile } from '../config.ts'
import { fetchUserRepos } from '../lib/github.ts'

interface Stat {
  value: string
  label: string
}

const staticStats: Stat[] = [
  { value: '5', label: 'Language stacks (TS, Python, Java, C#, JS)' },
  { value: '7', label: 'Test frameworks in production-style CI' },
  { value: 'UI · API · a11y · visual · perf', label: 'Test types covered' },
]

export default function Highlights() {
  const [repoStat, setRepoStat] = useState<Stat>({ value: '—', label: 'Public repos on GitHub' })

  useEffect(() => {
    fetchUserRepos(profile.githubUser)
      .then((repos) =>
        setRepoStat({ value: String(repos.length), label: 'Public repos on GitHub' }),
      )
      .catch(() => {
        // leave placeholder if the API is unavailable
      })
  }, [])

  return (
    <section className="section" aria-label="Highlights">
      <div className="container stats-grid">
        {[repoStat, ...staticStats].map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

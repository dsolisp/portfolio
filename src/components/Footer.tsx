import { architectureLink, profile } from '../config.ts'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          {profile.name} · {profile.location}
        </p>
        <nav aria-label="Footer links">
          <a href={architectureLink.href}>Architecture</a>
          <a href={profile.dashboardUrl} target="_blank" rel="noreferrer">
            QA Dashboard
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
        <p className="footer-note">
          Static site (React + Vite) on GitHub Pages · live data from the GitHub REST API ·{' '}
          <a href={`${profile.github}/portfolio`} target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </div>
    </footer>
  )
}

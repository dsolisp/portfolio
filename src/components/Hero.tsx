import { architectureLink, profile } from '../config.ts'

export default function Hero() {
  return (
    <header className="hero">
      <div className="container hero-inner">
        <p className="hero-badge"><span>⚖</span> Gavel-backed QA portfolio</p>
        <p className="hero-location">{profile.location} · Remote-ready QA Engineering</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-pitch">{profile.pitch}</p>
        <nav className="hero-actions" aria-label="Primary links">
          <a className="btn btn-primary" href={profile.dashboardUrl} target="_blank" rel="noreferrer">
            Live QA Dashboard
          </a>
          <a className="btn" href={architectureLink.href}>
            {architectureLink.label}
          </a>
          <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume (PDF)
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <div className="hero-proof" aria-label="Portfolio proof points">
          <span>Live CI evidence</span>
          <span>Cross-stack frameworks</span>
          <span>Open-source QA governance</span>
        </div>
      </div>
    </header>
  )
}

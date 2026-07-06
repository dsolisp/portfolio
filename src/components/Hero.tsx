import { profile } from '../config.ts'

export default function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <p className="hero-location">{profile.location}</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-pitch">{profile.pitch}</p>
        <nav className="hero-actions" aria-label="Primary links">
          <a className="btn btn-primary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume (PDF)
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

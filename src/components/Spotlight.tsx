import { gavelSpotlight as g } from '../config.ts'

export default function Spotlight() {
  return (
    <section className="section section-alt" id="gavel">
      <div className="container">
        <h2>Open Source: Gavel &amp; Bailiff</h2>
        <div className="spotlight-grid">
          <article className="spotlight-card">
            <header className="spotlight-header">
              <h3>{g.name}</h3>
              <span className="pill pill-pass">on npm</span>
            </header>
            <p>{g.summary}</p>
            <p className="spotlight-links">
              <a className="btn" href={g.repoUrl} target="_blank" rel="noreferrer">
                Repository
              </a>
              <a className="btn" href={g.npmUrl} target="_blank" rel="noreferrer">
                @dsolisp/gavel on npm
              </a>
            </p>
          </article>
          <article className="spotlight-card">
            <header className="spotlight-header">
              <h3>{g.bailiff.name}</h3>
              <span className="pill pill-neutral">{g.bailiff.status}</span>
            </header>
            <p>{g.bailiff.summary}</p>
            <p className="spotlight-links">
              <a className="btn" href={g.bailiff.architectureUrl} target="_blank" rel="noreferrer">
                Architecture doc
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

import { projects } from '../config.ts'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2>Projects</h2>
        <p className="section-intro">
          Each framework tests the same applications (SauceDemo, a local practice app, public REST
          APIs, SQLite) under shared architecture standards, so stacks are directly comparable.
        </p>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.name}>
              <header className="project-header">
                <h3>
                  {p.repoUrl ? (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                {p.status === 'private' && (
                  <span className="pill pill-neutral">source on request</span>
                )}
              </header>
              <p className="project-tagline">{p.tagline}</p>
              <p>{p.description}</p>
              <ul className="tag-list">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

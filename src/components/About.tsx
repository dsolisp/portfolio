import { technologies } from '../config.ts'

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <h2>About</h2>
        <p className="section-intro">
          QA automation engineer focused on maintainable test architecture: Page Object Model with
          mirrored locators, shared standards across stacks, hermetic test data, and CI-first
          workflows with Allure reporting and Docker/Selenium Grid-ready runs. Active portfolio
          since 2024 — Python and Java are the longest-running stacks, Playwright the most
          iterated, and the API/LLM masterclasses the most recent work on AI-era test engineering.
        </p>
        <h3 className="tech-heading">Technologies</h3>
        <ul className="tag-list tag-list-lg">
          {technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

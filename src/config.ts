export const profile = {
  name: 'Daniel Solis',
  title: 'Senior QA Automation Engineer / SDET',
  location: 'Costa Rica',
  pitch:
    'I build production-style QA automation systems that companies can verify in public: ' +
    'cross-stack frameworks, CI dashboards, Allure evidence, and open-source quality governance for AI-era teams.',
  github: 'https://github.com/dsolisp',
  githubUser: 'dsolisp',
  linkedin: 'https://www.linkedin.com/in/danieleduardosolisprado/',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  dashboardUrl: 'https://dsolisp.github.io/qa-dashboard/',
  email: null as string | null,
}

/**
 * Public base URL of the Cloudflare R2 bucket `qa-portfolio-allure`.
 * Set this to your `vars.R2_PUBLIC_URL` value from GitHub Actions
 * (e.g. "https://pub-xxxx.r2.dev" or your custom domain).
 * Leave empty to hide Allure links.
 */
export const allureR2BaseUrl = 'https://pub-525e3f872a0d44b7821f03ce22e3af44.r2.dev'

export interface CiRepo {
  repo: string
  label: string
  stack: string
  /**
   * Workflow name that uploads Allure HTML to R2 (e.g. "Nightly Test Suite").
   * When set, the CI card shows an Allure report link for the latest matching run.
   */
  allureWorkflow?: string
  /**
   * Optional sub-path within the run folder (used by Cypress matrix builds).
   * e.g. "sauce" → R2 path becomes {repo}/{run_id}/sauce/index.html
   */
  allureSuite?: string
}

/** Public repos whose GitHub Actions runs are shown live. */
export const ciRepos: CiRepo[] = [
  {
    repo: 'PlaywrightProject',
    label: 'Playwright',
    stack: 'TypeScript · Playwright · Vitest',
    allureWorkflow: 'Nightly Test Suite',
  },
  {
    repo: 'CypressProject',
    label: 'Cypress',
    stack: 'TypeScript · Cypress',
    allureWorkflow: 'Full Test Suite',
    allureSuite: 'sauce',
  },
  {
    repo: 'JavaSeleniumProject',
    label: 'Java Selenium',
    stack: 'Java 21 · JUnit 5 · Selenium',
    allureWorkflow: 'Nightly Test Suite',
  },
  {
    repo: 'PythonSeleniumProject',
    label: 'Python Selenium',
    stack: 'Python · pytest · Selenium',
    allureWorkflow: 'QA Automation CI/CD Pipeline',
  },
  { repo: 'gavel', label: 'Gavel', stack: 'Node.js · npm package' },
]

export interface Project {
  name: string
  tagline: string
  description: string
  tags: string[]
  repoUrl?: string
  extraLinks?: { label: string; url: string }[]
  status?: 'live' | 'in-design' | 'private'
}

export const projects: Project[] = [
  {
    name: 'PlaywrightProject',
    tagline: 'Flagship E2E framework',
    description:
      'E2E UI, API/schema, unit, BDD (playwright-bdd), visual, accessibility (Axe) and performance testing with OpenTelemetry tracing. Page Object Model with mirrored locators, fixtures for DI, Allure reporting.',
    tags: ['TypeScript', 'Playwright', 'Vitest', 'Allure', 'OpenTelemetry'],
    repoUrl: 'https://github.com/dsolisp/PlaywrightProject',
    status: 'live',
  },
  {
    name: 'PythonSeleniumProject',
    tagline: 'Longest-running stack (2024)',
    description:
      'UI (Selenium + Playwright smoke), API, DB, visual regression, accessibility, Locust load testing and flaky-test history tracking. Hermetic runs against a shared local practice app and SQLite.',
    tags: ['Python', 'pytest', 'Selenium', 'Locust'],
    repoUrl: 'https://github.com/dsolisp/PythonSeleniumProject',
    status: 'live',
  },
  {
    name: 'JavaSeleniumProject',
    tagline: 'Enterprise-style Java stack',
    description:
      'UI, REST Assured API, DB, visual (Shutterbug), Axe accessibility and Gatling load tests. Maven, JUnit 5, Docker/Selenium Grid-ready, optional Cucumber BDD layer.',
    tags: ['Java 21', 'JUnit 5', 'REST Assured', 'Gatling'],
    repoUrl: 'https://github.com/dsolisp/JavaSeleniumProject',
    status: 'live',
  },
  {
    name: 'CypressProject',
    tagline: 'Component-era web testing',
    description:
      'UI, API and unit specs, visual image-diff, accessibility, hermetic SQLite data layer and OpenTelemetry wired into the Cypress config. Includes an optional Lighthouse performance pipeline.',
    tags: ['TypeScript', 'Cypress', 'Lighthouse'],
    repoUrl: 'https://github.com/dsolisp/CypressProject',
    status: 'live',
  },
  {
    name: 'CSharpSeleniumProject',
    tagline: '.NET framework library',
    description:
      'Framework library plus unit, API, web and SpecFlow BDD tests with FluentAssertions and Allure — same applications under test as the Python stack, so results are directly comparable.',
    tags: ['C# / .NET', 'Selenium', 'SpecFlow'],
    status: 'private',
  },
  {
    name: 'LLM Testing & Agentic Engineering Masterclass',
    tagline: 'AI-era QA curriculum',
    description:
      'Zero-to-Hero roadmap for testing LLM applications: DeepEval, Ragas, RAG evaluation, self-healing locators and OpenTelemetry for agents.',
    tags: ['Python', 'DeepEval', 'Ragas', 'Agentic'],
    repoUrl: 'https://github.com/dsolisp/LLM-Testing-and-Agentic-Engineering-Masterclass',
    status: 'live',
  },
  {
    name: 'API Automation Engineering Masterclass',
    tagline: 'API SDET curriculum',
    description:
      'Zero-to-Hero API testing guide: REST Assured, schema validation vs consumer-driven contracts, k6 performance and session-reuse patterns.',
    tags: ['Java', 'REST Assured', 'k6'],
    status: 'private',
  },
]

export const gavelSpotlight = {
  name: 'Gavel',
  npmUrl: 'https://www.npmjs.com/package/@dsolisp/gavel',
  repoUrl: 'https://github.com/dsolisp/gavel',
  summary:
    'Gavel is my open-source QA discipline engine for AI coding agents. It enforces a Test ' +
    'Constitution — layered page objects, accessibility-first locators, no sleeps, DI via ' +
    'fixtures, factories for test data — across Playwright, Selenium, Cypress, WebdriverIO, ' +
    'Cucumber, Robot and pytest. It audits suites for dead code, reviews test diffs, parses ' +
    'CI reports (JUnit, Allure, Playwright, Cypress) and clusters failures into drift vs bug vs env.',
  bailiff: {
    name: 'Bailiff',
    status: 'In design',
    summary:
      'Planned sibling repo. The boundary rule: everything inside the test codebase (specs, page ' +
      'objects, locators, factories) belongs to Gavel; everything outside it (CI orchestration, ' +
      'bug reports, tickets, environments, credentials) belongs to Bailiff. Gavel judges the ' +
      'test code; Bailiff runs the courtroom around it.',
    architectureUrl: 'https://github.com/dsolisp/gavel/blob/main/docs/ARCHITECTURE.md',
  },
}

export const technologies = [
  'Python', 'Java', 'C#', 'TypeScript', 'JavaScript',
  'Playwright', 'Selenium WebDriver', 'Cypress', 'pytest', 'JUnit 5', 'Vitest',
  'SpecFlow', 'Cucumber', 'REST Assured', 'k6', 'Locust', 'Gatling',
  'DeepEval', 'Ragas', 'Allure', 'GitHub Actions', 'Docker', 'Selenium Grid',
  'axe-core', 'OpenTelemetry', 'SQLite', 'Maven', 'pnpm',
]

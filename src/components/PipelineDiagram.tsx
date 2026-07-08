const suites = ['Cypress', 'Playwright', 'Java Selenium', 'Python Selenium']
const suiteY = [18, 66, 114, 162] // stacked lane boxes, h=40

/** Two-line node box centered vertically on y=110. */
function Node({ x, title, sub }: { x: number; title: string; sub: string }) {
  const cx = x + 64
  return (
    <g>
      <rect className="abox" x={x} y={78} width={128} height={64} rx={12} />
      <text x={cx} y={104} textAnchor="middle">{title}</text>
      <text className="asub" x={cx} y={122} textAnchor="middle">{sub}</text>
    </g>
  )
}

function Arrow({ from, to }: { from: number; to: number }) {
  return <line className="aflow" x1={from} y1={110} x2={to} y2={110} markerEnd="url(#arch-arrowhead)" />
}

/**
 * End-to-end CI/CD data-flow diagram as a theme-aware inline SVG
 * (no Mermaid.js dependency; styled via CSS variables in styles.css).
 */
export default function PipelineDiagram() {
  return (
    <div className="arch-svg-wrap">
      <svg
        className="arch-svg"
        viewBox="0 0 928 220"
        role="img"
        aria-label="CI/CD data flow: GitHub events trigger GitHub Actions workflows, which run Cypress, Playwright, Java Selenium and Python Selenium suites in parallel; results become Allure reports and summary.json metrics, stored on Cloudflare R2 and presented by the portfolio site."
      >
        <defs>
          <marker id="arch-arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path className="ahead" d="M0 0 L7 3.5 L0 7 Z" />
          </marker>
        </defs>

        <Node x={4} title="GitHub events" sub="push · PR · nightly cron" />
        <Arrow from={132} to={158} />
        <Node x={162} title="GitHub Actions" sub=".yml workflow jobs" />

        {/* fan-out to parallel suites */}
        {suiteY.map((y, i) => (
          <g key={suites[i]}>
            <path
              className="aflow"
              d={`M290 110 C 306 110, 304 ${y + 20}, 316 ${y + 20}`}
              markerEnd="url(#arch-arrowhead)"
            />
            <rect className="alane" x={320} y={y} width={128} height={40} rx={10} />
            <text className="alane-text" x={384} y={y + 24} textAnchor="middle">{suites[i]}</text>
            <path
              className="aflow"
              d={`M448 ${y + 20} C 460 ${y + 20}, 458 110, 474 110`}
              markerEnd="url(#arch-arrowhead)"
            />
          </g>
        ))}

        <Node x={478} title="Allure report" sub="+ summary.json" />
        <Arrow from={606} to={632} />
        <Node x={636} title="Cloudflare R2" sub="S3-compatible storage" />
        <Arrow from={764} to={790} />
        <Node x={794} title="Portfolio site" sub="status + report links" />
      </svg>
    </div>
  )
}

import { useEffect, useState } from 'react'

// Single theme variable (README §Design Tokens). Spotlight glows derive from the same yellow
// via the --accent-rgb CSS var in index.css, so they stay in sync.
const ACCENT = '#EAB308'

// ---- Static content (ported from the prototype's logic class) ----

const CARD_DATA = [
  {
    id: 'work',
    label: 'Work',
    tiles: [
      { label: 'educa', x: -16, y: 8, rot: -11 },
      { label: 'sherpa', x: 0, y: -2, rot: 1, accent: true },
      { label: 'goose', x: 16, y: 7, rot: 10 },
    ],
  },
  {
    id: 'experience',
    label: 'How I help',
    tiles: [
      { label: 'wix', x: -11, y: 5, rot: -8, accent: true },
      { label: 'mvp', x: 11, y: 4, rot: 9 },
    ],
  },
  {
    id: 'now',
    label: 'Now',
    tiles: [
      { label: 'ship', x: -9, y: 3, rot: -7 },
      { label: 'build', x: 9, y: 5, rot: 8 },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    tiles: [
      { label: 'gh', x: -14, y: 6, rot: -10 },
      { label: '@', x: 0, y: -3, rot: 0, accent: true },
      { label: 'mail', x: 14, y: 6, rot: 10 },
    ],
  },
]

const PROJECTS = [
  { n: '01', name: 'educa.social', desc: 'A social platform for schools & educators', host: 'educa.social', url: 'https://educa.social/' },
  { n: '02', name: 'Sherpa42', desc: 'Digital agency — sites & product work', host: 'sherpa42.com.br', url: 'https://www.sherpa42.com.br/' },
  { n: '03', name: 'Goose Island — Find Beer', desc: 'Product locator app', host: 'gooseisland.com', url: 'https://www.gooseisland.com/find-beer' },
]

const FEATURED = [
  {
    title: 'educa.social',
    tag: 'FOUNDING ENGINEER',
    host: 'educa.social',
    url: 'https://educa.social/',
    desc: 'A social platform connecting schools, teachers, and families. I led the product build end to end — architecture, real-time feeds, and the interface — taking it from concept to a live product used by real school communities.',
    shots: [
      { id: 'shot-educa-1', src: '/shots/educa-1.png', alt: 'educa.social — home dashboard with generated school content', portrait: true },
      { id: 'shot-educa-2', src: '/shots/educa-2.png', alt: 'educa.social — brand identity setup screen', portrait: true },
      { id: 'shot-educa-3', src: '/shots/educa-3.png', alt: 'educa.social — visual style selection screen', portrait: true },
    ],
  },
  {
    title: 'Sherpa42',
    tag: 'PRODUCT & ENGINEERING',
    host: 'sherpa42.com.br',
    url: 'https://www.sherpa42.com.br/',
    desc: 'Digital agency delivering websites and product work for clients. Hands-on across design and build, shipping polished, performant sites on tight timelines.',
    shots: [{ id: 'shot-sherpa-1', placeholder: 'Drop a screenshot' }],
  },
]

const SERVICES = [
  { n: '01', title: 'MVP, built fast', desc: 'From scoping to a launched v1 — the fastest path to something real users can touch.' },
  { n: '02', title: 'Web & mobile apps', desc: 'Full-stack product engineering: frontend, backend, and the infrastructure underneath.' },
  { n: '03', title: 'Design that ships', desc: 'Interface and UX handled too — no waiting on a separate designer to move.' },
  { n: '04', title: 'Technical partner', desc: 'A founding-level engineer in the room: architecture calls, trade-offs, and momentum.' },
]

const NOW_ITEMS = [
  { n: '01', text: 'Open to 1–2 new founder partnerships this quarter.' },
  { n: '02', text: 'Shipping product end to end at Wix — staying sharp on scale.' },
  { n: '03', text: 'Growing educa.social and helping early teams move faster.' },
]

const CONTACTS = [
  { kind: 'EMAIL', handle: 'hello@matheus.cc', url: 'mailto:hello@matheus.cc', target: '_self' },
  { kind: 'GITHUB', handle: '@matheuswix', url: 'https://github.com/matheuswix', target: '_blank' },
  { kind: 'INSTAGRAM', handle: '@soumatheusalexandre', url: 'https://instagram.com/soumatheusalexandre', target: '_blank' },
]

// Per-tile transform, computed from the hovered flag (mirrors mkTile in the prototype).
function tileStyle(tile, hovered) {
  const spread = hovered ? 1.8 : 1
  const sc = hovered ? 1.06 : 1
  const x = tile.x * spread
  const y = tile.y + (hovered ? -9 : 0)
  const rot = tile.rot * (hovered ? 1.32 : 1)
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '52px',
    height: '66px',
    borderRadius: '10px',
    background: tile.accent
      ? 'repeating-linear-gradient(125deg,#F4E6AE 0 5px,#FBF4D8 5px 11px)'
      : 'repeating-linear-gradient(125deg,#ECECEC 0 5px,#F7F7F7 5px 11px)',
    border: '1px solid ' + (tile.accent ? '#EBD98A' : '#E7E7E7'),
    boxShadow: hovered ? '0 14px 26px rgba(0,0,0,.12)' : '0 4px 10px rgba(0,0,0,.05)',
    transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rot}deg) scale(${sc})`,
    transition: 'transform .5s cubic-bezier(.2,.9,.25,1), box-shadow .4s ease',
    zIndex: hovered ? 5 : 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
}

function Card({ card, index, hovered, onHover, onOpen }) {
  const isHovered = hovered === card.id

  // Spotlight position is written straight to the DOM (CSS vars + opacity) to avoid
  // re-rendering on every mouse move — see README §State Management.
  const handleMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', e.clientX - r.left + 'px')
    el.style.setProperty('--my', e.clientY - r.top + 'px')
    el.querySelectorAll('[data-spotlight]').forEach((s) => (s.style.opacity = '1'))
  }
  const handleLeave = (e) => {
    e.currentTarget.querySelectorAll('[data-spotlight]').forEach((s) => (s.style.opacity = '0'))
    onHover(null, card.id)
  }

  return (
    <div
      className="card"
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onClick={() => onOpen(card.id)}
    >
      <div className="spotlight spotlight-border" aria-hidden="true" data-spotlight="1" />
      <div className="spotlight spotlight-fill" aria-hidden="true" data-spotlight="1" />
      <div
        className="tile-cluster"
        style={{ animationDelay: (0.06 * index + 0.05).toFixed(2) + 's' }}
      >
        {card.tiles.map((tile, ti) => (
          <div key={ti} style={tileStyle(tile, isHovered)}>
            <span className="tile-label">{tile.label}</span>
          </div>
        ))}
      </div>
      <div className="card-label">
        <span>{card.label}</span>
        <span className="arrow">&#8599;</span>
      </div>
    </div>
  )
}

function WorkModal() {
  return (
    <div>
      <div className="section-index">01 / WORK</div>
      <h2>Things I&#39;ve shipped with founders</h2>
      <p className="modal-subtitle">Products taken from idea to live — design, build, and launch.</p>

      <div className="project-list">
        {PROJECTS.map((p) => (
          <a key={p.n} className="project-row" href={p.url} target="_blank" rel="noopener noreferrer">
            <span className="row-index">{p.n}</span>
            <span className="project-main">
              <span className="project-name">{p.name}</span>
              <span className="project-desc">{p.desc}</span>
            </span>
            <span className="project-host">{p.host}</span>
            <span className="row-arrow">&#8599;</span>
          </a>
        ))}
      </div>

      <div className="featured-list">
        {FEATURED.map((f) => (
          <div key={f.title} className="featured-entry">
            <div className="featured-title-row">
              <span className="featured-title">{f.title}</span>
              <span className="tag">{f.tag}</span>
              <span className="spacer" />
              <a className="featured-host" href={f.url} target="_blank" rel="noopener noreferrer">
                {f.host} <span className="arrow">&#8599;</span>
              </a>
            </div>
            <p className="featured-desc">{f.desc}</p>
            {f.shots.some((s) => s.src) && (
              <div className="shots">
                {f.shots
                  .filter((shot) => shot.src)
                  .map((shot) => (
                    <div
                      key={shot.id}
                      className={'shot' + (shot.portrait ? ' shot--portrait' : '')}
                    >
                      <img className="shot-img" src={shot.src} alt={shot.alt} loading="lazy" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ServicesModal() {
  return (
    <div>
      <div className="section-index">02 / SERVICES</div>
      <h2>How I help founders</h2>
      <p className="modal-subtitle">
        The technical half of your founding team — from first commit to launch.
      </p>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div key={s.n} className="service-cell">
            <div className="service-index">{s.n}</div>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="credentials">
        <span className="credentials-label">CREDENTIALS</span>
        <span className="spacer" />
        <span className="credentials-text">
          Software Engineer at <strong>Wix</strong>, shipping product to teams worldwide.
        </span>
      </div>
    </div>
  )
}

function NowModal() {
  return (
    <div>
      <div className="now-eyebrow">
        <span className="now-dot" />
        <div className="section-index">03 / NOW · UPDATED JUN 2026</div>
      </div>
      <h2>What I&#39;m up to</h2>
      <p className="now-bio">
        I&#39;m a software engineer who likes building products with the people who dream them up.
        By day I ship at Wix; on the side I partner with founders to turn early ideas into real,
        used software.
      </p>
      {NOW_ITEMS.map((item) => (
        <div key={item.n} className="now-item">
          <span className="row-index">{item.n}</span>
          <span className="now-item-text">{item.text}</span>
        </div>
      ))}
    </div>
  )
}

function ContactModal() {
  return (
    <div>
      <div className="section-index">04 / CONTACT</div>
      <h2>Let&#39;s build something</h2>
      <p className="modal-subtitle">
        Got an idea or an early product? Tell me where you&#39;re stuck — the first call is free.
      </p>
      <a
        className="book-call"
        href="https://cal.com/matheusalexandre/intro-call"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <span className="book-call-title">Book a call</span>
          <span className="book-call-sub">A free 30-min chat about your idea.</span>
        </span>
        <span className="book-call-arrow">&#8599;</span>
      </a>
      {CONTACTS.map((c) => (
        <a
          key={c.kind}
          className="contact-row"
          href={c.url}
          target={c.target}
          rel="noopener noreferrer"
        >
          <span className="contact-kind">{c.kind}</span>
          <span className="contact-handle">{c.handle}</span>
          <span className="row-arrow">&#8599;</span>
        </a>
      ))}
    </div>
  )
}

const MODALS = {
  work: WorkModal,
  experience: ServicesModal,
  now: NowModal,
  contact: ContactModal,
}

export default function App() {
  const [hovered, setHovered] = useState(null)
  const [openCard, setOpenCard] = useState(null)

  // Esc closes any open modal (listener added on mount, removed on unmount).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenCard(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpenCard(null)

  // hovered handler doubles for enter (id) and leave (null, only if still this card)
  const handleHover = (id, leavingId) => {
    if (id === null) {
      setHovered((cur) => (cur === leavingId ? null : cur))
    } else {
      setHovered(id)
    }
  }

  const ActiveModal = openCard ? MODALS[openCard] : null

  return (
    <div className="page">
      <div className="panel" data-screen-label="Home">
        {/* Header: monogram doubles as "home" — closes any open modal */}
        <header className="header">
          <div className="monogram" title="Matheus Alexandre" onClick={close}>
            MA
            <span className="monogram-dot" style={{ background: ACCENT }} />
          </div>
        </header>

        {/* Main: eyebrow + hero + cards. Grid dims while a modal is open. */}
        <main className="main">
          <div style={{ opacity: openCard ? 0.5 : 1, transition: 'opacity .4s ease' }}>
            <div className="hero-wrap">
              <div className="hero-text">
                <div className="eyebrow">MATHEUS&nbsp;&nbsp;ALEXANDRE</div>
                <h1 className="hero">
                  <span className="hero-line1">The engineering partner</span>
                  <br />
                  <span className="hero-line2">product-led founders build with.</span>
                </h1>
              </div>

              <div className="cards">
                {CARD_DATA.map((card, i) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={i}
                    hovered={hovered}
                    onHover={handleHover}
                    onOpen={setOpenCard}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer: CTAs + footnote */}
        <footer className="footer">
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:hello@matheus.cc">
              Start a project
            </a>
            <a
              className="btn btn-secondary"
              href="https://github.com/matheuswix"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="footnote">*Currently taking on 1–2 founder partnerships.</div>
        </footer>

        {/* Detail overlay — visibility toggled by `display`, never by a throttleable transition. */}
        <div
          className="overlay"
          style={{ display: openCard ? 'flex' : 'none' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          {ActiveModal && (
            // key forces popIn to replay when switching between modals.
            // Work floats as bare cards on the page; the rest sit in a white box.
            <div
              className={'modal ' + (openCard === 'work' ? 'modal--bare' : 'modal--boxed')}
              key={openCard}
            >
              <button className="close-btn" onClick={close} aria-label="Close">
                &times;
              </button>
              <ActiveModal />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

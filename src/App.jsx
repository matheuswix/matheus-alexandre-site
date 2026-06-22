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
  { n: '01', name: 'educa.social', desc: 'AI that creates schools’ social media content', host: 'educa.social', url: 'https://educa.social/' },
  { n: '02', name: 'Sherpa42', desc: 'Digital agency — sites & product work', host: 'sherpa42.com.br', url: 'https://www.sherpa42.com.br/' },
  { n: '03', name: 'AB InBev — Product Locator', desc: 'A store-locator widget reused across their brand sites', host: 'gooseisland.com', url: null },
  { n: '04', name: 'Banco do Brasil — MPE Week', desc: 'A bespoke marketplace built for Banco do Brasil', host: 'bb.com.br', url: null },
  { n: '05', name: 'NTT — My Town Page', desc: 'A local-business growth platform for NTT', host: 'mytownpage.jp', url: 'https://www.mytownpage.jp' },
]

const FEATURED = [
  {
    title: 'educa.social',
    tag: 'FOUNDING ENGINEER',
    host: 'educa.social',
    url: 'https://educa.social/',
    desc: 'An AI marketing platform that helps schools create on-brand social media content — posts, stories, and reels — in minutes, with no designer or agency. It learns each school’s brand, generates the artwork and captions, and schedules across Instagram, Facebook, and WhatsApp. I led the product build end to end: architecture, the content-generation pipeline, and the interface — from concept to a live product schools use today.',
    shots: [
      { id: 'shot-educa-1', src: '/shots/educa-1.png', alt: 'educa.social — home dashboard with generated school content', variant: 'portrait' },
      { id: 'shot-educa-2', src: '/shots/educa-2.png', alt: 'educa.social — brand identity setup screen', variant: 'portrait' },
      { id: 'shot-educa-3', src: '/shots/educa-3.png', alt: 'educa.social — visual style selection screen', variant: 'portrait' },
    ],
  },
  {
    title: 'Sherpa42',
    tag: 'WEBSITE DEVELOPMENT',
    host: 'sherpa42.com.br',
    url: 'https://www.sherpa42.com.br/',
    desc: 'Digital agency delivering websites and product work for clients. Hands-on across design and build, shipping polished, performant sites on tight timelines.',
    shots: [
      { id: 'shot-sherpa-desktop', src: '/shots/sherpa-desktop.png', alt: 'Sherpa42 — agency website, desktop view', variant: 'wide' },
      { id: 'shot-sherpa-mobile', src: '/shots/sherpa-mobile.png', alt: 'Sherpa42 — agency website, mobile view', variant: 'portrait' },
    ],
  },
  {
    title: 'AB InBev — Product Locator',
    tag: 'PRODUCT ENGINEERING',
    host: 'gooseisland.com',
    url: null,
    desc: 'A store/product-locator widget I built for AB InBev and embedded across their brand sites — Goose Island, RITAS, and more. Shoppers pick a product, drop in a ZIP, and get nearby stores on a map. One widget, many brands, each themed to fit.',
    shots: [
      { id: 'shot-locator-goose', src: '/shots/locator-goose.png', alt: 'Product locator on Goose Island — Find Beer', variant: 'tablet' },
      { id: 'shot-locator-ritas', src: '/shots/locator-ritas.png', alt: 'Product locator on RITAS — Find Your Ritas', variant: 'portrait' },
    ],
  },
  {
    title: 'Banco do Brasil — MPE Week',
    tag: 'PRODUCT & SOFTWARE CONSULTING',
    host: 'bb.com.br',
    url: null,
    desc: 'Specialized product and software consulting for Banco do Brasil — building MPE Week, a one-of-a-kind marketplace that brings micro and small businesses together in a single storefront.',
    shots: [
      { id: 'shot-bb-mpeweek', src: '/shots/bb-mpeweek.png', alt: 'Banco do Brasil — MPE Week marketplace homepage', variant: 'banner' },
    ],
  },
  {
    title: 'NTT — My Town Page',
    tag: 'SOFTWARE ENGINEER',
    host: 'mytownpage.jp',
    url: 'https://www.mytownpage.jp',
    desc: 'Software engineering on NTT’s My Town Page — a platform that helps local businesses build their web presence and grow, with business pages, traffic and lead analytics, and digital marketing tools.',
    shots: [
      { id: 'shot-mytown-desktop', src: '/shots/mytown-desktop.png', alt: 'My Town Page — desktop landing page', variant: 'wide' },
      { id: 'shot-mytown-1', src: '/shots/mytown-mobile-1.png', alt: 'My Town Page — business dashboard on mobile', variant: 'portrait' },
      { id: 'shot-mytown-2', src: '/shots/mytown-mobile-2.png', alt: 'My Town Page — business page benefits on mobile', variant: 'portrait' },
    ],
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

// Client logos for the homepage proof strip. Replace the files in /public/logos
// with real brand assets (same paths) — monochrome treatment is applied in CSS.
const LOGOS = [
  { name: 'NTT', src: '/logos/ntt-logo.svg' },
  { name: 'Banco do Brasil', src: '/logos/banco-do-brasil-v2.svg' },
  { name: 'Wix', src: '/logos/wix-logo.svg' },
  { name: 'Sherpa42', src: '/logos/sherpa.svg' },
  { name: 'Marisa', src: '/logos/marisa.svg' },
  { name: 'Cultura Inglesa', src: '/logos/cultura-inglesa.svg' },
  { name: 'Billa', src: '/logos/billa.svg' },
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
      <div className="modal-section">
        <div className="section-index">01 / WORK</div>
        <h2>Things I&#39;ve shipped with founders</h2>
        <p className="modal-subtitle">Products taken from idea to live — design, build, and launch.</p>

        <div className="project-list">
          {PROJECTS.map((p) => {
            const Tag = p.url ? 'a' : 'div'
            const linkProps = p.url
              ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Tag
                key={p.n}
                className={'project-row' + (p.url ? '' : ' project-row--static')}
                {...linkProps}
              >
                <span className="row-index">{p.n}</span>
                <span className="project-main">
                  <span className="project-name">{p.name}</span>
                  <span className="project-desc">{p.desc}</span>
                </span>
                {p.url && <span className="project-host">{p.host}</span>}
                {p.url && <span className="row-arrow">&#8599;</span>}
              </Tag>
            )
          })}
        </div>
      </div>

      <div className="featured-list">
        {FEATURED.map((f) => (
          <div key={f.title} className="featured-entry">
            <div className="featured-title-row">
              <span className="featured-title">{f.title}</span>
              <span className="tag">{f.tag}</span>
              <span className="spacer" />
              {f.url && (
                <a className="featured-host" href={f.url} target="_blank" rel="noopener noreferrer">
                  {f.host} <span className="arrow">&#8599;</span>
                </a>
              )}
            </div>
            <p className="featured-desc">{f.desc}</p>
            {f.shots.some((s) => s.src) && (
              <div className="shots">
                {f.shots
                  .filter((shot) => shot.src)
                  .map((shot) => (
                    <div key={shot.id} className={'shot shot--' + shot.variant}>
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

// ---- Peripheral hover previews ----
// On hovering a card, contextual content floats into the corners around the hero.
const POS4 = ['tl', 'tr', 'bl', 'br']
const ROT4 = [-5, 5, 4, -5]

// Work shows real project screenshots; the rest reuse the modal content.
const WORK_SHOTS = [
  { src: '/shots/mytown-desktop.png', pos: 'tl', size: 'wide', rot: -5 },
  { src: '/shots/educa-1.png', pos: 'tr', size: 'phone', rot: 6 },
  { src: '/shots/sherpa-desktop.png', pos: 'bl', size: 'wide', rot: 5 },
  { src: '/shots/locator-goose.png', pos: 'br', size: 'tablet', rot: -6 },
]

function PreviewItem({ pos, rot, delay, children }) {
  return (
    <div
      className={'preview-item pos-' + pos}
      style={{ '--rot': rot + 'deg', transitionDelay: delay + 'ms' }}
    >
      {children}
    </div>
  )
}

function PreviewLayer({ hovered }) {
  return (
    <div className="previews-layer" aria-hidden="true">
      <div className={'preview-set' + (hovered === 'work' ? ' is-active' : '')}>
        {WORK_SHOTS.map((s, i) => (
          <PreviewItem key={i} pos={s.pos} rot={s.rot} delay={i * 60}>
            <img className={'preview-shot preview-shot--' + s.size} src={s.src} alt="" loading="lazy" />
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'experience' ? ' is-active' : '')}>
        {SERVICES.map((s, i) => (
          <PreviewItem key={s.n} pos={POS4[i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card">
              <div className="preview-card-index">{s.n}</div>
              <div className="preview-card-title">{s.title}</div>
            </div>
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'now' ? ' is-active' : '')}>
        {NOW_ITEMS.map((it, i) => (
          <PreviewItem key={it.n} pos={['tl', 'tr', 'br'][i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card preview-card--now">
              <span className="now-dot" />
              <span className="preview-card-text">{it.text}</span>
            </div>
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'contact' ? ' is-active' : '')}>
        {CONTACTS.map((c, i) => (
          <PreviewItem key={c.kind} pos={POS4[i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-pill">
              <span className="preview-pill-kind">{c.kind}</span>
              <span className="preview-pill-handle">{c.handle}</span>
            </div>
          </PreviewItem>
        ))}
        <PreviewItem pos="br" rot={ROT4[3]} delay={180}>
          <div className="preview-pill preview-pill--dark">
            <span className="preview-pill-kind">BOOK A CALL</span>
            <span className="preview-pill-handle">Free 30-min chat</span>
          </div>
        </PreviewItem>
      </div>
    </div>
  )
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
            <img className="monogram-img" src="/matheus.jpg" alt="Matheus Alexandre" />
            <span className="monogram-dot" style={{ background: ACCENT }} />
          </div>
        </header>

        {/* Peripheral previews that float in on card hover (hidden while a modal is open) */}
        <PreviewLayer hovered={openCard ? null : hovered} />

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
          <div className="logos">
            <span className="logos-label">IN&nbsp;PRODUCTION&nbsp;AT</span>
            <div className="logos-marquee">
              <div className="logos-track">
                {[0, 1].map((copy) => (
                  <div className="logos-group" key={copy} aria-hidden={copy === 1}>
                    {LOGOS.map((l) => (
                      <img key={l.name} className="logo" src={l.src} alt={l.name} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
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

import { useEffect, useState } from 'react'

// Single theme variable (README §Design Tokens). Spotlight glows derive from the same yellow
// via the --accent-rgb CSS var in index.css, so they stay in sync.
const ACCENT = '#EAB308'

// ---- Translations (EN / pt-BR). Brand names, links and images stay shared below. ----
const I18N = {
  en: {
    hero1: 'The engineering partner',
    hero2: 'product-led founders build with.',
    cards: { work: 'Work', experience: 'How I help', now: 'About', contact: 'Contact' },
    tiles: { design: 'Design', mobileApps: 'Mobile Apps', shipping: 'Shipping', building: 'Building' },
    ctaStart: 'Start a project',
    footnote: '*Currently taking on 1–2 founder partnerships.',
    logosLabel: 'SHIPPED FOR',
    bookPill: { title: 'BOOK A CALL', sub: 'Free 30-min chat' },
    work: {
      idx: '01 / WORK',
      title: 'Things I’ve shipped with founders',
      subtitle: 'Products taken from idea to live — design, build, and launch.',
    },
    projectDescs: [
      'AI that creates schools’ social media content',
      'A local-business growth platform for NTT',
      'Digital agency — sites & product work',
      'A bespoke marketplace built for Banco do Brasil',
      'A store-locator widget reused across their brand sites',
    ],
    featured: [
      { tag: 'FOUNDING ENGINEER', desc: 'An AI marketing platform that helps schools create on-brand social media content — posts, stories, and reels — in minutes, with no designer or agency. It learns each school’s brand, generates the artwork and captions, and schedules across Instagram, Facebook, and WhatsApp. I led the product build end to end: architecture, the content-generation pipeline, and the interface — from concept to a live product schools use today.' },
      { tag: 'SOFTWARE ENGINEER', desc: 'Software engineering on NTT’s My Town Page — a platform that helps local businesses build their web presence and grow, with business pages, traffic and lead analytics, and digital marketing tools.' },
      { tag: 'WEBSITE DEVELOPMENT', desc: 'Digital agency delivering websites and product work for clients. Hands-on across design and build, shipping polished, performant sites on tight timelines.' },
      { tag: 'PRODUCT & SOFTWARE CONSULTING', desc: 'Specialized product and software consulting for Banco do Brasil — building MPE Week, a one-of-a-kind marketplace that brings micro and small businesses together in a single storefront.' },
      { tag: 'PRODUCT ENGINEERING', desc: 'A store/product-locator widget I built for AB InBev and embedded across their brand sites — Goose Island, RITAS, and more. Shoppers pick a product, drop in a ZIP, and get nearby stores on a map. One widget, many brands, each themed to fit.' },
    ],
    services: {
      idx: '02 / SERVICES',
      title: 'How I help founders',
      subtitle: 'The technical half of your founding team — from first commit to scale.',
      credLabel: 'CREDENTIALS',
      credBefore: 'Software Engineer at ',
      credAfter: ' (Tel Aviv) — shipping for teams across five continents.',
    },
    serviceItems: [
      { title: 'MVP, built fast', desc: 'From scoping to a launched v1 — the fastest path to something real users can touch, built on foundations that scale as you grow.' },
      { title: 'Web & mobile apps', desc: 'Full-stack product engineering: frontend, backend, and the infrastructure underneath.' },
      { title: 'Design that ships', desc: 'Interface and UX handled too — no waiting on a separate designer to move.' },
      { title: 'Technical partner', desc: 'A founding-level engineer in the room: architecture calls, trade-offs, and momentum.' },
    ],
    about: {
      idx: '03 / ABOUT · UPDATED JUN 2026',
      title: 'What I’m up to',
      bio: 'I’m a software engineer who likes building products with the people who dream them up. By day I ship at Wix; on the side I partner with founders to turn early ideas into real, used software. I’ve built for teams across Japan, New Zealand, California, France and Brazil — at home across time zones and cultures.',
      offLabel: 'OFF THE CLOCK',
      offBio: 'When I’m not shipping, you’ll find me training — CrossFit, swimming, or out for a run. Based in São Paulo and always planning the next trip. The consistency I bring to training is the same one I bring to the work.',
      funTitle: 'Fun facts',
    },
    nowItems: [
      'Open to 1–2 new founder partnerships this quarter.',
      'Shipping product end to end at Wix — staying sharp on scale.',
      'Growing educa.social and helping early teams move faster.',
    ],
    funFacts: [
      { title: 'Based in São Paulo, Brazil', sub: 'Building with founders across time zones.' },
      { title: 'CrossFit, gym & swim', sub: 'Training is non-negotiable.' },
      { title: 'Out for a run most mornings', sub: 'Clears the head, fuels the focus.' },
      { title: 'Always planning the next trip', sub: 'Travel keeps me curious.' },
    ],
    contact: {
      idx: '04 / CONTACT',
      title: 'Let’s build something',
      subtitle: 'Got an idea or an early product? Tell me where you’re stuck — the first call is free.',
      bookTitle: 'Book a call',
      bookSub: 'A free 30-min chat about your idea.',
    },
  },
  pt: {
    hero1: 'O engenheiro de software',
    hero2: 'com quem founders constroem produtos.',
    cards: { work: 'Projetos', experience: 'Como ajudo', now: 'Sobre', contact: 'Contato' },
    tiles: { design: 'Design', mobileApps: 'Apps', shipping: 'No ar', building: 'Construindo' },
    ctaStart: 'Começar um projeto',
    footnote: '*Aberto a 1–2 parcerias com founders no momento.',
    logosLabel: 'JÁ TRABALHEI COM',
    bookPill: { title: 'AGENDAR CALL', sub: 'Papo de 30 min, grátis' },
    work: {
      idx: '01 / PROJETOS',
      title: 'O que já construí com founders',
      subtitle: 'Produtos levados da ideia ao ar — design, desenvolvimento e lançamento.',
    },
    projectDescs: [
      'IA que cria o conteúdo de redes sociais de escolas',
      'Plataforma de crescimento para pequenos negócios da NTT',
      'Agência digital — sites e produto',
      'Um marketplace sob medida para o Banco do Brasil',
      'Widget localizador de lojas reutilizado nos sites das marcas',
    ],
    featured: [
      { tag: 'ENGENHEIRO FUNDADOR', desc: 'Uma plataforma de marketing com IA que ajuda escolas a criar conteúdo de redes sociais com a cara da marca — posts, stories e reels — em minutos, sem designer ou agência. Ela aprende a identidade de cada escola, gera as artes e legendas, e agenda no Instagram, Facebook e WhatsApp. Liderei a construção do produto de ponta a ponta: arquitetura, o pipeline de geração de conteúdo e a interface — do conceito a um produto que escolas usam hoje.' },
      { tag: 'ENGENHEIRO DE SOFTWARE', desc: 'Engenharia de software no My Town Page da NTT — uma plataforma que ajuda pequenos negócios a construir sua presença online e crescer, com páginas de negócio, análise de tráfego e leads, e ferramentas de marketing digital.' },
      { tag: 'DESENVOLVIMENTO WEB', desc: 'Agência digital entregando sites e produto para clientes. Mão na massa em design e desenvolvimento, lançando sites polidos e performáticos em prazos curtos.' },
      { tag: 'CONSULTORIA DE PRODUTO E SOFTWARE', desc: 'Consultoria especializada em produto e software para o Banco do Brasil — construindo o MPE Week, um marketplace único que reúne micro e pequenas empresas em uma só vitrine.' },
      { tag: 'ENGENHARIA DE PRODUTO', desc: 'Um widget localizador de produtos e lojas que construí para a AB InBev e embarquei nos sites das marcas — Goose Island, RITAS e mais. O consumidor escolhe um produto, digita o CEP e vê as lojas próximas no mapa. Um widget, várias marcas, cada uma com seu tema.' },
    ],
    services: {
      idx: '02 / SERVIÇOS',
      title: 'Como ajudo founders',
      subtitle: 'A metade técnica do seu time fundador — do primeiro commit ao scale.',
      credLabel: 'CREDENCIAIS',
      credBefore: 'Engenheiro de Software na ',
      credAfter: ' (Tel Aviv) — entregando para times em cinco continentes.',
    },
    serviceItems: [
      { title: 'MVP, no ar rápido', desc: 'Do escopo a um v1 lançado — o caminho mais rápido para algo que usuários reais tocam, sobre fundações que escalam com você.' },
      { title: 'Apps web e mobile', desc: 'Engenharia de produto full-stack: frontend, backend e a infraestrutura por baixo.' },
      { title: 'Design que vai ao ar', desc: 'Interface e UX inclusos — sem esperar um designer separado para avançar.' },
      { title: 'Parceiro técnico', desc: 'Um engenheiro de nível fundador na sala: decisões de arquitetura, trade-offs e ritmo.' },
    ],
    about: {
      idx: '03 / SOBRE · ATUALIZADO JUN 2026',
      title: 'No que estou agora',
      bio: 'Sou um engenheiro de software que gosta de construir produtos com quem os sonha. De dia entrego na Wix; nas horas vagas faço parceria com founders para transformar ideias em software real e usado. Já construí para times no Japão, Nova Zelândia, Califórnia, França e Brasil — à vontade entre fusos e culturas.',
      offLabel: 'FORA DO EXPEDIENTE',
      offBio: 'Quando não estou codando, me acha treinando — CrossFit, natação ou correndo. Baseado em São Paulo e sempre planejando a próxima viagem. A consistência que levo para o treino é a mesma que levo para o trabalho.',
      funTitle: 'Curiosidades',
    },
    nowItems: [
      'Aberto a 1–2 novas parcerias com founders neste trimestre.',
      'Entregando produto de ponta a ponta na Wix — afiado em escala.',
      'Crescendo o educa.social e ajudando times no início a irem mais rápido.',
    ],
    funFacts: [
      { title: 'Baseado em São Paulo, Brasil', sub: 'Construindo com founders em vários fusos.' },
      { title: 'CrossFit, academia e natação', sub: 'Treino é inegociável.' },
      { title: 'Corro quase toda manhã', sub: 'Limpa a mente, alimenta o foco.' },
      { title: 'Sempre planejando a próxima viagem', sub: 'Viajar me mantém curioso.' },
    ],
    contact: {
      idx: '04 / CONTATO',
      title: 'Vamos construir algo',
      subtitle: 'Tem uma ideia ou um produto no início? Me conta onde travou — a primeira call é de graça.',
      bookTitle: 'Agendar uma call',
      bookSub: 'Um papo gratuito de 30 min sobre sua ideia.',
    },
  },
}

// ---- Shared (language-independent) structure: ids, links, images, positions ----

const CARD_DATA = [
  {
    id: 'work',
    tiles: [
      { kind: 'logo', tint: 'blue', src: '/logos/ntt-logo.svg', x: -16, y: 8, rot: -11 },
      { kind: 'logo', tint: 'amber', src: '/logos/ab-inbev.svg', x: 0, y: -2, rot: 1 },
      { kind: 'logo', tint: 'green', src: '/logos/bb-card.svg', x: 16, y: 7, rot: 10 },
    ],
  },
  {
    id: 'experience',
    tiles: [
      { kind: 'card', tint: 'peach', labelKey: 'design', x: -11, y: 5, rot: -8 },
      { kind: 'card', tint: 'purple', labelKey: 'mobileApps', x: 11, y: 4, rot: 9 },
    ],
  },
  {
    id: 'now',
    tiles: [
      { kind: 'card', tint: 'green', labelKey: 'shipping', x: -13, y: 7, rot: -11 },
      { kind: 'card', tint: 'amber', labelKey: 'building', x: 13, y: 7, rot: 11 },
      { kind: 'face', src: '/genmoji.png', x: 0, y: -3, rot: -2 },
    ],
  },
  {
    id: 'contact',
    tiles: [
      { kind: 'card', tint: 'blue', label: 'gh', x: -14, y: 6, rot: -10 },
      { kind: 'card', tint: 'dark', label: '@', x: 0, y: -3, rot: 0 },
      { kind: 'card', tint: 'peach', label: 'mail', x: 14, y: 6, rot: 10 },
    ],
  },
]

const PROJECTS = [
  { n: '01', name: 'educa.social', host: 'educa.social', url: 'https://educa.social/' },
  { n: '02', name: 'NTT — My Town Page', host: 'mytownpage.jp', url: 'https://www.mytownpage.jp' },
  { n: '03', name: 'Sherpa42', host: 'sherpa42.com.br', url: 'https://www.sherpa42.com.br/' },
  { n: '04', name: 'Banco do Brasil — MPE Week', host: 'bb.com.br', url: null },
  { n: '05', name: 'AB InBev — Product Locator', host: 'gooseisland.com', url: null },
]

const FEATURED = [
  {
    title: 'educa.social',
    host: 'educa.social',
    url: 'https://educa.social/',
    shots: [
      { id: 'shot-educa-1', src: '/shots/educa-1.png', variant: 'portrait' },
      { id: 'shot-educa-2', src: '/shots/educa-2.png', variant: 'portrait' },
      { id: 'shot-educa-3', src: '/shots/educa-3.png', variant: 'portrait' },
    ],
  },
  {
    title: 'NTT — My Town Page',
    host: 'mytownpage.jp',
    url: 'https://www.mytownpage.jp',
    shots: [
      { id: 'shot-mytown-desktop', src: '/shots/mytown-desktop.png', variant: 'wide' },
      { id: 'shot-mytown-1', src: '/shots/mytown-mobile-1.png', variant: 'portrait' },
      { id: 'shot-mytown-2', src: '/shots/mytown-mobile-2.png', variant: 'portrait' },
    ],
  },
  {
    title: 'Sherpa42',
    host: 'sherpa42.com.br',
    url: 'https://www.sherpa42.com.br/',
    shots: [
      { id: 'shot-sherpa-desktop', src: '/shots/sherpa-desktop.png', variant: 'wide' },
      { id: 'shot-sherpa-mobile', src: '/shots/sherpa-mobile.png', variant: 'portrait' },
    ],
  },
  {
    title: 'Banco do Brasil — MPE Week',
    host: 'bb.com.br',
    url: null,
    shots: [{ id: 'shot-bb-mpeweek', src: '/shots/bb-mpeweek.png', variant: 'banner' }],
  },
  {
    title: 'AB InBev — Product Locator',
    host: 'gooseisland.com',
    url: null,
    shots: [
      { id: 'shot-locator-goose', src: '/shots/locator-goose.png', variant: 'tablet' },
      { id: 'shot-locator-ritas', src: '/shots/locator-ritas.png', variant: 'portrait' },
    ],
  },
]

const FUN_FACT_EMOJIS = ['🌎', '🏋️', '🏃', '✈️']

// Personal photos for the About gallery — scattered collage around the Fun-facts card.
const GALLERY = [
  { src: '/about/about-desk.jpg', pos: { top: '6px', left: '34px' }, w: 168, rot: -6 },
  { src: '/about/about-running.jpg', pos: { bottom: '4px', left: '6px' }, w: 156, rot: 4 },
  { src: '/about/about-gym.jpg', pos: { bottom: '-16px', left: '286px' }, w: 150, rot: 3 },
  { src: '/about/about-plane.jpg', pos: { top: '-4px', right: '36px' }, w: 160, rot: 6 },
  { src: '/about/about-cafe.jpg', pos: { bottom: '8px', right: '8px' }, w: 166, rot: -5 },
]

// Client logos for the homepage proof strip (monochrome treatment applied in CSS).
const LOGOS = [
  { name: 'NTT', src: '/logos/ntt-logo.svg' },
  { name: 'Banco do Brasil', src: '/logos/banco-do-brasil-v2.svg' },
  { name: 'Wix', src: '/logos/wix-logo.svg' },
  { name: 'AB InBev', src: '/logos/ab-inbev.svg' },
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

const pad2 = (i) => String(i + 1).padStart(2, '0')

// Per-tile transform, computed from the hovered flag. Appearance is handled by classes.
function tileStyle(tile, hovered) {
  const spread = hovered ? 2.3 : 1
  const sc = hovered ? 1.08 : 1
  const x = tile.x * spread
  const y = tile.y + (hovered ? -9 : 0)
  const rot = tile.rot * (hovered ? 1.32 : 1)
  return {
    transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rot}deg) scale(${sc})`,
    boxShadow: hovered ? '0 14px 26px rgba(0,0,0,.14)' : '0 5px 12px rgba(0,0,0,.07)',
    zIndex: hovered ? 5 : 1,
  }
}

function Card({ card, index, hovered, onHover, onOpen, t }) {
  const isHovered = hovered === card.id

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
          <div
            key={ti}
            className={'tile tile--' + tile.kind + (tile.tint ? ' tile--' + tile.tint : '')}
            style={tileStyle(tile, isHovered)}
          >
            {tile.kind === 'shot' || tile.kind === 'face' ? (
              <img
                className={'tile-shot' + (tile.kind === 'face' ? ' tile-shot--face' : '')}
                src={tile.src}
                alt=""
                loading="lazy"
              />
            ) : tile.kind === 'logo' ? (
              <img className="tile-logo" src={tile.src} alt="" loading="lazy" />
            ) : (
              <>
                <span className="tile-dot" />
                <span className="tile-text">{tile.label ?? t.tiles[tile.labelKey]}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="card-label">
        <span>{t.cards[card.id]}</span>
        <span className="arrow">&#8599;</span>
      </div>
    </div>
  )
}

function WorkModal({ t }) {
  return (
    <div>
      <div className="modal-section">
        <div className="section-index">{t.work.idx}</div>
        <h2>{t.work.title}</h2>
        <p className="modal-subtitle">{t.work.subtitle}</p>

        <div className="project-list">
          {PROJECTS.map((p, i) => {
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
                  <span className="project-desc">{t.projectDescs[i]}</span>
                </span>
                {p.url && <span className="project-host">{p.host}</span>}
                {p.url && <span className="row-arrow">&#8599;</span>}
              </Tag>
            )
          })}
        </div>
      </div>

      <div className="featured-list">
        {FEATURED.map((f, i) => (
          <div key={f.title} className="featured-entry">
            <div className="featured-title-row">
              <span className="featured-title">{f.title}</span>
              <span className="tag">{t.featured[i].tag}</span>
              <span className="spacer" />
              {f.url && (
                <a className="featured-host" href={f.url} target="_blank" rel="noopener noreferrer">
                  {f.host} <span className="arrow">&#8599;</span>
                </a>
              )}
            </div>
            <p className="featured-desc">{t.featured[i].desc}</p>
            {f.shots.some((s) => s.src) && (
              <div className="shots">
                {f.shots
                  .filter((shot) => shot.src)
                  .map((shot) => (
                    <div key={shot.id} className={'shot shot--' + shot.variant}>
                      <img className="shot-img" src={shot.src} alt={f.title} loading="lazy" />
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

function ServicesModal({ t }) {
  return (
    <div>
      <div className="section-index">{t.services.idx}</div>
      <h2>{t.services.title}</h2>
      <p className="modal-subtitle">{t.services.subtitle}</p>
      <div className="services-grid">
        {t.serviceItems.map((s, i) => (
          <div key={i} className="service-cell">
            <div className="service-index">{pad2(i)}</div>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="credentials">
        <span className="credentials-label">{t.services.credLabel}</span>
        <span className="spacer" />
        <span className="credentials-text">
          {t.services.credBefore}
          <strong>Wix</strong>
          {t.services.credAfter}
        </span>
      </div>
    </div>
  )
}

function NowModal({ t }) {
  return (
    <div>
      <div className="now-eyebrow">
        <span className="now-dot" />
        <div className="section-index">{t.about.idx}</div>
      </div>
      <h2>{t.about.title}</h2>
      <p className="now-bio">{t.about.bio}</p>
      {t.nowItems.map((text, i) => (
        <div key={i} className="now-item">
          <span className="row-index">{pad2(i)}</span>
          <span className="now-item-text">{text}</span>
        </div>
      ))}

      <div className="off-clock">
        <div className="section-index">{t.about.offLabel}</div>
        <p className="now-bio">{t.about.offBio}</p>

        <div className="about-collage">
          {GALLERY.map((g) => (
            <div
              key={g.src}
              className="collage-photo"
              style={{ ...g.pos, width: g.w + 'px', transform: `rotate(${g.rot}deg)` }}
            >
              <img src={g.src} alt="" loading="lazy" />
            </div>
          ))}

          <div className="fun-facts">
            <div className="fun-facts-title">{t.about.funTitle}</div>
            {t.funFacts.map((f, i) => (
              <div key={i} className="fun-fact">
                <span className="fun-fact-emoji">{FUN_FACT_EMOJIS[i]}</span>
                <span className="fun-fact-body">
                  <span className="fun-fact-title">{f.title}</span>
                  <span className="fun-fact-sub">{f.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactModal({ t }) {
  return (
    <div>
      <div className="section-index">{t.contact.idx}</div>
      <h2>{t.contact.title}</h2>
      <p className="modal-subtitle">{t.contact.subtitle}</p>
      <a
        className="book-call"
        href="https://cal.com/matheusalexandre/intro-call"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <span className="book-call-title">{t.contact.bookTitle}</span>
          <span className="book-call-sub">{t.contact.bookSub}</span>
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
const POS4 = ['tl', 'tr', 'bl', 'br']
const ROT4 = [-5, 5, 4, -5]

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

function PreviewLayer({ hovered, t }) {
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
        {t.serviceItems.map((s, i) => (
          <PreviewItem key={i} pos={POS4[i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card">
              <div className="preview-card-index">{pad2(i)}</div>
              <div className="preview-card-title">{s.title}</div>
            </div>
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'now' ? ' is-active' : '')}>
        {t.nowItems.map((text, i) => (
          <PreviewItem key={i} pos={['tl', 'tr', 'br'][i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card preview-card--now">
              <span className="now-dot" />
              <span className="preview-card-text">{text}</span>
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
            <span className="preview-pill-kind">{t.bookPill.title}</span>
            <span className="preview-pill-handle">{t.bookPill.sub}</span>
          </div>
        </PreviewItem>
      </div>
    </div>
  )
}

function getInitialLang() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('lang')
  if (saved === 'en' || saved === 'pt') return saved
  return (window.navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export default function App() {
  const [hovered, setHovered] = useState(null)
  const [openCard, setOpenCard] = useState(null)
  const [lang, setLang] = useState(getInitialLang)

  const t = I18N[lang]

  // Esc closes any open modal (listener added on mount, removed on unmount).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenCard(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Persist language choice and reflect it on <html lang>.
  useEffect(() => {
    window.localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const close = () => setOpenCard(null)

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
        {/* Language toggle — top corner */}
        <div className="lang-toggle">
          <button
            className={'lang-btn' + (lang === 'en' ? ' is-active' : '')}
            onClick={() => setLang('en')}
            aria-label="English"
          >
            EN
          </button>
          <span className="lang-sep">/</span>
          <button
            className={'lang-btn' + (lang === 'pt' ? ' is-active' : '')}
            onClick={() => setLang('pt')}
            aria-label="Português"
          >
            PT
          </button>
        </div>

        {/* Header: monogram doubles as "home" — closes any open modal */}
        <header className="header">
          <div className="monogram" title="Matheus Alexandre" onClick={close}>
            <img className="monogram-img" src="/matheus.jpg" alt="Matheus Alexandre" />
            <span className="monogram-dot" style={{ background: ACCENT }} />
          </div>
        </header>

        {/* Peripheral previews that float in on card hover (hidden while a modal is open) */}
        <PreviewLayer hovered={openCard ? null : hovered} t={t} />

        {/* Main: eyebrow + hero + cards. Grid dims while a modal is open. */}
        <main className="main">
          <div style={{ opacity: openCard ? 0.5 : 1, transition: 'opacity .4s ease' }}>
            <div className="hero-wrap">
              <div className="hero-text">
                <div className="eyebrow">MATHEUS&nbsp;&nbsp;ALEXANDRE</div>
                <h1 className="hero">
                  <span className="hero-line1">{t.hero1}</span>
                  <br />
                  <span className="hero-line2">{t.hero2}</span>
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
                    t={t}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer: CTAs + footnote */}
        <footer className="footer">
          <div className="logos">
            <span className="logos-label">{t.logosLabel}</span>
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
              {t.ctaStart}
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
          <div className="footnote">{t.footnote}</div>
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
            <div
              className={'modal ' + (openCard === 'work' ? 'modal--bare' : 'modal--boxed')}
              key={openCard}
            >
              <button className="close-btn" onClick={close} aria-label="Close">
                &times;
              </button>
              <ActiveModal t={t} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

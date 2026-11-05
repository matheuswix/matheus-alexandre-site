import { useEffect, useRef, useState } from 'react'

// Single theme variable (README §Design Tokens). Spotlight glows derive from the same yellow
// via the --accent-rgb CSS var in index.css, so they stay in sync.
const ACCENT = '#EAB308'

// ---- Translations (EN / pt-BR). Brand names, links and images stay shared below. ----
const I18N = {
  en: {
    hero1: 'I turn ideas into products',
    hero2: 'people love to use.',
    heroCred: 'Software Engineer at Wix · founder of Meu Ecommerce · building Cordel',
    meta: {
      title: 'Matheus Alexandre · Software engineer and founder',
      description:
        'I turn ideas into products people love to use. Software engineer at Wix, founder of Meu Ecommerce (10,000+ merchants) and maker of Cordel, an iPhone travel app.',
    },
    cards: { work: 'Work', experience: 'Now', now: 'About', contact: 'Contact' },
    tiles: { ecom: 'Ecom', shipping: 'Shipping', building: 'Building' },
    ctaCall: 'Book a call',
    ctaNewsletter: 'Subscribe to the newsletter',
    footnote: '*A new essay every two weeks, on Substack.',
    logosLabel: 'SHIPPED FOR',
    bookPill: { title: 'BOOK A CALL', sub: '15-min chat' },
    work: {
      idx: '01 / WORK',
      title: 'Products I’ve built and shipped',
      subtitle: 'Products I’ve founded, plus product work for teams who needed to move fast.',
      venturesLabel: 'PRODUCTS I’VE FOUNDED',
      clientLabel: 'SELECTED CLIENT WORK',
      more: 'Details',
      less: 'Hide',
    },
    ventures: [
      {
        tag: 'FOUNDER · BUILDING NOW',
        desc: 'An iPhone travel app that builds your itinerary from a conversation. You describe the trip, it organizes each day, and the plan stays on your phone even offline. My first mobile app: I built it solo, from design to backend, and launched it on the App Store in October 2026.',
      },
      {
        tag: 'FOUNDER · ENGINEERING',
        desc: 'A suite of apps that power online stores in Brazil: shipping, tracking, installments, and Pix discounts, each one native to Wix and Shopify. As founder and head of engineering, I built the shared infrastructure the whole ecosystem runs on, and keep shipping new apps on top of it.',
        stats: [
          { v: '2M+', l: 'operations / month' },
          { v: '10,000+', l: 'merchants served' },
        ],
      },
      {
        tag: 'FOUNDING ENGINEER',
        desc: 'An AI marketing platform that helps schools create on-brand social media content in minutes, with no designer or agency. It learns each school’s brand, generates the artwork and captions, and schedules posts, stories, and reels across Instagram, Facebook, and WhatsApp. I led the product build end to end: architecture, the content-generation pipeline, and the interface, taking it from concept to a live product schools use today.',
      },
    ],
    clientWork: [
      {
        tag: 'SOFTWARE ENGINEER',
        desc: 'A local-business growth platform for NTT',
        full: 'Software engineering on NTT’s My Town Page, a platform that helps local businesses build their web presence and grow, with business pages, traffic and lead analytics, and digital marketing tools.',
      },
      {
        tag: 'PRODUCT ENGINEERING',
        desc: 'A store-locator widget reused across their brand sites',
        full: 'A store and product-locator widget I built for AB InBev and embedded across their brand sites, from Goose Island to RITAS. Shoppers pick a product, drop in a ZIP, and get nearby stores on a map. One widget, many brands, each themed to fit.',
      },
      {
        tag: 'PRODUCT & SOFTWARE CONSULTING',
        desc: 'A bespoke marketplace built for Banco do Brasil',
        full: 'Specialized product and software consulting for Banco do Brasil, a one-of-a-kind marketplace built for MPE Week that brings micro and small businesses together in a single storefront.',
      },
      {
        tag: 'WEBSITE DEVELOPMENT',
        desc: 'Digital agency for sites and product work',
        full: 'Digital agency delivering websites and product work for clients. Hands-on across design and build, shipping polished, performant sites on tight timelines.',
      },
    ],
    now: {
      idx: '02 / NOW · NOV 2026',
      title: 'What I’m working on',
      subtitle: 'By day, engineering at Wix. The rest of the time, building my own products.',
    },
    nowFronts: [
      { role: 'SOFTWARE ENGINEER', desc: 'Shipping product at enterprise scale, for teams around the world.' },
      { role: 'FOUNDER', desc: 'Shipping, tracking, installment and Pix apps for 10,000+ merchants on Wix and Shopify.' },
      { role: 'BUILDING SOLO', desc: 'My first mobile app, a travel planner you talk to. On the App Store since October.' },
      { role: 'FOUNDING ENGINEER', desc: 'An AI platform that creates on-brand social media content for schools, in minutes.' },
    ],
    about: {
      idx: '03 / ABOUT',
      title: 'A bit about me',
      bio: 'I’m a software engineer and a founder. At nine I decided I’d spend my life making things people love to use, and that’s still the job. By day I ship at enterprise scale at Wix. Outside it, I founded Meu Ecommerce, which now serves more than 10,000 merchants, and built Cordel, my first iPhone app, on my own. Along the way I’ve shipped for teams in Japan, New Zealand, California, France and Brazil.',
      offLabel: 'OFF THE CLOCK',
      offBio: 'When I’m not shipping, you’ll catch me training at the gym, pool, or park. Based in São Paulo and always planning the next trip, the consistency I bring to training is the same one I bring to the work.',
      funTitle: 'Fun facts',
    },
    funFacts: [
      { title: 'Based in São Paulo, Brazil', sub: 'Working with teams across time zones.' },
      { title: 'CrossFit, gym & swim', sub: 'Training is non-negotiable.' },
      { title: 'Out for a run most mornings', sub: 'Clears the head, fuels the focus.' },
      { title: 'Always planning the next trip', sub: 'Travel keeps me curious.' },
    ],
    contact: {
      idx: '04 / CONTACT',
      title: 'Say hello',
      subtitle: 'About a project, something I wrote, or just to say hi. I read every message.',
      bookTitle: 'Book a call',
      bookSub: 'A 15-min chat about your project.',
      newsletterTitle: 'Subscribe to the newsletter',
      newsletterSub: 'A new essay every two weeks, in your inbox.',
    },
  },
  pt: {
    hero1: 'Transformo ideias em produtos',
    hero2: 'que pessoas amam usar.',
    heroCred: 'Engenheiro no Wix · founder do Meu Ecommerce · construindo o Cordel',
    meta: {
      title: 'Matheus Alexandre · Engenheiro de software e founder',
      description:
        'Transformo ideias em produtos que pessoas amam usar. Engenheiro de software no Wix, founder do Meu Ecommerce (10 mil+ lojistas) e criador do Cordel, um app de viagem para iPhone.',
    },
    cards: { work: 'Projetos', experience: 'Agora', now: 'Sobre', contact: 'Contato' },
    tiles: { ecom: 'Ecom', shipping: 'No ar', building: 'Construindo' },
    ctaCall: 'Agendar uma call',
    ctaNewsletter: 'Assinar a newsletter',
    footnote: '*Um texto novo a cada 15 dias, no Substack.',
    logosLabel: 'JÁ TRABALHEI COM',
    bookPill: { title: 'AGENDAR CALL', sub: 'Papo de 15 min' },
    work: {
      idx: '01 / PROJETOS',
      title: 'Produtos que construí e coloquei no ar',
      subtitle: 'Produtos que eu fundei, mais trabalho de produto para times que precisavam ir rápido.',
      venturesLabel: 'O QUE EU FUNDEI',
      clientLabel: 'TRABALHO COM CLIENTES',
      more: 'Detalhes',
      less: 'Ocultar',
    },
    ventures: [
      {
        tag: 'FUNDADOR · CONSTRUINDO AGORA',
        desc: 'Um app de viagem para iPhone que monta o roteiro a partir de uma conversa. Você conta os planos, ele organiza cada dia, e o roteiro fica no celular mesmo sem internet. Meu primeiro app mobile: construí sozinho, do design ao backend, e lancei na App Store em outubro de 2026.',
      },
      {
        tag: 'FUNDADOR · ENGENHARIA',
        desc: 'Um conjunto de apps que movem lojas online no Brasil: frete, rastreio, parcelamento e desconto no Pix, cada um nativo no Wix e no Shopify. Como fundador e responsável pela engenharia, construí a infraestrutura compartilhada em que todo o ecossistema roda, e sigo lançando novos apps sobre ela.',
        stats: [
          { v: '2 mi+', l: 'operações / mês' },
          { v: '10 mil+', l: 'lojistas atendidos' },
        ],
      },
      {
        tag: 'ENGENHEIRO FUNDADOR',
        desc: 'Uma plataforma de marketing com IA que ajuda escolas a criar conteúdo de redes sociais com a cara da marca em minutos, sem designer ou agência. Ela aprende a identidade de cada escola, gera as artes e legendas, e agenda posts, stories e reels no Instagram, Facebook e WhatsApp. Liderei a construção do produto de ponta a ponta: arquitetura, o pipeline de geração de conteúdo e a interface, levando do conceito a um produto que escolas usam hoje.',
      },
    ],
    clientWork: [
      {
        tag: 'ENGENHEIRO DE SOFTWARE',
        desc: 'Plataforma de crescimento para pequenos negócios da NTT',
        full: 'Engenharia de software no My Town Page da NTT, uma plataforma que ajuda pequenos negócios a construir sua presença online e crescer, com páginas de negócio, análise de tráfego e leads, e ferramentas de marketing digital.',
      },
      {
        tag: 'ENGENHARIA DE PRODUTO',
        desc: 'Widget localizador de lojas reutilizado nos sites das marcas',
        full: 'Um widget localizador de produtos e lojas que construí para a AB InBev e embarquei nos sites das marcas, de Goose Island a RITAS. O consumidor escolhe um produto, digita o CEP e vê as lojas próximas no mapa. Um widget, várias marcas, cada uma com seu tema.',
      },
      {
        tag: 'CONSULTORIA DE PRODUTO E SOFTWARE',
        desc: 'Um marketplace sob medida para o Banco do Brasil',
        full: 'Consultoria especializada em produto e software para o Banco do Brasil, um marketplace único feito para a MPE Week que reúne micro e pequenas empresas em uma só vitrine.',
      },
      {
        tag: 'DESENVOLVIMENTO WEB',
        desc: 'Agência digital para sites e produto',
        full: 'Agência digital entregando sites e produto para clientes. Mão na massa em design e desenvolvimento, lançando sites polidos e performáticos em prazos curtos.',
      },
    ],
    now: {
      idx: '02 / AGORA · NOV 2026',
      title: 'No que estou trabalhando',
      subtitle: 'De dia, engenharia no Wix. No resto do tempo, construindo os meus próprios produtos.',
    },
    nowFronts: [
      { role: 'ENGENHEIRO DE SOFTWARE', desc: 'Entregando produto em escala enterprise, para times no mundo todo.' },
      { role: 'FOUNDER', desc: 'Apps de frete, rastreio, parcelamento e Pix para mais de 10 mil lojistas no Wix e no Shopify.' },
      { role: 'CONSTRUINDO SOZINHO', desc: 'Meu primeiro app mobile, um planner de viagem por conversa. Na App Store desde outubro.' },
      { role: 'ENGENHEIRO FUNDADOR', desc: 'Uma plataforma com IA que cria em minutos o conteúdo de redes sociais das escolas, com a cara de cada marca.' },
    ],
    about: {
      idx: '03 / SOBRE',
      title: 'Um pouco sobre mim',
      bio: 'Sou engenheiro de software e founder. Aos nove anos decidi que ia passar a vida criando coisas que as pessoas amassem usar, e esse continua sendo o trabalho. De dia entrego em escala enterprise no Wix. Fora dele, fundei o Meu Ecommerce, que hoje atende mais de 10 mil lojistas, e construí sozinho o Cordel, meu primeiro app para iPhone. No caminho, já construí para times no Japão, Nova Zelândia, Califórnia, França e Brasil.',
      offLabel: 'FORA DO EXPEDIENTE',
      offBio: 'Quando não estou codando, você me verá treinando na academia, piscina ou parque. Baseado em São Paulo e sempre planejando a próxima viagem, a consistência que levo para o treino é a mesma que levo para o trabalho.',
      funTitle: 'Curiosidades',
    },
    funFacts: [
      { title: 'Baseado em São Paulo, Brasil', sub: 'Trabalhando com times em vários fusos.' },
      { title: 'CrossFit, academia e natação', sub: 'Treino é inegociável.' },
      { title: 'Corro quase toda manhã', sub: 'Limpa a mente, alimenta o foco.' },
      { title: 'Sempre planejando a próxima viagem', sub: 'Viajar me mantém curioso.' },
    ],
    contact: {
      idx: '04 / CONTATO',
      title: 'Diga oi',
      subtitle: 'Para falar de um projeto, de algum texto meu ou só dar um oi. Eu leio todas as mensagens.',
      bookTitle: 'Agendar uma call',
      bookSub: 'Um papo de 15 min sobre o seu projeto.',
      newsletterTitle: 'Assinar a newsletter',
      newsletterSub: 'Um texto novo a cada 15 dias, no seu e-mail.',
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
      { kind: 'logo', tint: 'blue', src: '/logos/wix-logo.svg', x: -15, y: 7, rot: -10 },
      { kind: 'card', tint: 'peach', labelKey: 'ecom', x: 15, y: 7, rot: 10 },
      { kind: 'shot', src: '/logos/cordel-icon.webp', x: 0, y: -3, rot: -1 },
    ],
  },
  {
    id: 'now',
    tiles: [
      { kind: 'card', tint: 'green', labelKey: 'shipping', x: -13, y: 7, rot: -11 },
      { kind: 'card', tint: 'amber', labelKey: 'building', x: 13, y: 7, rot: 11 },
      { kind: 'face', src: '/genmoji.webp', x: 0, y: -3, rot: -2 },
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

// Founder ventures — rich treatment (role, description, stats, screenshots).
const VENTURES = [
  {
    id: 'cordel',
    title: 'Cordel',
    host: 'usecordel.com',
    url: 'https://usecordel.com',
    shots: [
      { id: 'shot-cordel-conversation', src: '/shots/cordel-conversation.webp', variant: 'portrait' },
      { id: 'shot-cordel-itinerary', src: '/shots/cordel-itinerary.webp', variant: 'portrait' },
      { id: 'shot-cordel-home', src: '/shots/cordel-home.webp', variant: 'portrait' },
    ],
  },
  {
    id: 'meuecom',
    title: 'Meu Ecommerce',
    host: 'meuecommerce.com.br',
    url: 'https://meuecommerce.com.br',
    shotsGrid: true,
    shots: [
      { id: 'shot-meuecom-frete', src: '/shots/meuecom-frete.webp', variant: 'app' },
      { id: 'shot-meuecom-rastreio', src: '/shots/meuecom-rastreio.webp', variant: 'app' },
      { id: 'shot-meuecom-parcelamento', src: '/shots/meuecom-parcelamento.webp', variant: 'app' },
      { id: 'shot-meuecom-pix', src: '/shots/meuecom-pix.webp', variant: 'app' },
    ],
  },
  {
    id: 'educa',
    title: 'educa.social',
    host: 'educa.social',
    url: 'https://educa.social/',
    shots: [
      { id: 'shot-educa-1', src: '/shots/educa-1.webp', variant: 'portrait' },
      { id: 'shot-educa-2', src: '/shots/educa-2.webp', variant: 'portrait' },
      { id: 'shot-educa-3', src: '/shots/educa-3.webp', variant: 'portrait' },
    ],
  },
]

// Selected client work — branded cards that expand in place (no external links).
const CLIENT_WORK = [
  {
    id: 'ntt',
    name: 'NTT — My Town Page',
    logo: '/logos/ntt-logo.svg',
    shots: [
      { id: 'shot-mytown-desktop', src: '/shots/mytown-desktop.webp', variant: 'wide' },
      { id: 'shot-mytown-1', src: '/shots/mytown-mobile-1.webp', variant: 'portrait' },
      { id: 'shot-mytown-2', src: '/shots/mytown-mobile-2.webp', variant: 'portrait' },
    ],
  },
  {
    id: 'abinbev',
    name: 'AB InBev — Product Locator',
    logo: '/logos/ab-inbev.svg',
    shots: [
      { id: 'shot-locator-goose', src: '/shots/locator-goose.webp', variant: 'tablet' },
      { id: 'shot-locator-ritas', src: '/shots/locator-ritas.webp', variant: 'portrait' },
    ],
  },
  {
    id: 'bb',
    name: 'Banco do Brasil — MPE Week',
    logo: '/logos/banco-do-brasil-v2.svg',
    shots: [{ id: 'shot-bb-mpeweek', src: '/shots/bb-mpeweek.webp', variant: 'banner' }],
  },
  {
    id: 'sherpa',
    name: 'Sherpa42',
    logo: '/logos/sherpa.svg',
    shots: [
      { id: 'shot-sherpa-desktop', src: '/shots/sherpa-desktop.webp', variant: 'wide' },
      { id: 'shot-sherpa-mobile', src: '/shots/sherpa-mobile.webp', variant: 'portrait' },
    ],
  },
]

const FUN_FACT_EMOJIS = ['🌎', '🏋️', '🏃', '✈️']

// Personal photos for the About gallery — scattered collage around the Fun-facts card.
const GALLERY = [
  { src: '/about/about-desk.webp', pos: { top: '6px', left: '34px' }, w: 168, rot: -6 },
  { src: '/about/about-running.webp', pos: { bottom: '4px', left: '6px' }, w: 156, rot: 4 },
  { src: '/about/about-gym.webp', pos: { bottom: '-16px', left: '286px' }, w: 150, rot: 3 },
  { src: '/about/about-plane.webp', pos: { top: '-4px', right: '36px' }, w: 160, rot: 6 },
  { src: '/about/about-cafe.webp', pos: { bottom: '8px', right: '8px' }, w: 166, rot: -5 },
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

const NEWSLETTER_URL = 'https://soumatheusalexandre.substack.com'
const CALL_URL = 'https://cal.com/matheusalexandre/intro-call'

const CONTACTS = [
  { kind: 'EMAIL', handle: 'hello@matheus.cc', url: 'mailto:hello@matheus.cc', target: '_self' },
  { kind: 'LINKEDIN', handle: '/soumatheusalexandre', url: 'https://www.linkedin.com/in/soumatheusalexandre/', target: '_blank' },
  { kind: 'INSTAGRAM', handle: '@soumatheusalexandre', url: 'https://instagram.com/soumatheusalexandre', target: '_blank' },
  { kind: 'GITHUB', handle: '@matheuswix', url: 'https://github.com/matheuswix', target: '_blank' },
]

// The four things I'm working on right now. Copy (role, description) lives in I18N.nowFronts.
const NOW_FRONTS = [
  { name: 'Wix', logo: '/logos/wix-logo.svg' },
  { name: 'Meu Ecommerce', host: 'meuecommerce.com.br', url: 'https://meuecommerce.com.br' },
  { name: 'Cordel', logo: '/logos/cordel-icon.webp', host: 'App Store', url: 'https://apps.apple.com/br/app/cordel/id6810864343' },
  { name: 'educa.social', host: 'educa.social', url: 'https://educa.social/' },
]

const pad2 = (i) => String(i + 1).padStart(2, '0')

// Per-tile transform, computed from the hovered flag. Appearance is handled by classes.
// The resting geometry is also exposed as custom properties so the mobile
// scroll-driven fan-out (see `tile-fan` in index.css) can drive the same values.
function tileStyle(tile, hovered) {
  const spread = hovered ? 2.3 : 1
  const sc = hovered ? 1.08 : 1
  const x = tile.x * spread
  const y = tile.y + (hovered ? -9 : 0)
  const rot = tile.rot * (hovered ? 1.32 : 1)
  return {
    '--tx': tile.x + 'px',
    '--ty': tile.y + 'px',
    '--rot': tile.rot + 'deg',
    transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rot}deg) scale(${sc})`,
    boxShadow: hovered ? '0 14px 26px rgba(0,0,0,.14)' : '0 5px 12px rgba(0,0,0,.07)',
    zIndex: hovered ? 5 : 1,
  }
}

function Card({ card, index, hovered, onHover, onOpen, t, expanded }) {
  // On touch/mobile there is no hover, so show the tiles in their expanded state by default.
  const isHovered = expanded || hovered === card.id

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
    <button
      type="button"
      className="card"
      aria-haspopup="dialog"
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onFocus={() => onHover(card.id)}
      onBlur={() => onHover(null, card.id)}
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
    </button>
  )
}

// A client project: branded, collapsed by default, expands in place to reveal
// the full write-up and screenshots. No external links — everything stays here.
function ClientCard({ item, text, labels }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'client-card' + (open ? ' is-open' : '')}>
      <button className="client-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <img className="client-logo" src={item.logo} alt="" />
        <span className="client-main">
          <span className="client-name">{item.name}</span>
          <span className="client-desc">{text.desc}</span>
        </span>
        <span className="tag">{text.tag}</span>
        <span className="client-toggle">
          <span className="client-toggle-label">{open ? labels.less : labels.more}</span>
          <span className="client-chevron">&#9662;</span>
        </span>
      </button>
      {open && (
        <div className="client-body">
          <p className="client-full">{text.full}</p>
          {item.shots?.length > 0 && (
            <div className="shots">
              {item.shots.map((s) => (
                <div key={s.id} className={'shot shot--' + s.variant}>
                  <img className="shot-img" src={s.src} alt={item.name} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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
      </div>

      {/* Founder ventures — the lead story: products built with my own risk. */}
      <div className="group-label">{t.work.venturesLabel}</div>
      <div className="featured-list">
        {VENTURES.map((f, i) => (
          <div key={f.id} className="featured-entry">
            <div className="featured-title-row">
              <span className="featured-title">{f.title}</span>
              <span className="tag">{t.ventures[i].tag}</span>
              <span className="spacer" />
              {f.url && (
                <a className="featured-host" href={f.url} target="_blank" rel="noopener noreferrer">
                  {f.host} <span className="arrow">&#8599;</span>
                </a>
              )}
            </div>
            <p className="featured-desc">{t.ventures[i].desc}</p>
            {t.ventures[i].stats && (
              <div className="venture-stats">
                {t.ventures[i].stats.map((s, si) => (
                  <div key={si} className="venture-stat">
                    <span className="venture-stat-v">{s.v}</span>
                    <span className="venture-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            )}
            {f.shots.some((s) => s.src) && (
              <div className={'shots' + (f.shotsGrid ? ' shots--grid' : '')}>
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

      {/* Client work — branded cards that expand in place, no external links. */}
      <div className="group-label group-label--client">{t.work.clientLabel}</div>
      <div className="client-list">
        {CLIENT_WORK.map((p, i) => (
          <ClientCard key={p.id} item={p} text={t.clientWork[i]} labels={t.work} />
        ))}
      </div>
    </div>
  )
}

function NowFrontsModal({ t }) {
  return (
    <div>
      <div className="now-eyebrow">
        <span className="now-dot" />
        <div className="section-index">{t.now.idx}</div>
      </div>
      <h2>{t.now.title}</h2>
      <p className="modal-subtitle">{t.now.subtitle}</p>
      <div className="services-grid">
        {NOW_FRONTS.map((f, i) => {
          const body = (
            <>
              <div className="service-index">{t.nowFronts[i].role}</div>
              <div className="service-title">{f.name}</div>
              <p className="service-desc">{t.nowFronts[i].desc}</p>
              {f.url && (
                <span className="front-link">
                  {f.host} <span className="arrow">&#8599;</span>
                </span>
              )}
            </>
          )
          return f.url ? (
            <a
              key={f.name}
              className="service-cell service-cell--link"
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
            </a>
          ) : (
            <div key={f.name} className="service-cell">
              {body}
            </div>
          )
        })}
      </div>
    </div>
  )
}
function NowModal({ t }) {
  return (
    <div>
      <div className="section-index">{t.about.idx}</div>
      <h2>{t.about.title}</h2>
      <p className="now-bio">{t.about.bio}</p>

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
      <a className="book-call" href={CALL_URL} target="_blank" rel="noopener noreferrer">
        <span>
          <span className="book-call-title">{t.contact.bookTitle}</span>
          <span className="book-call-sub">{t.contact.bookSub}</span>
        </span>
        <span className="book-call-arrow">&#8599;</span>
      </a>
      <a className="book-call book-call--light" href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
        <span>
          <span className="book-call-title">{t.contact.newsletterTitle}</span>
          <span className="book-call-sub">{t.contact.newsletterSub}</span>
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
  experience: NowFrontsModal,
  now: NowModal,
  contact: ContactModal,
}

// ---- Peripheral hover previews ----
const POS4 = ['tl', 'tr', 'bl', 'br']
const ROT4 = [-5, 5, 4, -5]

const WORK_SHOTS = [
  { src: '/shots/meuecom-desktop.webp', pos: 'tl', size: 'wide', rot: -5 },
  { src: '/shots/educa-1.webp', pos: 'tr', size: 'phone', rot: 6 },
  { src: '/shots/mytown-desktop.webp', pos: 'bl', size: 'wide', rot: 5 },
  { src: '/shots/locator-goose.webp', pos: 'br', size: 'tablet', rot: -6 },
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
        {NOW_FRONTS.map((f, i) => (
          <PreviewItem key={f.name} pos={POS4[i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card">
              <div className="preview-card-index">{t.nowFronts[i].role}</div>
              <div className="preview-card-title">{f.name}</div>
            </div>
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'now' ? ' is-active' : '')}>
        {t.funFacts.slice(0, 3).map((f, i) => (
          <PreviewItem key={i} pos={['tl', 'tr', 'br'][i]} rot={ROT4[i]} delay={i * 60}>
            <div className="preview-card preview-card--now">
              <span className="now-dot" />
              <span className="preview-card-text">{f.title}</span>
            </div>
          </PreviewItem>
        ))}
      </div>

      <div className={'preview-set' + (hovered === 'contact' ? ' is-active' : '')}>
        {CONTACTS.slice(0, 3).map((c, i) => (
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

// Portuguese lives at "/", English at "/en/". Each is a real page with its own
// meta, so a shared link previews in the language it was shared in.
const LANG_PATH = { pt: '/', en: '/en/' }

function langFromPath() {
  return window.location.pathname.replace(/\/+$/, '') === '/en' ? 'en' : null
}

function getInitialLang() {
  if (typeof window === 'undefined') return 'pt'
  const fromPath = langFromPath()
  if (fromPath) return fromPath
  const saved = window.localStorage.getItem('lang')
  if (saved === 'en' || saved === 'pt') return saved
  return (window.navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export default function App() {
  const [hovered, setHovered] = useState(null)
  const [openCard, setOpenCard] = useState(null)
  const [lang, setLang] = useState(getInitialLang)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
  )
  const modalRef = useRef(null)
  const lastFocusRef = useRef(null)

  const t = I18N[lang]

  // Track mobile breakpoint so the cards can render expanded (no hover on touch).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Keep the language in step with the URL when using back and forward.
  useEffect(() => {
    const onPop = () => setLang(langFromPath() ?? 'pt')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Esc closes any open modal (listener added on mount, removed on unmount).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenCard(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Persist language choice and reflect it on <html lang>, the tab title and
  // the description. Social scrapers read the static English tags in
  // index.html, since a single URL can only carry one set.
  useEffect(() => {
    window.localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    const set = (sel, attr, value) =>
      document.querySelector(sel)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', t.meta.description)
    // Keep the shareable tags in step for anything that reads the rendered DOM.
    const url = 'https://matheus.cc' + LANG_PATH[lang]
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:url"]', 'content', url)
    set('meta[property="og:title"]', 'content', t.meta.title)
    set('meta[property="og:description"]', 'content', t.meta.description)
    set('meta[name="twitter:title"]', 'content', t.meta.title)
    set('meta[name="twitter:description"]', 'content', t.meta.description)
    const img = 'https://matheus.cc/og-image' + (lang === 'en' ? '-en' : '') + '.png'
    set('meta[property="og:image"]', 'content', img)
    set('meta[name="twitter:image"]', 'content', img)
  }, [lang, t])

  // While a modal is open it owns the page: lock the background scroll, move
  // focus into the dialog, and hand focus back to the card that opened it.
  useEffect(() => {
    if (openCard) {
      lastFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      const id = requestAnimationFrame(() => modalRef.current?.focus())
      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = ''
      }
    }
    lastFocusRef.current?.focus?.()
  }, [openCard])

  // Keep Tab inside the dialog so keyboard users can't wander behind it.
  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !modalRef.current) return
    const items = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Switching language also moves the URL, so the address bar and any link the
  // visitor copies match what they are reading.
  const switchLang = (next) => {
    setLang(next)
    const path = LANG_PATH[next]
    if (window.location.pathname !== path) {
      window.history.pushState({ lang: next }, '', path)
    }
  }

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
            onClick={() => switchLang('en')}
            aria-label="English"
          >
            EN
          </button>
          <span className="lang-sep">/</span>
          <button
            className={'lang-btn' + (lang === 'pt' ? ' is-active' : '')}
            onClick={() => switchLang('pt')}
            aria-label="Português"
          >
            PT
          </button>
        </div>

        {/* Header: monogram doubles as "home" — closes any open modal */}
        <header className="header">
          <div className="monogram" title="Matheus Alexandre" onClick={close}>
            <img className="monogram-img" src="/matheus.webp" alt="Matheus Alexandre" />
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
                  <span className="hero-line1">{t.hero1}</span>{' '}
                  <br />
                  <span className="hero-line2">{t.hero2}</span>
                </h1>
                <div className="hero-cred">{t.heroCred}</div>
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
                    expanded={isMobile}
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
            <a className="btn btn-primary" href={CALL_URL} target="_blank" rel="noopener noreferrer">
              {t.ctaCall}
            </a>
            <a className="btn btn-secondary" href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
              {t.ctaNewsletter}
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
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.cards[openCard]}
              tabIndex={-1}
              onKeyDown={trapFocus}
            >
              {/* Mobile-only scroll progress, driven by the modal's scroll timeline */}
              <div className="modal-progress" aria-hidden="true" />
              <button className="close-btn" onClick={close} aria-label="Close">
                <span className="close-text">Close</span>
                <span className="close-x">&times;</span>
              </button>
              <ActiveModal t={t} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile-only sticky action bar */}
      <div className="mobile-bar">
        <a className="btn btn-primary" href={CALL_URL} target="_blank" rel="noopener noreferrer">
          {t.ctaCall}
        </a>
        <a className="btn btn-secondary" href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
          Newsletter
        </a>
      </div>
    </div>
  )
}

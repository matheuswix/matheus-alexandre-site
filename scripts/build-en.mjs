/**
 * Generates dist/en/index.html from the built Portuguese page.
 *
 * The app is a single bundle, so both pages share /assets/*. What differs is
 * the head: a crawler or a link-preview bot reads the static HTML and never
 * runs the language toggle, so English needs its own URL to preview correctly.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dist/index.html')
const outDir = resolve(root, 'dist/en')

const PT_TITLE = 'Matheus Alexandre · Engenheiro de software e founder'
const EN_TITLE = 'Matheus Alexandre · Software engineer and founder'
const PT_DESC =
  'Eu transformo ideias em produtos que pessoas usam, e escrevo sobre como. Engenheiro de software no Wix, founder do Meu Ecommerce (10 mil+ lojistas) e criador do Cordel, um app de viagem para iPhone.'
const EN_DESC =
  'I turn ideas into products people use, and write about how. Software engineer at Wix, founder of Meu Ecommerce (10,000+ merchants) and maker of Cordel, an iPhone travel app.'
const PT_OG_DESC =
  'Engenheiro de software no Wix, founder do Meu Ecommerce e criador do Cordel. Escrevo sobre construir produtos a cada 15 dias.'
const EN_OG_DESC =
  'Software engineer at Wix, founder of Meu Ecommerce and maker of Cordel. Writing about building products every two weeks.'
const PT_TW_DESC =
  'Engenheiro de software no Wix, founder do Meu Ecommerce e criador do Cordel.'
const EN_TW_DESC =
  'Software engineer at Wix, founder of Meu Ecommerce and maker of Cordel.'
const PT_ALT = 'Matheus Alexandre: eu transformo ideias em produtos que pessoas usam'
const EN_ALT = 'Matheus Alexandre: I turn ideas into products people use'

const swaps = [
  ['<html lang="pt-BR">', '<html lang="en">'],
  [PT_TITLE, EN_TITLE],
  [PT_DESC, EN_DESC],
  [PT_OG_DESC, EN_OG_DESC],
  [PT_TW_DESC, EN_TW_DESC],
  [PT_ALT, EN_ALT],
  ['rel="canonical" href="https://matheus.cc/"', 'rel="canonical" href="https://matheus.cc/en/"'],
  ['property="og:url" content="https://matheus.cc/"', 'property="og:url" content="https://matheus.cc/en/"'],
  ['property="og:locale" content="pt_BR"', 'property="og:locale" content="en_US"'],
  ['property="og:locale:alternate" content="en_US"', 'property="og:locale:alternate" content="pt_BR"'],
  ['https://matheus.cc/og-image.png', 'https://matheus.cc/og-image-en.png'],
]

let html = readFileSync(src, 'utf8')
const missed = []

for (const [from, to] of swaps) {
  if (!html.includes(from)) {
    missed.push(from.slice(0, 60))
    continue
  }
  html = html.replaceAll(from, to)
}

if (missed.length) {
  console.error('[build-en] these strings were not found in dist/index.html:')
  missed.forEach((m) => console.error('  - ' + m))
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'index.html'), html)
console.log('[build-en] wrote dist/en/index.html')

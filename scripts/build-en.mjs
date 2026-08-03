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

const PT_TITLE = 'Matheus Alexandre — Engenheiro de software para founders product-led'
const EN_TITLE = 'Matheus Alexandre — Engineering partner for product-led founders'
const PT_DESC =
  'Um founder que projeta, constrói e lança o seu produto. Engenheiro de Software no Wix e founder do Meu Ecommerce, 2 mi+ operações por mês. A primeira call é grátis.'
const EN_DESC =
  'A founder who designs, builds and ships your product. Software Engineer at Wix and founder of Meu Ecommerce, 2M+ operations a month. First call is free.'
const PT_OG_DESC =
  'Um founder que projeta, constrói e lança o seu produto. Engenheiro de Software no Wix e founder do Meu Ecommerce, 2 mi+ operações por mês.'
const EN_OG_DESC =
  'A founder who designs, builds and ships your product. Software Engineer at Wix and founder of Meu Ecommerce, 2M+ operations a month.'
const PT_TW_DESC =
  'Um founder que projeta, constrói e lança o seu produto. Engenheiro de Software no Wix e founder do Meu Ecommerce.'
const EN_TW_DESC =
  'A founder who designs, builds and ships your product. Software Engineer at Wix and founder of Meu Ecommerce.'
const PT_ALT =
  'Matheus Alexandre, o engenheiro de software com quem founders constroem produtos'
const EN_ALT = 'Matheus Alexandre, the engineering partner product-led founders build with'

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

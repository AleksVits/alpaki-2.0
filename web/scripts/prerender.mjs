// Last step of `npm run build`: puts ready-made markup into the built pages so that
// search engines, link previews and visitors see the content before the script loads,
// then copies the result to ../docs for publishing from the `main` branch.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const { render } = await import(pathToFileURL(resolve(root, 'node_modules/.prerender/entry-server.js')).href)

const marker = '<div id="root"></div>'
for (const [lang, page] of [['ua', 'index.html'], ['en', 'en/index.html']]) {
  const file = resolve(dist, page)
  const html = readFileSync(file, 'utf8')
  if (!html.includes(marker)) throw new Error(`${page}: expected an empty ${marker}`)
  const markup = render(lang)
  writeFileSync(file, html.replace(marker, () => `<div id="root">${markup}</div>`))
  console.log(`prerendered ${page} (${lang}): ${(markup.length / 1024).toFixed(1)} kB of markup`)
}

const docs = resolve(root, '../docs')
rmSync(docs, { recursive: true, force: true })
mkdirSync(docs, { recursive: true })
cpSync(dist, docs, { recursive: true })
console.log('copied dist to ../docs')

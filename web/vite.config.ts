import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

// Публічна адреса сайту з кінцевою косою рискою. При переїзді на власний домен
// змініть лише цей рядок: від нього залежать base, canonical, hreflang,
// Open Graph, sitemap.xml і robots.txt.
const siteUrl = 'https://aleksvits.github.io/alpaki-2.0/'

/** Absolute URLs for crawlers and link previews, generated from `siteUrl`. */
function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    },
    generateBundle() {
      // Each page exists in Ukrainian (site root) and English (`en/`).
      const pages = ['', 'legend/']
      const urlset = pages.flatMap((page) => {
        const alternates = [
          `<xhtml:link rel="alternate" hreflang="uk" href="${siteUrl}${page}" />`,
          `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}en/${page}" />`,
          `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}" />`,
        ].join('\n    ')
        return [`${siteUrl}${page}`, `${siteUrl}en/${page}`].map((loc) => `  <url>\n    <loc>${loc}</loc>\n    ${alternates}\n  </url>`)
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urlset,
          '</urlset>',
          '',
        ].join('\n'),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ command, isPreview, isSsrBuild }) => ({
  plugins: isSsrBuild ? [react()] : [react(), siteMeta()],
  // `npm run preview` serves the production build, so it needs the production base too.
  base: command === 'build' || isPreview ? new URL(siteUrl).pathname : '/',
  build: isSsrBuild
    ? {
        // Server bundle used once by scripts/prerender.mjs; it never ships.
        outDir: 'node_modules/.prerender',
        emptyOutDir: true,
      }
    : {
        outDir: 'dist',
        emptyOutDir: true,
        rolldownOptions: {
          // Українська версія — у корені, англійська — за адресою /en/; легенда — /legend/ і /en/legend/.
          input: {
            main: resolve(root, 'index.html'),
            en: resolve(root, 'en/index.html'),
            legend: resolve(root, 'legend/index.html'),
            enLegend: resolve(root, 'en/legend/index.html'),
          },
        },
      },
}))

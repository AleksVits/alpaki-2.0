/** Public files, with Vite `base` so GitHub Pages project URLs resolve. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

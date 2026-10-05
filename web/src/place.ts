// Where «Побудувати маршрут» leads: "latitude,longitude" for Google Maps directions.
// These are the coordinates Google Maps gives for the locality «Тростянець» (Рахівський район,
// 90640) — the address stated on the site. A text address such as «урочище Тростянець, Кваси»
// is not recognised by Google Maps. Replace with the surveyed point of the complex entrance
// once the developer provides it.
export const routeDestination = '48.15748,24.26785'

export const routeHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(routeDestination)}`

import { asset } from './asset'

/**
 * Renders, layouts and interiors for the apartments section.
 * Files live in `public/apartments`; every image has a small `-sm` copy for cards and thumbnails.
 * Anything not listed here (floor plans of each level, layouts of the other buildings) is still a placeholder.
 */

export type Media = { src: string; thumb: string; kind: 'render' | 'plan' | '3d' | 'interior' }

const media = (path: string, kind: Media['kind']): Media => ({
  src: asset(`apartments/${path}.webp`),
  thumb: asset(`apartments/${path}-sm.webp`),
  kind,
})

const range = (prefix: string, numbers: number[]) =>
  numbers.map((n) => media(`interiors/${prefix}-${String(n).padStart(2, '0')}`, 'interior'))

/** Exterior renders per building, in the order of `t.apt.buildings` (Vista, Astra, Vela, Cascade). */
export const buildingRenders: Media[][] = [
  [1, 2, 3, 4, 5, 6, 7].map((n) => media(`buildings/vista-0${n}`, 'render')),
  // Buildings 2 and 3 came as one set of renders; each building opens on its own view.
  [media('buildings/astra-vela-01', 'render'), media('buildings/astra-vela-02', 'render')],
  [media('buildings/astra-vela-02', 'render'), media('buildings/astra-vela-01', 'render')],
  [1, 2, 3, 4, 5, 6].map((n) => media(`buildings/cascade-0${n}`, 'render')),
]

/** Section backgrounds per building: the same renders without the logo watermark. */
export const buildingBackdrops: string[] = ['vista-01', 'astra-vela-01', 'astra-vela-02', 'cascade-01'].map((name) => asset(`apartments/bg/${name}.webp`))

export type Layout = { n: number; plan: Media; views: Media[] }

const layout = (n: number, interiors: Media[], has3d = true): Layout => {
  const plan = media(`plans/type-${n}`, 'plan')
  return { n, plan, views: [...(has3d ? [media(`3d/type-${n}`, '3d')] : []), plan, ...interiors] }
}

/** Layouts of building 1 (Vista), named as in the architect's files: «Тип 1» … «Тип 5». */
const vistaLayouts = {
  1: layout(1, [...range('a', [1, 2, 3, 6, 7]), ...range('b', [9])]),
  2: layout(2, range('a', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
  3: layout(3, range('a', [2, 3, 8, 9, 10])),
  4: layout(4, range('a', [1, 2, 3, 8]), false),
  5: layout(5, range('b', [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14])),
}

/**
 * Layouts per building and apartment type (`t.apt.types`: studio, 1 room, 2 rooms).
 * Only Vista has layouts so far; an empty list keeps the schematic placeholder.
 */
export const layouts: Layout[][][] = [
  [[vistaLayouts[2], vistaLayouts[3]], [vistaLayouts[1], vistaLayouts[4]], [vistaLayouts[5]]],
  [[], [], []],
  [[], [], []],
  [[], [], []],
]

/** Card picture for each apartment type on the first screen. */
export const typeCovers: Media[] = [
  media('interiors/a-10', 'interior'),
  media('interiors/a-07', 'interior'),
  media('interiors/b-14', 'interior'),
]

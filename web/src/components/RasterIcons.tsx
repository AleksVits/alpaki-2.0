import { asset } from '../asset'

/** Decorative raster artwork; the adjacent text provides the accessible label. */
function RasterIcon({ name }: { name: string }) {
  return <img className="premium-icon" src={asset(`icons/gold-raster/${name}.webp`)} width="256" height="256" alt="" aria-hidden="true" loading="lazy" decoding="async" />
}

export function IconTree() { return <RasterIcon name="tree" /> }
export function IconBuildings() { return <RasterIcon name="buildings" /> }
export function IconPin() { return <RasterIcon name="pin" /> }
export function IconShield() { return <RasterIcon name="shield" /> }
export function IconApt() { return <RasterIcon name="apartment" /> }
export function IconSpa() { return <RasterIcon name="spa" /> }
export function IconPool() { return <RasterIcon name="pool" /> }
export function IconCloche() { return <RasterIcon name="restaurant" /> }
export function IconLeisure() { return <RasterIcon name="leisure" /> }
export function IconStone() { return <RasterIcon name="stone" /> }
export function IconWood() { return <RasterIcon name="wood" /> }
export function IconGlass() { return <RasterIcon name="glass" /> }
export function IconTerrace() { return <RasterIcon name="terrace" /> }
export function IconTrain() { return <RasterIcon name="train" /> }
export function IconCar() { return <RasterIcon name="car" /> }
export function IconKeys() { return <RasterIcon name="keys" /> }
export function IconCalendar() { return <RasterIcon name="calendar" /> }
export function IconBell() { return <RasterIcon name="service" /> }
export function IconChart() { return <RasterIcon name="chart" /> }

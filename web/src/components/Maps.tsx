import { asset } from '../asset'
import { useI18n } from '../i18n'

const cities = [
  { id: 'lviv', x: 14.2, y: 28.0 },
  { id: 'kyiv', x: 46.6, y: 25.8 },
  { id: 'kharkiv', x: 76.4, y: 30.6 },
  { id: 'uzh', x: 3.6, y: 46.0 },
  { id: 'if', x: 21.4, y: 45.0 },
  { id: 'dnipro', x: 72.6, y: 46.6 },
  { id: 'odesa', x: 47.0, y: 67.4 },
] as const

export function UkraineMap() {
  const { t } = useI18n()

  return (
    <div className="ua-map" role="img" aria-label="Ukraine">
      <img className="ua-map__img" src={asset('ukraine-map.png?v=2')} alt="" />
      {cities.map((city) => (
        <span
          key={city.id}
          className="ua-map__city"
          style={{ left: `${city.x}%`, top: `${city.y}%` }}
          tabIndex={0}
        >
          <i />
          {t.cities[city.id]}
        </span>
      ))}
      <span className="ua-map__kvasy" style={{ left: '14.8%', top: '47.6%' }} tabIndex={0}>
        <span className="ua-map__pin">
          <img src={asset('logo-mark.png?v=2')} alt="" />
        </span>
        <span className="ua-map__kvasy-name">{t.about.kvasy}</span>
        <span className="ua-map__kvasy-sub">{t.about.tract}</span>
      </span>
    </div>
  )
}

export function RouteMap() {
  const { t } = useI18n()
  return (
    <svg className="route-map" viewBox="0 0 1100 520" aria-hidden="true">
      <defs>
        <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bc904d" />
          <stop offset="100%" stopColor="#f5f2ed" />
        </linearGradient>
      </defs>
      <path
        d="M140 340 C260 330 340 300 430 250 C540 190 640 160 760 120 C820 100 870 70 910 40"
        fill="none"
        stroke="url(#road)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g transform="translate(140 340)">
        <circle r="16" fill="#0a1f14" stroke="#bc904d" />
        <path d="M-6 -2 H6 M-4 4 H4" stroke="#bc904d" strokeWidth="1.2" />
        <rect x="-5" y="-8" width="10" height="7" rx="1" stroke="#bc904d" strokeWidth="1.2" fill="none" />
        <text className="route-map__label" x="24" y="4">
          {t.location.station}
        </text>
      </g>
      <g transform="translate(430 250)">
        <rect x="-64" y="-28" width="128" height="40" rx="2" fill="#0a1f14" stroke="#bc904d" strokeOpacity="0.5" />
        <text className="route-map__box" x="0" y="-6">
          {t.location.distance}
        </text>
        <text className="route-map__box-sub" x="0" y="10">
          {t.location.distanceSub}
        </text>
      </g>
      <g transform="translate(910 40)">
        <path d="M0 0 C-14 0 -24 12 -24 24 C-24 40 0 64 0 64 C0 64 24 40 24 24 C24 12 14 0 0 0 Z" fill="#0a1f14" stroke="#bc904d" />
        <path d="M-6 16 L0 6 L6 16 L2 22 Z" fill="#bc904d" />
        <text className="route-map__pin" x="36" y="20">
          {t.location.pin.split('\n')[0]}
        </text>
        <text className="route-map__pin-sub" x="36" y="38">
          {t.location.pin.split('\n')[1]}
        </text>
      </g>
      <g className="route-map__elev" fill="#bc904d" fillOpacity="0.45">
        <text x="780" y="70">1200</text>
        <text x="860" y="130">1000</text>
        <text x="930" y="190">800</text>
        <text x="980" y="260">600</text>
      </g>
    </svg>
  )
}

export function FloorPlan() {
  return (
    <svg className="floorplan" viewBox="0 0 420 300" aria-hidden="true">
      <g fill="none" stroke="#e4d8cd" strokeWidth="1.15">
        <rect x="20" y="24" width="380" height="252" />
        <rect x="20" y="24" width="150" height="140" />
        <rect x="170" y="24" width="130" height="90" />
        <rect x="300" y="24" width="100" height="90" />
        <rect x="300" y="114" width="100" height="80" />
        <rect x="20" y="164" width="150" height="112" />
        <path d="M170 164 H300 V258 H170 Z" />
        <circle cx="70" cy="230" r="18" />
        <circle cx="240" cy="230" r="18" />
        <rect x="40" y="50" width="50" height="28" />
        <rect x="110" y="46" width="40" height="70" />
        <rect x="186" y="40" width="70" height="28" />
        <rect x="318" y="40" width="64" height="36" />
        <rect x="318" y="130" width="36" height="48" />
        <rect x="40" y="184" width="70" height="40" />
      </g>
    </svg>
  )
}

export function IsoApartment() {
  return (
    <svg className="iso" viewBox="0 0 640 420" aria-hidden="true">
      <g fill="none" stroke="#bc904d" strokeWidth="1.2">
        <path d="M80 240 L240 160 L560 200 L400 300 Z" />
        <path d="M240 160 L240 40 L560 80 L560 200" />
        <path d="M80 240 L80 140 L240 40" />
        <path d="M400 300 L400 200" />
        <path d="M80 140 L160 100 L400 140 L320 190 Z" />
        <rect x="300" y="175" width="90" height="50" transform="skewX(-28)" />
        <rect x="430" y="155" width="70" height="40" transform="skewX(-28)" />
        <path d="M120 210 L200 175 L230 190 L150 228 Z" />
        <path d="M160 250 L280 220 L300 240 L180 272 Z" />
      </g>
      <text x="150" y="310" className="iso__label">
        3D
      </text>
    </svg>
  )
}

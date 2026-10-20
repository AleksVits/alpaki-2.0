import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Порядок таблиць стилів має значення — див. DESIGN_SYSTEM.md, розділ 13.
import './fonts.css'
import './index.css'
import './mobile-spacing.css'
import './styles/header.css'
import './styles/intro.css'
import './styles/about.css'
import './styles/architecture.css'
import './styles/location.css'
import './styles/infrastructure.css'
import './styles/invest.css'
import './styles/apartments.css'
import './styles/construction.css'
import './styles/contacts.css'
import './refinement.css'
import './controls.css'
import './styles/experience.css'
import App from './App.tsx'
import { I18nProvider } from './i18n.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)

// The production build ships prerendered markup (scripts/prerender.mjs); the dev server does not.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)

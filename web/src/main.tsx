import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
import App from './App.tsx'
import { I18nProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)

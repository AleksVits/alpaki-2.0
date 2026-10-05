// Спільні налаштування QA-сценаріїв.
//   QA_ENGINE  — chromium (типово), webkit або firefox;
//   QA_CHANNEL — канал Chromium (типово msedge); порожнє значення запускає Chromium із Playwright;
//   QA_URL     — адреса сайту (типово локальний Vite).
const playwright = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const engine = process.env.QA_ENGINE || 'chromium';
if (!['chromium', 'webkit', 'firefox'].includes(engine)) throw new Error(`Unknown QA_ENGINE: ${engine}`);
const channel = process.env.QA_CHANNEL === undefined ? 'msedge' : process.env.QA_CHANNEL || undefined;
const baseUrl = (process.env.QA_URL || 'http://127.0.0.1:5173/').replace(/\/?$/, '/');
const launch = () => playwright[engine].launch({ headless: true, ...(engine === 'chromium' && channel ? { channel } : {}) });
module.exports = { baseUrl, engine, launch };

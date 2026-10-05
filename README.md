# AL'PAKI LEGEND

Сайт за концептом `ALPAKI_LEGEND_site_concept.pdf`.

Усі прийняті правила інтерфейсу, адаптивності й анімацій зібрані в [дизайн-системі](DESIGN_SYSTEM.md). Перед додаванням нових блоків використовуйте її як єдине джерело правди.

## Локально

```powershell
cd web
npm install
npm run dev
```

Відкрийте [http://localhost:5173](http://localhost:5173) — це лише ваш комп’ютер.

## Збірка

`npm run build` у каталозі `web` виконує чотири кроки: перевірку типів, збірку сайту в `web/dist`, збірку серверного модуля та `scripts/prerender.mjs`. Останній крок записує готову розмітку сторінки в `dist/index.html` і `dist/en/index.html`, щоб пошуковики й відвідувачі бачили зміст ще до завантаження скрипта, і копіює `dist` у `docs`.

Переглянути зібраний сайт локально: `npm run preview`.

## Мови та адреса сайту

- Українська версія — корінь сайту, англійська — `/en/`.
- Публічна адреса задана одним рядком `siteUrl` у `web/vite.config.ts`. При переїзді на власний домен змініть лише його: шлях `base`, canonical, hreflang, Open Graph, `sitemap.xml` і `robots.txt` збираються з цього значення.

## Публікація на GitHub Pages

### Автоматично (GitHub Actions)

Файл `.github/workflows/deploy.yml` після кожного push у `main` встановлює залежності, запускає `npm run lint` та `npm run build` і публікує `web/dist`.

Одноразове налаштування: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Після цього папку `docs` збирати й комітити не потрібно.

### Вручну (гілка `main`, папка `/docs`)

Працює, доки в **Settings → Pages** вибрано **Deploy from a branch**, гілка **main**, папка **/docs**. Після змін зберіть статику і запуште папку `docs`:

```powershell
cd web
npm run build
```

Сайт: [https://aleksvits.github.io/alpaki-2.0/](https://aleksvits.github.io/alpaki-2.0/)

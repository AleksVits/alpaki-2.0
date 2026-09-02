# AL'PAKI LEGEND

Сайт за концептом `ALPAKI_LEGEND_site_concept.pdf`.

## Локально

```powershell
cd web
npm install
npm run dev
```

Потім відкрийте [http://localhost:5173](http://localhost:5173) — це лише ваш комп’ютер, не публічна адреса.

## GitHub Pages

Це Vite + React, не Jekyll. Якщо в Actions падає `jekyll-build-pages` з помилкою про папку `docs` — GitHub зібрав сайт як Jekyll. Той workflow треба прибрати.

1. Запуште ці файли в репозиторій (зокрема `.github/workflows/pages.yml`).
2. **Settings → Pages → Build and deployment → Source:** оберіть **GitHub Actions** (не “Deploy from a branch” і не папку `/docs`).
3. Якщо є старий workflow з `actions/jekyll-build-pages` — видаліть його в **Actions** або в `.github/workflows/`.
4. Після зеленого **Deploy GitHub Pages** сайт буде на  
   `https://<нік>.github.io/<назва-репозиторію>/`

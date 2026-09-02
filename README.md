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

GitHub не запускає `npm run dev`. Сайт збирається workflow `.github/workflows/deploy-pages.yml`.

1. Запуште ці файли в репозиторій.
2. **Settings → Pages → Source:** GitHub Actions.
3. Після зеленого workflow сайт буде на  
   `https://<нік>.github.io/<назва-репозиторію>/`

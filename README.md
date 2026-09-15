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

## GitHub Pages (гілка `main`, папка `/docs`)

У **Settings → Pages** залиште:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Після змін на сайті зберіть статику і запуште папку `docs`:

```powershell
cd web
npm run build
```

Сайт: [https://aleksvits.github.io/alpaki-2.0/](https://aleksvits.github.io/alpaki-2.0/)

# Premium Portfolio Hero

## Install commands

```bash
npm install
npm run dev
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Recommended structure

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Hero.tsx
  Navbar.tsx
public/
  images/
    angelo.jpg
    background-loop.mp4
images/
  original local source assets
tailwind.config.ts
```

## Image placement

Keep the original local assets in the root `images` folder. The app serves browser-ready copies from `public/images`:

- `public/images/angelo.jpg`
- `public/images/background-loop.mp4`

To replace the name, role, location, portrait, background video, or navigation links, edit the commented constants in `components/Hero.tsx` and `components/Navbar.tsx`.

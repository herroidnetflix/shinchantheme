# SHINCHAN — Immersive Memory Gallery

A premium, mobile-first Shinchan nostalgia gallery designed as a static site for GitHub Pages.

## Run locally
No build step is required. Open `index.html` directly, or use any static file server.

## GitHub Pages
1. Upload the project contents to a GitHub repository.
2. In **Settings → Pages**, select the branch/folder containing `index.html`.
3. Save and open the generated Pages URL.

## Add your 25 images
Put authorized image assets in:

`assets/images/`

Then edit the `gallery` array at the top of `script.js`. Each entry is:

```js
["shinchan-01.jpg", "Shinchan", "Short title", "Default Telgish caption", ["caption 1", "caption 2"]]
```

The starter project intentionally does not bundle copyrighted Shinchan images.

## Audio
If you own or have permission to use a recording, place it at:

`assets/audio/shinchan-theme.mp3`

The page waits for the **ENTER MY WORLD** interaction before attempting playback. If audio is missing, the gallery remains usable.

## Features
- 15-memory scroll-driven gallery
- Liquid-glass visual system
- Dynamic accent colors
- Multiple caption variants per memory
- Lenis smooth scrolling when CDN is available
- Mobile touch-first responsive layout
- Desktop pointer parallax
- Favorites via localStorage
- Web Share API with clipboard fallback
- Fullscreen API
- Audio controls
- Particle atmosphere
- Crayon mode
- Shiro surprise
- Triple-tap Shinchan interaction
- Night-memory idle mode
- Reduced-motion support
- Graceful image/audio/effect fallbacks
- No backend, database, API keys, or environment variables


## Your 15-image setup

Put these files in `assets/images/`:

```text
01-shinchan.jpg
02-shinchan.jpg
03-misae.jpg
04-hiroshi.jpg
05-himawari.jpg
06-kazama.jpg
07-nene.jpg
08-masao.jpg
09-bochan.jpg
10-shinchan-friends.jpg
11-shinchan.jpg
12-shiro.jpg
13-nohara-family.jpg
14-shinchan.jpg
15-shinchan.jpg
```

The gallery now uses **15 memories**, and the progress display is `01 / 15` through `15 / 15`.

For music, put your authorized MP3 at:

```text
assets/audio/shinchan-theme.mp3
```

The music starts only after **ENTER MY WORLD** is clicked, so GitHub Pages/browser autoplay restrictions are respected.

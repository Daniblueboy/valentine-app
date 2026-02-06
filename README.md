# Sweetheart Surprise

A playful Valentine web experience with floating hearts, confetti, and a shareable love link.

## Features
- Name personalization
- Shareable link with copy button
- Floating celebration effects
- Confetti celebration
- Randomized love song embed

## Tech Stack
- Vite
- React
- TypeScript
- Tailwind CSS

## Getting Started

```sh
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Build

```sh
npm run build
```

## Deploy

This is a static Vite app. Any static host works.

### Vercel
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing: `vercel.json` is included for client-side routes.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

If you use Netlify, add a `_redirects` file:

```
/*    /index.html   200
```

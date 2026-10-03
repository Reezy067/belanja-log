# Work Card 01 — Project Skeleton

## Goal

Set up a working Vite + React project in this folder, next to the existing planning files, and show the Belanja Log header on the design background at localhost.

## Inputs

- `build-blueprint.md` — Implementation Rules, File and Folder Expectations
- `architecture.md` — Stack Decision
- `design.md` — Layout Rules (header), Color / Contrast Rules (background), Typography Feel

## Files likely touched

- `package.json` (new)
- `vite.config.js` (new)
- `index.html` (new)
- `.gitignore` (new)
- `src/main.jsx` (new)
- `src/App.jsx` (new)
- `src/App.css` (new)
- `build-status.md`

## Instructions for the coding agent

1. Do not use `npm create vite` in this folder (it can offer to delete existing files). Create the files by hand instead.
2. Create `package.json`:
   - `"name": "belanja-log"`, `"private": true`, `"version": "0.1.0"`, `"type": "module"`
   - scripts: `"dev": "vite"`, `"build": "vite build"`, `"preview": "vite preview"`
3. Install with exact versions:
   - `npm install --save-exact react react-dom`
   - `npm install --save-exact --save-dev vite @vitejs/plugin-react`
   - Make sure the `@vitejs/plugin-react` version supports the installed `vite` major version.
4. Create `vite.config.js` using `@vitejs/plugin-react`.
5. Create `index.html`: `lang="en"`, `<meta charset="UTF-8">`, viewport meta, `<title>Belanja Log</title>`, a meta description ("Track your daily spending in RM. Saved in your browser."), `<div id="root">`, and a module script to `/src/main.jsx`.
6. Create `.gitignore` with `node_modules`, `dist`, `.DS_Store`, `*.log`.
7. Create `src/main.jsx` that renders `<App />` in `React.StrictMode` and imports `./App.css`.
8. Create `src/App.jsx` with a `<header>` showing "Belanja Log" (`<h1>`) and the tagline "Track your RM, stay aware", plus an empty `<main>` for later cards.
9. Create `src/App.css` with:
   - a minimal reset (`box-sizing: border-box`, margin 0)
   - the font stack `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
   - body background gradient `#fbfbfd` to `#f2f1ee`, `min-height: 100vh`, text colour `#1d1d1f`
   - a centred container, `max-width: 560px`, 16px side padding
   - header: `h1` in `#000000`, weight 700; tagline 16px in muted `#57575c`
10. Run `npm run build` once to confirm the setup compiles.

## What not to do

- Do not delete, move, or overwrite any planning file, `prompts/`, `templates/`, or `work-cards/`.
- Do not build the form, list, or total yet.
- Do not add Tailwind, UI libraries, icon libraries, or routers.
- Do not initialize Git or deploy.

## Done when

- `npm run dev` starts a local server with no errors.
- Localhost shows "Belanja Log" and the tagline on the soft gradient background.
- `npm run build` completes with no errors.
- All planning files are still present.
- `build-status.md` is updated.

## Verification steps

- Run `npm run build` and confirm it succeeds.
- Confirm `package.json` lists exact versions (no `^` or `~`).
- Confirm `.gitignore` includes `node_modules` and `dist`.
- List the project folder and confirm all planning files are still there.
- Design check: header text, font stack, colours, and background gradient follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Run `npm run dev` in the terminal and confirm it prints a localhost URL (usually `http://localhost:5173`).
- Open that URL and confirm you see "Belanja Log" and "Track your RM, stay aware".
- Confirm the background is a soft off-white/warm grey (not plain white or dark).
- Confirm there is no red error screen.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after verification and output the learner checkpoint. If `npm install` fails or is very slow (this folder is inside OneDrive, which can lock files in `node_modules`), stop, report the error, and suggest pausing OneDrive sync before retrying.

## Status

Done (2026-10-03). `npm run build` passes; learner localhost test passed.

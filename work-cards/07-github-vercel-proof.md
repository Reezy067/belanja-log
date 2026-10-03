# Work Card 07 — GitHub + Vercel Proof

## Goal

Push Belanja Log to a public GitHub repo, deploy it on Vercel, re-test the live site, and capture proof.

## Inputs

- `prompts/08-github-vercel-proof.md`
- `build-blueprint.md` — Proof Ladder, demo script, 60-Second Explanation Template
- `build-status.md`

## Files likely touched

- `.gitignore` (check only)
- `build-status.md`
- No app source changes

## Instructions for the coding agent

Guide the learner step by step. The learner runs the account steps (GitHub, Vercel) in their own browser.

1. Pre-flight:
   - `npm run build` succeeds.
   - `.gitignore` includes `node_modules` and `dist`.
   - No secrets, keys, or `.env` files are present.
   - `git --version`, `git config --global user.name`, `git config --global user.email` all print values.
2. Git:
   - `git init`
   - `git add .` (planning files are included on purpose; they document the build)
   - check `git status` and confirm `node_modules` and `dist` are not listed
   - `git commit -m "build: complete kdbm lite project"`
3. GitHub (learner, in browser): create an empty public repo, e.g. `belanja-log`, under Reezy067. Do not add a README, license, or `.gitignore` there.
4. Push:
   - `git branch -M main`
   - `git remote add origin https://github.com/Reezy067/belanja-log.git` (use the actual repo URL)
   - `git push -u origin main`
5. Vercel (learner, in browser): Add New Project, import the GitHub repo, framework preset Vite, build command `npm run build`, output directory `dist`, then Deploy.
6. Open the live URL and run the demo script from `build-blueprint.md`.
7. Update `build-status.md`: GitHub URL, Vercel URL, the proof level used (Strong / Good / Minimum), and `Current KDBM Lite stage: Shipped`.

## What not to do

- Do not force-push or rewrite history.
- Do not commit `node_modules`, `dist`, or any secrets.
- Do not change app code during shipping. If the live site has a bug, stop and report it.
- Do not add environment variables in Vercel (none are needed).

## Done when

- The GitHub repo shows the source and planning files.
- The Vercel live URL loads Belanja Log.
- The demo script passes on the live URL (including refresh persistence).
- Proof is captured and `build-status.md` shows Shipped with links.

## Verification steps

- `git status` is clean after the commit.
- `git remote -v` shows the GitHub repo.
- The live URL works on a phone or at 360px width.
- Design check: the live site matches `design.md` the same as localhost (weekly total hero, frosted cards, blue accent, mobile stacking).

## Localhost test before continuing

After this card, the learner should test (on the live Vercel URL):

- Open the live URL. The header, "RM 0.00", form, empty state, and footer note appear.
- Add RM 8.50, Makan, "Nasi lemak + teh tarik", then refresh. It is still there.
- Edit it, then delete it with confirmation. Both work.
- Open the live URL on your phone. Everything is readable with no sideways scrolling.

If all tests pass, reply `continue` and submit your proof.
If anything fails, reply `fix` and paste the error or describe what you see. If GitHub or Vercel is blocked, use the Good or Minimum proof from the Proof Ladder.

## Stop condition

Stop when proof is captured and `build-status.md` shows Shipped. If push or deploy fails twice, stop and use the fallback proof options.

## Status

Done (2026-10-03). GitHub: https://github.com/Reezy067/belanja-log. Live: https://belanja-log.vercel.app/. Learner tested the live site.

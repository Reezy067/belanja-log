# Work Card 08 — Design Upgrades (v1.1)

## Goal

Raise the visual quality and the "where does my money go" insight for judging: a bank-card style weekly total, a "BL" logo mark + favicon, and a "Where your money went" weekly category breakdown. Then redeploy.

## Inputs

- `design.md` — Version 1.1 Upgrades
- `build-blueprint.md` — Scope Lock (Now, approved v1.1 upgrade)
- `architecture.md` — Component Map (v1.1 items)

## Files likely touched

- `public/favicon.svg` (new)
- `index.html`
- `src/App.jsx`
- `src/App.css`
- `src/components/WeeklyTotal.jsx`
- `src/components/WeeklyBreakdown.jsx` (new)
- `src/lib/breakdown.js` (new)
- `build-status.md`

## Instructions for the coding agent

1. Create `public/favicon.svg` (BL logo mark) and link it in `index.html` with `theme-color` `#003893`.
2. Add the logo mark to the header.
3. Restyle `WeeklyTotal` as the bank-card hero and add the expense count for this week.
4. Add `src/lib/breakdown.js` with `categoryBreakdown(weekExpenses)` that sums in sen per category and sorts largest first (ties follow the category order).
5. Add `WeeklyBreakdown.jsx` after the form; show it once any expense exists.
6. Follow `design.md` > Version 1.1 Upgrades exactly. No chart libraries.
7. Run `npm run build`, then stop for the learner's localhost check before committing and pushing.

## What not to do

- Do not change the data shape, storage key, or add/edit/delete behaviour.
- Do not add chart libraries, pie charts, or budgets.
- Do not use bank names, logos, or fake card numbers on the hero.
- Do not push before the learner approves the localhost check.

## Done when

- Hero, logo, favicon, and breakdown match `design.md`.
- Breakdown amounts add up to the weekly total.
- `npm run build` passes, the learner's localhost check passes, and the live site is redeployed.

## Verification steps

- `npm run build` succeeds.
- `categoryBreakdown` check: amounts are summed in sen, sorted largest first, and the shares add up to 1.
- Design check: bank-card hero, logo mark, favicon, breakdown rows and bars, and mobile stacking follow `design.md` > Version 1.1 Upgrades.

## Localhost test before continuing

After this card, the learner should test:

- The header shows the blue "BL" mark, and the browser tab shows the same icon.
- The weekly total looks like a blue bank card with white text, the week range, and the expense count.
- Add RM 8.50 Makan, RM 3.50 Transport, and RM 4.00 Makan. The breakdown shows Makan RM 12.50 (78%) first and Transport RM 3.50 (22%), with bars to match.
- Edit or delete one and the breakdown updates; refresh and it stays.
- At 360px width, the hero and breakdown are readable with no sideways scrolling.

If all tests pass, reply `continue` and I'll commit and push so Vercel redeploys.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after `npm run build` passes and output the learner checkpoint. Push only after the learner says `continue`.

## Status

Done (2026-10-03). Learner approved on localhost (bank card, logo, breakdown, batik background). Pushed to GitHub; Vercel redeploys.

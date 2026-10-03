# Work Card 09 — Category Ring and Week Comparison (v1.2)

## Goal

Add an MAE-style category ring and a fair "vs this time last week" line on the bank card, plus a Kiro steering file and a README for judging.

## Inputs

- `design.md` — Version 1.2 Upgrades
- `build-blueprint.md` — Scope Lock (approved v1.2 upgrade)

## Files likely touched

- `src/lib/categories.js` (graphic colours), `src/lib/compare.js` (new)
- `src/components/CategoryRing.jsx` (new), `WeeklyBreakdown.jsx`, `WeeklyTotal.jsx`, `src/App.jsx`, `src/App.css`
- `.kiro/steering/belanja-log.md` (new), `README.md` (new), `build-status.md`

## Instructions for the coding agent

1. Give each category a graphic-only colour; use it for ring segments, row dots, and bars.
2. Build the ring in plain SVG (stroke-dasharray segments, 3px gaps, total in the centre).
3. Add `compareWithLastWeek()`: this week Monday to today vs last week Monday to the same weekday, in sen; return null if last week's period is empty.
4. Show the comparison pill on the bank card.
5. Add the steering file and README. Run `npm run build`; stop for the learner check before pushing.

## What not to do

- No chart libraries, budgets, or limits. No change to the data shape or storage key.
- Do not use category colours for text.

## Done when

- Ring segments match the row percentages; the comparison is correct and hidden when there's no last-week data.
- `npm run build` passes; the learner check passes; the live site is redeployed.

## Verification steps

- `npm run build` succeeds.
- Comparison check: this week RM 12.00 vs last week (same days) RM 15.00 gives "RM 3.00 less"; a last-week Sunday entry is excluded on a Saturday.
- Design check: ring, colour dots, bars, comparison pill, and mobile stacking follow `design.md` > Version 1.2 Upgrades.

## Localhost test before continuing

After this card, the learner should test:

- With 2+ categories this week, the ring shows matching coloured segments and the total in the centre.
- Add an expense dated 7 days ago. The bank card shows "↑/↓ RM X more/less than this time last week".
- Edit or delete expenses and the ring, rows, and comparison update; refresh and they stay.
- At 360px, the ring sits above the rows, centred, with no sideways scrolling.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after `npm run build` passes and output the learner checkpoint. Push only after the learner says `continue`.

## Status

Done (2026-10-03). `npm run build` passes; learner approved; pushed to GitHub, Vercel redeploys.
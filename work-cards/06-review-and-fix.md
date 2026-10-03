# Work Card 06 — Review and Fix

## Goal

Run the Review Mirror against the brief, design, and blueprint, then make the single smallest useful fix. Confirm the production build works.

## Inputs

- `prompts/07-review-mirror.md`
- `project-brief.md`
- `design.md`
- `build-blueprint.md` — Review Mirror checklist (10 items)
- `build-status.md`

## Files likely touched

- At most the 1–2 source files needed for the single smallest useful fix
- `build-status.md`

## Instructions for the coding agent

1. Read the inputs and review the current app against the 10-item Review Mirror in `build-blueprint.md`.
2. Run `npm run build`, then `npm run preview`, and check the production build behaves the same as dev.
3. Check specifically:
   - the full flow: add, edit, delete, weekly total, empty state, refresh persistence
   - an expense dated in the previous week is excluded from the weekly total
   - Sunday logic in `getWeekRange` (Monday is 6 days earlier)
   - no `toISOString()` used for local dates
   - 360px width: no horizontal scroll, tap targets at least 44px
   - every input labelled; focus rings visible; errors announced via `aria-describedby`
   - gold never used as text; no fake data, logos, stats, testimonials, or lorem ipsum
   - no secrets or API keys anywhere in the code
4. Report: PASS / NEEDS FIX / REDRAFT, the top 1–3 issues, and the single smallest useful fix.
5. Apply only that single fix (if any), then re-run `npm run build`.
6. Record the review result and fix in `build-status.md`. Set the KDBM Lite stage to Check.

## What not to do

- Do not redesign the app or add features from Later or Never.
- Do not make more than one fix without asking the learner.
- Do not initialize Git or deploy yet.

## Done when

- The Review Mirror result is reported with the top issues and the smallest fix.
- The fix (if any) is applied and `npm run build` succeeds.
- The learner has run the final localhost review.
- `build-status.md` records the result.

## Verification steps

- `npm run build` succeeds after the fix.
- `npm run preview` serves the app and the full flow works.
- Design check: weekly total hero, form, item cards, edit state, delete control, empty state, footer note, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test (full final flow):

- Start fresh: delete any existing expenses until the empty state and "RM 0.00" show.
- Add RM 8.50, Makan, today, "Nasi lemak + teh tarik". The weekly total shows "RM 8.50".
- Edit it to RM 9.00, then refresh. It still shows "RM 9.00".
- Add an expense dated 10 days ago. It shows in the list but is not in the weekly total.
- Delete one expense (confirm), then refresh. It stays deleted.
- Switch to 360px phone width. Everything is readable, nothing is cut off, and there is no sideways scrolling.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after the review, the single fix, and verification. If the result is REDRAFT, stop and ask the learner and trainer before changing anything. If PASS, hand off to Work Card 07.

## Status

Review PASS (2026-10-03). One fix applied: focus returns to the edited expense after Save changes or Cancel. `npm run build` passes. Learner final localhost review passed. Done.

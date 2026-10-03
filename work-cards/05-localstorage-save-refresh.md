# Work Card 05 — localStorage Save and Refresh

## Goal

Save expenses in the browser so that add, edit, and delete all survive a page refresh, without crashing if stored data is missing or broken.

## Inputs

- `build-blueprint.md` — Data / State / Storage Rules (Storage)
- `architecture.md` — Storage Logic
- `design.md` — Refresh Proof Visibility

## Files likely touched

- `src/lib/storage.js` (new)
- `src/App.jsx`
- `build-status.md`

## Instructions for the coding agent

1. `src/lib/storage.js`:
   - `export const STORAGE_KEY = "belanja-log.expenses.v1"`
   - `loadExpenses()`: inside `try/catch`, read the key. If missing, invalid JSON, or not an array, return `[]`. Keep only items that have a string `id`, a positive finite number `amount`, a `category` from `CATEGORIES`, a `"YYYY-MM-DD"` string `date`, and a string `note` (default `""` if missing).
   - `saveExpenses(expenses)`: inside `try/catch`, write `JSON.stringify(expenses)`. On failure, log a console warning only; do not crash.
2. `App.jsx`:
   - initialise state lazily: `useState(() => loadExpenses())`
   - `useEffect(() => saveExpenses(expenses), [expenses])`
   - do not persist `editingId`
3. Confirm the footer note "Saved in this browser only. Clearing browser data will erase it." is still visible.

## What not to do

- Do not add any backend, sync, export, or import.
- Do not store anything besides the expenses array.
- Do not change the storage key or the data shape.
- Do not pre-load sample data when storage is empty.

## Done when

- Add, edit, and delete all persist after refresh.
- Broken stored data (e.g. the value `not json`) loads as an empty list without a red error screen.
- `npm run build` completes with no errors.
- `build-status.md` is updated.

## Verification steps

- Run `npm run build` and confirm it succeeds.
- Confirm the key in code is exactly `belanja-log.expenses.v1`.
- Confirm `loadExpenses` handles: missing key, invalid JSON, a non-array value, and items with missing fields.
- Design check: list, item cards, empty state, footer note, and mobile stacking still follow `design.md` after reload.

## Localhost test before continuing

After this card, the learner should test:

- Add RM 8.50, Makan, "Nasi lemak + teh tarik". Refresh the browser. The expense is still there and the weekly total is still "RM 8.50".
- Edit it to RM 9.00 and refresh. It still shows "RM 9.00".
- Delete it and refresh. It stays deleted and the empty state shows.
- Optional: open dev tools, then Application, then Local Storage, and find `belanja-log.expenses.v1` holding your data.
- Optional: in dev tools, change that value to `not json` and refresh. The app shows the empty state with no red error.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after verification and output the learner checkpoint. Do not start Work Card 06.

## Status

Done (2026-10-03). `npm run build` passes; learner localhost test passed.

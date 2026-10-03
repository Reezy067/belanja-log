# Work Card 02 — Static Layout

## Goal

Build the full page layout as static UI with the complete design: weekly total hero (RM 0.00), the expense form, the empty state, and the footer note. Nothing is interactive yet.

## Inputs

- `build-blueprint.md` — Architecture Summary, Design Direction Summary (tokens and states)
- `architecture.md` — Component Map, Data / State Model (categories)
- `design.md` — the whole file

## Files likely touched

- `src/App.jsx`
- `src/App.css`
- `src/components/WeeklyTotal.jsx` (new)
- `src/components/ExpenseForm.jsx` (new)
- `src/components/EmptyState.jsx` (new)
- `src/lib/categories.js` (new)
- `src/lib/money.js` (new, `formatRM` only)
- `build-status.md`

## Instructions for the coding agent

1. `src/lib/categories.js`: export `CATEGORIES` in this order, each with `id`, `label`, `description`: Makan (food & drinks), Transport (Grab, LRT/MRT, petrol, toll), Bills (phone, internet, utilities), Shopping (Shopee, Lazada, groceries), Pengajian (books, courses, study materials), Fun (movies, outings, subscriptions), Lain-lain (other).
2. `src/lib/money.js`: export `formatRM(amount)` returning `"RM " + amount.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })`.
3. `WeeklyTotal.jsx`: a hero card (`<section aria-live="polite">`) with the label "This week", the total from a `total` prop using `formatRM`, and a `rangeLabel` prop shown small and muted. For now, App passes `total={0}` and a placeholder range of `""` (hide the range line when empty).
4. `ExpenseForm.jsx`: a card with the heading "Add expense" and labelled fields:
   - Amount (RM): text input, `inputMode="decimal"`, placeholder "0.00", visible "RM" prefix inside the field
   - Category: `<select>` with the 7 categories (label + description, e.g. "Makan — food & drinks"), default Makan
   - Date: `<input type="date">`
   - Note (optional): text input, `maxLength={100}`, placeholder "e.g. Nasi lemak + teh tarik"
   - Primary button "Add expense"
   - Fields are uncontrolled or static for now; submitting does nothing (`preventDefault`).
5. `EmptyState.jsx`: a simple inline SVG wallet or receipt outline in muted blue (`aria-hidden="true"`), then "No expenses yet" and "Add your first one above, e.g. RM 8.50 for nasi lemak."
6. `App.jsx` order: header, `WeeklyTotal`, `ExpenseForm`, a list `<section>` with heading "Your expenses" showing `EmptyState`, then `<footer>` with "Saved in this browser only. Clearing browser data will erase it."
7. `App.css`: apply every token from the Design Direction Summary:
   - frosted cards `rgba(255,255,255,0.72)` + `backdrop-filter: blur(16px)` with `@supports not (backdrop-filter: blur(1px))` falling back to `#ffffff`; 14px radius; shadow `0 4px 20px rgba(0,0,0,0.06)`; 24px padding; 16px gaps
   - weekly total 44px / weight 700 / `tabular-nums`; 36px under 480px
   - inputs: white, 1px `#d2d2d7` border, 10px radius, min height 44px, label above
   - primary button: `#003893`, white text, 12px radius, min height 44px, slightly darker on hover
   - `:focus-visible` 2px `#003893` ring with a soft blue glow on all inputs and buttons
   - a thin gold `#FFCC00` accent is allowed as decoration only (e.g. a short underline under the weekly total label). Never gold text.
   - under 480px: buttons full-width, fields stacked, no horizontal scroll at 360px
   - `@media (prefers-reduced-motion: reduce)`: disable transitions

## What not to do

- Do not add state, validation, add/edit/delete behaviour, or `localStorage`.
- Do not show fake or sample expenses.
- Do not add icon libraries; the empty-state SVG is hand-written inline.
- Do not use gold for text or invent colours outside `design.md`.

## Done when

- The page shows header, weekly total "RM 0.00", the form with all 4 labelled fields and 7 categories, the empty state, and the footer note.
- It matches `design.md` at desktop width and at 360px.
- `npm run build` completes with no errors.
- `build-status.md` is updated.

## Verification steps

- Run `npm run build` and confirm it succeeds.
- Confirm every input has a matching `<label>` (`htmlFor` / `id`).
- Confirm the category dropdown order matches `build-blueprint.md`.
- Design check: weekly total hero, frosted form card, inputs, primary button, empty state, footer note, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Refresh localhost and confirm you see, top to bottom: header, "This week RM 0.00" card, the "Add expense" form, "No expenses yet", and the "Saved in this browser only" footer.
- Open the Category dropdown and confirm all 7 categories appear, with Lain-lain last.
- Press Tab through the form and confirm each field and the button shows a blue focus ring.
- Open browser dev tools, switch to a 360px-wide phone view, and confirm nothing is cut off and there is no sideways scrolling.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after verification and output the learner checkpoint. Do not start Work Card 03.

## Status

Done (2026-10-03). `npm run build` passes; learner localhost test passed.

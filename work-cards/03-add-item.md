# Work Card 03 — Add Item

## Goal

Make "Add expense" work: validate the form, add the expense to an in-memory list, show it grouped by day, and update the weekly total. Data is not saved yet (refresh clears it; that's expected until Work Card 05).

## Inputs

- `build-blueprint.md` — Data / State / Storage Rules (validation, date rules, money rules, sorting and grouping)
- `architecture.md` — User Flow (Add)
- `design.md` — Component Style (cards, category pill), Layout Rules (day headings)

## Files likely touched

- `src/App.jsx`
- `src/App.css`
- `src/components/ExpenseForm.jsx`
- `src/components/WeeklyTotal.jsx`
- `src/components/ExpenseList.jsx` (new)
- `src/components/DayGroup.jsx` (new)
- `src/components/ExpenseItem.jsx` (new)
- `src/lib/money.js` (add `parseAmount`, `sumAmounts`)
- `src/lib/dates.js` (new)
- `build-status.md`

## Instructions for the coding agent

1. `src/lib/dates.js` (pure functions, local time only):
   - `todayString()`: build `"YYYY-MM-DD"` from `getFullYear()`, `getMonth() + 1`, `getDate()`, zero-padded. Never use `toISOString()`.
   - `parseDate(str)`: `new Date(y, m - 1, d)`. Never `new Date("YYYY-MM-DD")`.
   - `getWeekRange(todayStr)`: returns `{ start, end }` strings for Monday to Sunday containing today. On Sunday, Monday is 6 days earlier.
   - `isInWeek(dateStr, range)`: string compare `start <= dateStr && dateStr <= end`.
   - `dayLabel(dateStr, todayStr)`: "Today", "Yesterday", otherwise like "Mon, 28 Sep" (add the year if not the current year).
   - `formatRange(range)`: e.g. "28 Sep – 4 Oct".
2. `src/lib/money.js`:
   - `parseAmount(text)`: trim; return `{ value }` or `{ error }` using the blueprint rules and messages ("Enter an amount, e.g. 8.50" / "Amount must be more than RM 0" / "Use up to 2 decimal places"). Allow max 99,999.99.
   - `sumAmounts(expenses)`: sum `Math.round(amount * 100)` and divide by 100.
3. `App.jsx`: hold `const [expenses, setExpenses] = useState([])`. `addExpense(data)` prepends `{ id: crypto.randomUUID(), ...data }`. Compute the week range from `todayString()` and pass `sumAmounts(expenses in week)` and `formatRange(range)` to `WeeklyTotal`.
4. `ExpenseForm.jsx`: make it controlled. Date defaults to `todayString()` with `max` set to today. On submit:
   - validate amount (via `parseAmount`), category, and date (not in the future: "Date can't be in the future")
   - show each error under its field in `#b42318`, linked with `aria-describedby`, and set `aria-invalid="true"`; focus the first invalid field
   - on success call `onAdd({ amount, category, date, note: note.trim() })`, then reset amount and note, set date back to today, and keep the chosen category
5. `ExpenseList.jsx`: if empty, render `EmptyState`. Otherwise sort by `date` descending (stable, so newer additions stay first within a day), group by date, and render a `DayGroup` per date inside a `<ul>`-based structure.
6. `DayGroup.jsx`: heading from `dayLabel`, then its `ExpenseItem`s.
7. `ExpenseItem.jsx`: frosted card with amount (`formatRM`, 20px, weight 600, `tabular-nums`) on the left, category pill (`#f2f2f5` fill, dark text, thin gold border), and the note in muted text below (hide if empty). Leave room on the right for Edit / Delete (added in Work Card 04).
8. Add the matching CSS (day heading style, item card, pill) following `design.md`.

## What not to do

- Do not add edit or delete yet.
- Do not add `localStorage` yet.
- Do not use `toISOString()` or `new Date("YYYY-MM-DD")` anywhere.
- Do not pre-load sample data.

## Done when

- A valid expense appears under the right day heading and the weekly total updates.
- Invalid input is blocked with a clear message under the field.
- An expense dated in a previous week appears in the list but is not counted in the weekly total.
- `npm run build` completes with no errors.
- `build-status.md` is updated.

## Verification steps

- Run `npm run build` and confirm it succeeds.
- Check `dates.js` by reasoning or a quick console check: for today = a Sunday (e.g. "2026-10-04"), `getWeekRange` returns start "2026-09-28" and end "2026-10-04"; for a Monday it returns that same Monday as start.
- Check `sumAmounts` for 0.1 + 0.2 returns 0.3 exactly.
- Search the code to confirm `toISOString` is not used for dates.
- Design check: item card, category pill, day headings, error messages, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Add a real expense: amount 8.50, category Makan, today's date, note "Nasi lemak + teh tarik". It appears under "Today" as "RM 8.50" and the weekly total shows "RM 8.50".
- Add a second expense, e.g. 3.20, Transport. The total becomes "RM 11.70".
- Try amounts of blank, 0, abc, and 5.555. Each one is blocked with a message under the Amount field.
- Add an expense dated 10 days ago. It appears in the list under its date, but the weekly total does not change.
- Refresh the page. The expenses disappear. This is expected until Work Card 05.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after verification and output the learner checkpoint. Do not start Work Card 04.

## Status

Done (2026-10-03). `npm run build` passes; learner localhost test passed.

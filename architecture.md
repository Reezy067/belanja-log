# Architecture

## Build Shape

Browser-local tool. One data type: expense entries. Saved in browser `localStorage`. No backend.

## Stack Decision

- Vite + React (JavaScript, not TypeScript)
- Plain CSS (one stylesheet)
- `localStorage` for persistence
- Deployed as a static site on Vercel

## Structure Overview

One page, top to bottom:

1. Header: "Belanja Log" + this week's total
2. Expense form (add mode / edit mode)
3. Weekly breakdown card "Where your money went" (v1.1; shown once any expense exists)
4. Expense list, grouped by day, newest first (or empty state)

## Component Map

- `App` — holds the expenses list and editing ID; loads and saves storage
- `WeeklyTotal` — shows "This week: RM X.XX" (Monday to Sunday)
- `ExpenseForm` — amount, category, date, note; "Add expense" or "Save changes" / "Cancel"
- `ExpenseList` — groups expenses by date and renders `DayGroup`
- `DayGroup` — day heading ("Today", "Yesterday", "Mon, 28 Sep") + its items
- `ExpenseItem` — amount, category, note, Edit and Delete buttons
- `EmptyState` — friendly message when there are no expenses
- `WeeklyBreakdown` — this week's spending per category, largest first, with simple bars (v1.1)

Helpers (`src/lib`):

- `categories.js` — the fixed category list
- `storage.js` — `loadExpenses()` / `saveExpenses()`
- `dates.js` — today string, start/end of this week, day labels
- `money.js` — `formatRM()`, parse and validate amount
- `breakdown.js` — `categoryBreakdown(weekExpenses)`, sums in sen per category (v1.1)

## Data / State Model

Expense:

- `id`: string (`crypto.randomUUID()`)
- `amount`: number, greater than 0, max 2 decimals, max 99,999.99
- `category`: one of `Makan`, `Transport`, `Bills`, `Shopping`, `Pengajian`, `Fun`, `Lain-lain`
- `date`: `"YYYY-MM-DD"` (local date; defaults to today; cannot be in the future)
- `note`: string, optional, max 100 characters

Category descriptions (for helper text):

- Makan — food & drinks
- Transport — Grab, LRT/MRT, petrol, toll
- Bills — phone, internet, utilities
- Shopping — Shopee, Lazada, groceries
- Pengajian — books, courses, study materials
- Fun — movies, outings, subscriptions
- Lain-lain — other

App state:

- `expenses`: Expense[]
- `editingId`: string | null

## Storage Logic

- Key: `belanja-log.expenses.v1`
- Value: JSON array of Expense objects
- Load once on startup. If missing, invalid JSON, or not an array, start with an empty list.
- Save the whole array after every add, edit, or delete.

## User Flow

- Add: fill the form, then "Add expense". The entry appears in its day group, the weekly total updates, and the form resets (date returns to today, category stays the same).
- Edit: tap Edit. The form fills with that expense and shows "Save changes" and "Cancel". Saving updates the entry; Cancel clears the form back to add mode.
- Delete: tap Delete, then the browser confirm box asks "Delete this expense?" On OK, the entry is removed. If it was being edited, the form returns to add mode.
- Refresh: all entries reappear from `localStorage`.
- Empty: the list shows the empty-state message and the weekly total shows RM 0.00.

## File Expectations

- `index.html`
- `package.json` (created by Vite)
- `src/main.jsx`
- `src/App.jsx`
- `src/App.css`
- `src/components/WeeklyTotal.jsx`, `ExpenseForm.jsx`, `ExpenseList.jsx`, `DayGroup.jsx`, `ExpenseItem.jsx`, `EmptyState.jsx`
- `src/lib/categories.js`, `storage.js`, `dates.js`, `money.js`, `breakdown.js` (v1.1)
- `src/components/WeeklyBreakdown.jsx` (v1.1)
- `public/favicon.svg` (v1.1)

## Constraints

- One data type only
- Amounts in RM only, shown as "RM 1,234.50"
- Week = Monday to Sunday, device local time
- Must work on a 360px-wide mobile screen
- All form fields have visible labels; buttons are keyboard-usable

## Technical Non-Goals

No backend, login, database, cloud sync, live APIs, payments, uploads, charts, budgets, multiple currencies, or extra data tables.

## Verification Notes

- `npm run build` completes with no errors
- Runs on localhost via `npm run dev`
- Manual checks:
  - Add a sample (RM 8.50, Makan, "Nasi lemak + teh tarik") and check the weekly total updates
  - Refresh and confirm it remains
  - Edit it and confirm the change persists after refresh
  - Delete it (confirm box appears) and see the empty state
  - Invalid amount (0, blank, abc) is blocked with a message
  - Layout works at 360px mobile width
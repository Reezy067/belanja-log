# Build Blueprint

## Source Files

This blueprint combines the confirmed planning files. If anything here conflicts with them, the source file wins and this blueprint must be corrected.

- `project-brief.md` — identity, user, scope, proof target
- `architecture.md` — stack, components, data model, storage, user flow
- `design.md` — visual direction, components, mobile, accessibility, anti-slop
- `build-status.md` — current phase, decisions, next instruction

## Project Identity

- Name: **Belanja Log**
- Tagline: "Track your RM, stay aware"
- Concept: a simple browser-based log where Malaysians quickly record daily spending in RM and see their weekly total, with no account and no budgeting, just awareness.
- Target user: Malaysian students and young workers who feel the rising cost of living and lose track of small daily spending.
- Learner / owner: Reezy067

## Build Shape

**Browser-local tool.** One data type (expense entries), saved in browser `localStorage`. No backend.

Browser-local guardrails apply: one data type only; add, edit, delete; save with `localStorage`; refresh proves persistence in the same browser; empty-state and mobile checks.

## Version-One Promise

A user can open Belanja Log on a phone or laptop and:

1. Add an expense with amount (RM), category, date (defaults to today), and an optional note
2. See all expenses in a list, newest date first, grouped by day
3. Edit an expense using the same form
4. Delete an expense after a confirm prompt
5. See this week's total (Monday to Sunday) in RM
6. Refresh the page and find every entry and the total unchanged
7. See a clear empty state when there are no expenses
8. Use all of it comfortably at 360px width

## Scope Lock

### Now

The eight items in the Version-One Promise.

Approved v1.1 upgrade (2026-10-03, after v1.0 shipped): bank-card weekly total with "BL" logo mark + favicon, and the "Where your money went" weekly category breakdown with simple bars. See `design.md` > Version 1.1 Upgrades and `work-cards/08-design-upgrades.md`.

### Later

- "Spent today" total
- "vs. last week" comparison
- Faint batik-inspired background texture
- Charts, monthly view

### Never

Not in this build:

- Budgets, spending limits, or progress-to-target indicators
- Login or accounts
- Cloud sync, backend, or database
- Chart libraries or complex charts (simple CSS bars in the weekly breakdown are allowed)
- Bank or e-wallet connections (e.g. Touch 'n Go, DuitNow)
- Receipt photo uploads
- Multiple currencies (RM only)
- Live APIs, secrets, payments, multiple data tables, admin systems, multi-user sync

## Architecture Summary

- Stack: Vite + React (JavaScript, not TypeScript) + plain CSS (`src/App.css`)
- Static single-page app, deployed to Vercel (build `npm run build`, output `dist`)
- Page order: Header, WeeklyTotal (hero), ExpenseForm, ExpenseList or EmptyState, footer note

Components:

| Component | Responsibility |
|---|---|
| `App` | Owns `expenses` and `editingId`; loads from and saves to storage; passes handlers down |
| `WeeklyTotal` | "This week" label, "RM X.XX" total, date range (e.g. "28 Sep – 4 Oct") |
| `ExpenseForm` | Amount, Category, Date, Note fields; add mode and edit mode; validation messages |
| `ExpenseList` | Sorts and groups expenses by date; renders `DayGroup` per date |
| `DayGroup` | Day heading ("Today", "Yesterday", "Mon, 28 Sep") + its `ExpenseItem`s |
| `ExpenseItem` | Amount, category pill, note, date; Edit and Delete text buttons |
| `EmptyState` | Inline SVG + "No expenses yet" message |
| `WeeklyBreakdown` | v1.1: this week's spend per category, largest first, simple bars |

Helpers in `src/lib`:

| File | Exports |
|---|---|
| `categories.js` | `CATEGORIES` array (id, label, description) |
| `money.js` | `formatRM(amount)`, `parseAmount(text)`, `sumAmounts(expenses)` |
| `dates.js` | `todayString()`, `getWeekRange(today)`, `isInWeek(dateStr, range)`, `dayLabel(dateStr, today)`, `formatRange(range)` |
| `storage.js` | `STORAGE_KEY`, `loadExpenses()`, `saveExpenses(expenses)` |
| `breakdown.js` | v1.1: `categoryBreakdown(weekExpenses)` returns `{ category, amount, share }[]` |

## Data / State / Storage Rules

Expense shape (exactly these 5 fields):

```js
{
  id: "uuid-string",        // crypto.randomUUID()
  amount: 8.5,              // number > 0, max 2 decimals, max 99999.99
  category: "Makan",        // one of the 7 categories below
  date: "2026-10-03",       // "YYYY-MM-DD", local date, not in the future
  note: "Nasi lemak + teh tarik" // string, optional ("" allowed), max 100 chars
}
```

Categories (fixed order; Lain-lain last):

| id / label | Description |
|---|---|
| Makan | food & drinks |
| Transport | Grab, LRT/MRT, petrol, toll |
| Bills | phone, internet, utilities |
| Shopping | Shopee, Lazada, groceries |
| Pengajian | books, courses, study materials |
| Fun | movies, outings, subscriptions |
| Lain-lain | other |

App state:

- `expenses`: Expense[]
- `editingId`: string | null

Validation (shown as text under the field, linked with `aria-describedby`):

- Amount: required; must match `^\d{1,5}(\.\d{1,2})?$`; must be greater than 0. Messages: "Enter an amount, e.g. 8.50" / "Amount must be more than RM 0" / "Use up to 2 decimal places".
- Category: required; must be one of the 7.
- Date: required; not later than today. Message: "Date can't be in the future".
- Note: optional; trimmed; max 100 characters (`maxLength=100`).

Date rules (important to avoid off-by-one bugs):

- Build "today" from `getFullYear()`, `getMonth()`, `getDate()`. Never use `toISOString()` for local dates (it shifts to UTC and gives yesterday's date before 8am in Malaysia).
- Parse `"YYYY-MM-DD"` with `new Date(y, m - 1, d)`. Never use `new Date("YYYY-MM-DD")`.
- Week = Monday 00:00 to Sunday 23:59 local time. On a Sunday, the week started six days earlier.
- Because dates are `"YYYY-MM-DD"` strings, compare them as strings (`start <= date && date <= end`).

Money rules:

- Sum in sen (integers): `Math.round(amount * 100)`, then divide by 100 for display.
- Display: `"RM " + amount.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })` gives "RM 1,234.50".

Sorting and grouping:

- Sort by `date` descending. Within the same date, newest added first (new expenses are prepended to the array).
- Group consecutive items by `date`.

Storage:

- Key: `belanja-log.expenses.v1`
- Value: `JSON.stringify(expenses)`
- Load once on startup (lazy `useState` initializer). If the key is missing, the JSON is invalid, or the value is not an array, return `[]`. Drop items missing required fields.
- Save the whole array whenever `expenses` changes (`useEffect`).
- Wrap `localStorage` access in `try/catch` so private-mode errors do not crash the app.

## Design Direction Summary

Fallback style: **Apple-like premium minimal, with subtle Malaysian touches.** Mood: clean, calm, premium, trustworthy, quietly Malaysian.

Borrow (the feel only):

- Generous white space, single centred column (max width 560px)
- Frosted-glass cards: `rgba(255,255,255,0.72)` + `backdrop-filter: blur(16px)`, solid white fallback, 14px radius, soft shadow
- System font stack, bold headings, large tabular-number amounts
- One accent, royal blue `#003893`; gold `#FFCC00` for decoration only
- Gentle hover lift; nothing heavy

Do not copy:

- No Apple logos, product names, icons, wording, or page layouts
- No flag imagery or government-style emblems
- No testimonials, stats, photos, or pre-loaded sample data

Key tokens:

| Token | Value |
|---|---|
| Background | gradient `#fbfbfd` to `#f2f1ee` |
| Heading text | `#000000` |
| Body text | `#1d1d1f` |
| Muted text | `#57575c` |
| Accent | `#003893` |
| Decoration | `#FFCC00` (never text) |
| Destructive / error | `#b42318` |
| Input border | `#d2d2d7` |
| Pill fill | `#f2f2f5` |
| Card radius / input radius / button radius | 14px / 10px / 12px |
| Min tap target | 44px |
| Weekly total size | 44px desktop, 36px mobile, weight 700 |
| Item amount size | 20px, weight 600 |

States:

- Edit state: form title "Edit expense", 2px blue border, "Save changes" + "Cancel", the edited item gets a thin blue outline, and the form scrolls into view.
- Delete: quiet red "Delete" text button, then `window.confirm("Delete this expense?")`.
- Empty state: inline SVG wallet/receipt in muted blue, "No expenses yet", "Add your first one above, e.g. RM 8.50 for nasi lemak."
- Refresh proof: footer always shows "Saved in this browser only. Clearing browser data will erase it."

Full details: `design.md`.

## Implementation Rules

1. Follow `design.md` for every visual decision. Do not invent new colours, fonts, or decorations.
2. Plain CSS in `src/App.css` (plus a minimal reset in it). No Tailwind, no UI libraries, no icon libraries, no animation libraries.
3. Only runtime dependencies: `react`, `react-dom`. Dev dependencies: `vite`, `@vitejs/plugin-react`. Install with exact versions (`npm install --save-exact`).
4. Keep helpers in `src/lib` pure (no React, no DOM except `storage.js`).
5. Use semantic HTML: `<header>`, `<main>`, `<form>`, `<section>`, `<ul>/<li>`, `<footer>`, `<label>` on every input.
6. Edit and Delete buttons have accessible names that include the item (e.g. `aria-label="Delete RM 8.50 Makan"`).
7. Weekly total uses `aria-live="polite"`.
8. Use `:focus-visible` blue focus rings; respect `prefers-reduced-motion`.
9. Use the real Malaysian copy from `design.md` and `architecture.md`. No lorem ipsum.
10. Do not pre-load sample expenses. The learner adds the real sample during testing.
11. The project folder already contains planning files. Never delete or overwrite them while scaffolding. Do not run `create-vite` in a way that removes existing files.

## File and Folder Expectations

```text
/ (project root, alongside the existing planning files)
├── .gitignore              # node_modules, dist, .DS_Store, *.log
├── index.html              # lang="en", title "Belanja Log", viewport meta
├── package.json            # name "belanja-log", scripts: dev, build, preview
├── vite.config.js          # React plugin
├── public/
│   └── favicon.svg         # v1.1: BL logo mark
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── WeeklyTotal.jsx
    │   ├── ExpenseForm.jsx
    │   ├── ExpenseList.jsx
    │   ├── DayGroup.jsx
    │   ├── ExpenseItem.jsx
    │   ├── EmptyState.jsx
    │   └── WeeklyBreakdown.jsx   # v1.1
    └── lib/
        ├── categories.js
        ├── money.js
        ├── dates.js
        ├── storage.js
        └── breakdown.js          # v1.1
```

Planning files stay where they are: `START_HERE.md`, `README_FOR_TRAINERS.md`, `project-brief.md`, `architecture.md`, `design.md`, `build-blueprint.md`, `build-status.md`, `prompts/`, `templates/`, `work-cards/`.

## Work Card Plan

| Card | File | Delivers | Learner proof |
|---|---|---|---|
| 01 | `work-cards/01-project-skeleton.md` | Vite + React set up in place, `.gitignore`, header "Belanja Log" + tagline on the gradient background | `npm run dev` starts; header shows on localhost |
| 02 | `work-cards/02-static-layout.md` | All components as static UI: WeeklyTotal (RM 0.00), form fields with 7 categories, EmptyState, footer note; full design CSS; `categories.js`, `money.js` `formatRM` | Full layout visible; matches design at desktop and 360px |
| 03 | `work-cards/03-add-item.md` | Working add with validation, grouped list, day labels, weekly total; `dates.js`, `parseAmount`, `sumAmounts` | Add RM 8.50 Makan; total updates; invalid amounts blocked |
| 04 | `work-cards/04-update-delete-item.md` | Edit mode via the same form, Cancel, edit-state styling, Delete with confirm | Edit changes the entry; Cancel works; Delete asks first and removes |
| 05 | `work-cards/05-localstorage-save-refresh.md` | `storage.js`, load on start, save on change, safe fallback | Add, refresh, still there; edit, refresh, still edited; delete, refresh, still gone |
| 06 | `work-cards/06-review-and-fix.md` | Review Mirror pass + single smallest useful fix; `npm run build` passes | Full flow, mobile width, accessibility checks |
| 07 | `work-cards/07-github-vercel-proof.md` | Git init, GitHub push, Vercel deploy, proof | Live URL works; flow re-tested live |
| 08 | `work-cards/08-design-upgrades.md` | v1.1: bank-card hero, logo + favicon, weekly category breakdown; redeploy | Breakdown matches total; hero readable at 360px; live site updated |

## Review Mirror

Run `prompts/07-review-mirror.md` at Work Card 06. Check against this blueprint:

1. Matches the goal: quick RM expense logging and weekly awareness
2. Obeys browser-local guardrails: one data type, `localStorage` only, no backend/login
3. Main flow works: add, edit, delete, weekly total, empty state
4. Refresh persistence works for add, edit, and delete
5. Readable at 360px with no horizontal scroll; tap targets at least 44px
6. Follows `design.md`: blue accent, gold decoration only, frosted cards, weekly total hero
7. No fake claims, logos, stats, testimonials, lorem ipsum, or pre-loaded data
8. Nothing copied from Apple or any brand; no flag imagery
9. One clear primary action: "Add expense"
10. Weekly total is correct on a Sunday, and an expense dated last week is excluded

Return PASS / NEEDS FIX / REDRAFT, the top 1–3 issues, and the single smallest useful fix.

## Proof Ladder

- **Strong:** live Vercel URL + GitHub repo URL (Reezy067) + 60-second explanation
- **Good:** GitHub repo URL + localhost screen recording or screenshots + explanation
- **Minimum:** localhost screen recording or screenshots + explanation of what worked and what blocked GitHub/Vercel

Demo script (live or recorded):

1. Show the empty state and "RM 0.00"
2. Add RM 8.50, Makan, today, "Nasi lemak + teh tarik"; the weekly total shows RM 8.50
3. Refresh; the entry and total remain
4. Edit the amount to RM 9.00; the total updates
5. Delete it with confirmation; the empty state returns
6. Show the mobile view (360px)

## 60-Second Explanation Template

> I built **Belanja Log**, a daily expense tracker in Ringgit for Malaysian students and young workers. With the cost of living rising, it's easy to lose track of small daily spending.
>
> You log an expense in seconds, with amount in RM, category, date, and an optional note, and the big card at the top shows what you've spent this week. You can edit or delete any entry.
>
> It's a browser-local tool: everything is saved in your browser's localStorage, so there's no account, it works offline, and your data stays on your device. Watch: I add an entry, refresh, and it's still here.
>
> I built it with Vite, React, and plain CSS, using an Apple-inspired calm minimal design with a Malaysian royal-blue accent. Next, I'd add a weekly category breakdown.

## Guardrails for the Coding Agent

- Read `build-status.md`, `build-blueprint.md`, `design.md`, and the current work card before editing.
- Implement only the current work card. Do not jump ahead.
- Stop after verification and output the learner checkpoint from `prompts/06-build-runner.md`.
- Update `build-status.md` after each work card (what changed, what passed, what failed, next card).
- Apply browser-local tool guardrails: one data type, `localStorage` only.
- Do not add backend, auth, database, live API, payments, uploads, or multi-user features. This blueprint does not allow any of them.
- Do not add secrets or API keys to code.
- Do not invent claims, testimonials, logos, stats, or real numbers. No pre-loaded sample data.
- Do not delete or overwrite planning files, `prompts/`, `templates/`, or `work-cards/`.
- Do not initialize Git or deploy before Work Card 07.
- If a legacy file uses `Build Mode`, treat it as `Build Shape` without stopping.
- If something in this blueprint seems wrong, stop and ask the learner instead of changing scope.
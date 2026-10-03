# Build Status

## Project

- Name: Belanja Log
- Build shape: Browser-local tool
- Shape confirmation: Confirmed by learner (2026-10-03)
- Current KDBM Lite stage: Shipped (v1.0 live); v1.1 design upgrades in progress
- Current phase: Ready to Build
- Current work card: `work-cards/08-design-upgrades.md`

## Completed work cards

Planning files complete: `project-brief.md`, `architecture.md`, `design.md`, `build-blueprint.md`, `work-cards/01-07`.

- [x] 00 Setup Gate (completed 2026-10-03)
- [x] Project Brief / Identity (completed 2026-10-03, saved `project-brief.md`)
- [x] Architecture (completed 2026-10-03, saved `architecture.md`)
- [x] Design (completed 2026-10-03, saved `design.md`)
- [x] Build Blueprint (completed 2026-10-03, saved `build-blueprint.md`)
- [x] Work Cards generated (2026-10-03): 01-07 in `work-cards/`
- [x] 01 Project Skeleton (completed 2026-10-03; learner localhost check passed)
- [x] 02 Static Layout (completed 2026-10-03; learner localhost check passed)
- [x] 03 Add Item (completed 2026-10-03; learner localhost check passed)
- [x] 04 Update and Delete Item (completed 2026-10-03; learner localhost check passed)
- [x] 05 localStorage Save and Refresh (completed 2026-10-03; learner localhost check passed)
- [x] 06 Review and Fix (completed 2026-10-03; review PASS, 1 fix; learner final review passed)
- [x] 07 GitHub + Vercel Proof (completed 2026-10-03; live URL tested by learner)

## In progress

- [x] Work Card 07: GitHub push done (https://github.com/Reezy067/belanja-log, commit 7ad43b7)
- [x] Work Card 07: Vercel deploy done (https://belanja-log.vercel.app/)
- [x] 08 Design Upgrades v1.1 (completed 2026-10-03; learner approved; pushed)

## Blockers

- None recorded yet

## Decisions made

- Project name: Belanja Log
- Build type: Browser-local tool
- Build shape: Browser-local tool (one data type: expense entries, saved in localStorage)
- Stack: Vite + React (JavaScript) + plain CSS, static deploy on Vercel
- Design inspiration: No designmd.ai URL; fallback Apple-like premium minimal + subtle Malaysian touches
- Design rules: royal blue #003893 accent, gold #FFCC00 decoration only, frosted-glass cards (14px radius), system-ui font, weekly total hero, quiet text Edit/Delete, AA contrast, 360px mobile
- Storage: localStorage key `belanja-log.expenses.v1` (JSON array of expenses)
- Structure: single page (header + weekly total, form with add/edit mode, day-grouped list, empty state)
- Data model: Expense { id, amount, category (7 fixed), date YYYY-MM-DD, note optional }
- Edit: reuses add form; Delete: browser confirm first; List: all expenses, newest first, grouped by day
- Deployment target: GitHub + Vercel if available
- Proof target: Live Vercel URL + public GitHub repo; demo add, refresh-persist, edit, delete, empty state, mobile view
- Version-one scope: Core loop only (add, list, edit, delete, weekly total, persist after refresh)
- Scope change (learner approved 2026-10-03 11:47, for judging marks): after shipping, add (1) bank-card style weekly total hero in royal blue + small "BL" logo mark + favicon, and (3) "Where your money went" weekly category breakdown with simple CSS bars (moved from Later; simple bars allowed, still no chart library). Ship first, then upgrade. Deadline 14:15 MYT.

## Last verified state

- Coding workspace: Kiro IDE, project folder open (verified 2026-10-03)
- File read/write access: Verified (agent read START_HERE.md and edited this file)
- Terminal access: Verified (PowerShell opens in project folder)
- Node: v24.18.1
- npm: 11.16.0
- Git: 2.55.0.windows.5
- Git identity: Present (user.name and user.email set)
- Browser for localhost: Available (learner confirmed)
- GitHub account: Ready, logged in as Reezy067 (learner confirmed)
- GitHub repo: https://github.com/Reezy067/belanja-log (public, pushed 2026-10-03)
- Live URL: https://belanja-log.vercel.app/ (learner tested: add, refresh, works)
- Proof level: Strong (live Vercel URL + public GitHub repo)
- Vercel account: Ready, linked with GitHub (learner confirmed)
- Fallback AI account: None for now (optional)
- KrackedDevs account: Ready, logged in (learner confirmed)
- Localhost: Working (learner screenshot 2026-10-03: header, tagline, gradient background, no errors)
- Build: `npm run build` passes (Vite 8.3.2, React 19.3.0, @vitejs/plugin-react 6.1.1, exact versions)

## Work Card 01 log

- Created: `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.gitignore`, `src/main.jsx`, `src/App.jsx`, `src/App.css`
- Set up by hand (no `npm create vite`); all planning files untouched
- Passed: `npm run build`; exact versions (no ^/~); `.gitignore` has node_modules and dist; planning files present
- Learner localhost check: passed (screenshot shows header, tagline, soft gradient, no error screen)

## Work Card 02 log

- Created: `src/lib/categories.js`, `src/lib/money.js` (`formatRM`), `src/components/WeeklyTotal.jsx`, `src/components/ExpenseForm.jsx`, `src/components/EmptyState.jsx`
- Updated: `src/App.jsx` (header, weekly total RM 0.00, form, "Your expenses" + empty state, footer note), `src/App.css` (full design tokens, frosted cards with solid fallback, focus rings, mobile under 480px, reduced motion)
- Passed: `npm run build`; all 4 inputs have matching labels; 7 categories in blueprint order; gold used only as a decorative border under "This week"
- Note: date field is blank for now; it defaults to today in Work Card 03
- Learner screenshot (desktop): layout order correct (header, RM 0.00 hero, form, empty state, footer); no errors
- Learner confirmed: category dropdown, Tab focus rings, 360px view all good

## Work Card 03 log

- Created: `src/lib/dates.js` (local-time helpers: todayString, getWeekRange, isInWeek, dayLabel, formatRange, isValidDateString), `src/components/ExpenseList.jsx`, `src/components/DayGroup.jsx`, `src/components/ExpenseItem.jsx`
- Updated: `src/lib/money.js` (parseAmount, sumAmounts in sen), `src/components/ExpenseForm.jsx` (controlled, validation, errors via aria-describedby, focus first invalid field, date defaults to today with max=today), `src/App.jsx` (expenses state, weekly total + range label), `src/App.css` (errors, day headings, expense cards, category pill)
- Passed: `npm run build`; helper checks: Sunday 2026-10-04 week = 28 Sep to 4 Oct; Monday starts its own week; year boundary OK; 0.1 + 0.2 = 0.3; blank/0/abc/5.555/-5/100000 blocked with messages; no `toISOString` used
- Decisions: added one extra message "Amount must be RM 99,999.99 or less" for the max rule; the expense card does not repeat the date because the day heading already shows it; `crypto.randomUUID` has a fallback for plain-http LAN testing
- Expected: refresh clears expenses until Work Card 05
- Learner screenshots: RM 8.50 Makan + RM 3.50 Transport under Today, total RM 12.00, range 28 Sep – 4 Oct; RM 5.55 on Wed 23 Sep listed but excluded from total; date defaults to today; refresh clears data (expected before Work Card 05)

## Work Card 04 log

- Updated: `src/App.jsx` (editingId state; startEdit, updateExpense keeps id and position, cancelEdit, deleteExpense clears edit mode if needed; form remounts via `key` when switching add/edit), `src/components/ExpenseForm.jsx` (edit mode: "Edit expense" title, "Save changes" + "Cancel", blue border, scrolls into view and focuses Amount, reduced-motion aware), `src/components/ExpenseItem.jsx` (quiet Edit / Delete text buttons, aria-labels like "Delete RM 8.50 Makan", `window.confirm("Delete this expense?")`, blue outline while editing), `DayGroup.jsx` / `ExpenseList.jsx` (pass editingId and handlers), `src/App.css` (secondary button, text buttons with 44px tap area, edit-state styles, actions below content under 480px)
- Passed: `npm run build`
- Behaviour notes: changing the date while editing moves the expense to the right day group (list is re-sorted by date); after Save or Cancel the form returns to add mode with category reset to Makan
- Learner confirmed: edit, save, cancel, delete confirm, and mobile layout all work

## Work Card 05 log

- Created: `src/lib/storage.js` (`STORAGE_KEY = "belanja-log.expenses.v1"`, `loadExpenses()`, `saveExpenses()`, all wrapped in try/catch)
- Updated: `src/App.jsx` (lazy `useState(() => loadExpenses())`; `useEffect` saves the array on every change; `editingId` is not saved)
- Load rules: missing key, invalid JSON, or non-array gives `[]`; items with a bad id, amount, category, or date are dropped; missing note becomes ""
- Passed: `npm run build`; storage stub checks (missing key, "not json", non-array, mixed good/bad items, save/load round trip, storage throwing on read and write) all behave as expected with no crash
- Learner confirmed: add, edit, delete each survive refresh; all tests passed

## Work Card 06 log (Review Mirror)

Result: **PASS**

Review Mirror checklist (`build-blueprint.md`):

1. Matches goal (quick RM logging + weekly awareness): pass
2. Browser-local guardrails (one data type, localStorage only, no backend/login): pass
3. Main flow (add, edit, delete, weekly total, empty state): pass (learner tested Cards 03–05)
4. Refresh persistence for add, edit, delete: pass (learner tested Card 05)
5. 360px readable, no sideways scroll, 44px tap targets: pass (learner tested Cards 02 and 04)
6. Follows `design.md` (blue accent, gold decoration only, frosted cards, total hero): pass
7. No fake claims, logos, stats, testimonials, lorem ipsum, or pre-loaded data: pass (code scan)
8. Nothing copied from Apple or another brand; no flag imagery: pass
9. One clear primary action ("Add expense"): pass
10. Sunday week logic and previous-week exclusion: pass (helper checks + learner test with 23 Sep entry)

Also checked: no secrets/API keys/.env files; no `toISOString` or `new Date("YYYY-MM-DD")` in code (comments only); gold never used as text; `npm run build` passes.

Top issues found:

1. After "Save changes" or "Cancel", keyboard focus was lost (form remounts), so keyboard and screen-reader users were dropped back to the top of the page. **Fixed.**
2. The browser asks for `/favicon.ico` and logs a harmless 404 in the console (no favicon). Not fixed (cosmetic).
3. Expense cards don't repeat the date that `design.md` mentions, because the day heading already shows it. Intentional, accepted.

Single smallest useful fix applied: `src/App.jsx` remembers which expense was being edited and, after Save changes or Cancel, scrolls to that card and focuses its Edit button (reduced-motion aware). `src/components/ExpenseItem.jsx` adds `data-edit-id` to the Edit button. `npm run build` passes after the fix.

Not verified by agent: `npm run preview` in a browser (the agent can't hold a server open); learner runs the final localhost review.

## Work Card 08 log (v1.1 design upgrades)

- Planning files updated first: `project-brief.md` (Now/Later/Never), `architecture.md` (component map, files), `design.md` (new "Version 1.1 Upgrades" section), `build-blueprint.md` (scope lock, components, tree, card plan), new `work-cards/08-design-upgrades.md`
- Created: `public/favicon.svg` (BL mark), `src/lib/breakdown.js` (categoryBreakdown in sen, formatShare), `src/components/WeeklyBreakdown.jsx`
- Updated: `index.html` (favicon, theme-color), `src/App.jsx` (logo mark in header, weekExpenses, count, breakdown after form), `src/components/WeeklyTotal.jsx` (bank-card layout, chip, range + count), `src/App.css` (logo mark, bank-card hero, breakdown rows and bars, mobile)
- Passed: `npm run build`; favicon copied to dist and linked; breakdown check: Makan RM 12.50 78% | Transport RM 3.50 22%, sum equals weekly total, shares sum to 1, ties follow category order, 0.1 + 0.2 = 0.3
- Learner feedback: loves the bank card; background too plain/white. Added per learner's original direction: soft blue light from above, cool-to-warm base gradient, faint batik-inspired "bunga" motif (`public/batik.svg`) fading downward, slightly clearer frosted cards. `design.md` updated (Background with depth); batik moved out of Later. `npm run build` passes.
- Not verified by agent: browser look (learner check)

## Next instruction for AI

After the learner replies `continue` for Work Card 08, commit (`git add` specific changed files) with message `feat: v1.1 bank-card hero, logo, weekly breakdown` and `git push` to origin main so Vercel redeploys. Then ask the learner to check https://belanja-log.vercel.app/ and help prepare the submission (explanation + how Kiro was used).

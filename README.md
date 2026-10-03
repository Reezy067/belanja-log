# Belanja Log

**Track your RM, stay aware.** A simple daily expense tracker in Ringgit Malaysia for Malaysian students and young workers.

Live: https://belanja-log.vercel.app/

## The problem

The cost of living in Malaysia keeps rising, and small daily spending (nasi lemak, Grab rides, Shopee orders, top-ups) is easy to lose track of. Most budgeting apps ask for an account, bank access, or a full budget before you see anything useful. Many students and young workers just want to know where their money went this week.

## The solution

Belanja Log lets you log an expense in seconds and shows you your week at a glance. There's no sign-up and no bank connection, and it works offline.

- **Quick logging:** amount in RM, category, date (defaults to today), and an optional note
- **Bank-card weekly total:** Monday to Sunday, with the week range and expense count
- **"vs this time last week":** compares this week so far with the same days last week, for a fair comparison
- **Where your money went:** a category ring plus amount, percentage, and bar for each category
- **Edit and delete:** edit reuses the same form, and delete asks for confirmation
- **Malaysian categories:** Makan, Transport, Bills, Shopping, Pengajian, Fun, Lain-lain
- **Private by design:** data is saved only in your browser (`localStorage`), so nothing leaves your device

## How Kiro was used

The whole project was planned, built, checked, and shipped inside **Kiro** during the hackathon window.

1. **Spec first.** Kiro's agent ran a structured planning flow and asked one question at a time. Each confirmed answer was saved to a planning file before any code was written:
   - [`project-brief.md`](project-brief.md): user, problem, scope (Now / Later / Never)
   - [`architecture.md`](architecture.md): stack, components, data model, storage
   - [`design.md`](design.md): design rules, colours, mobile and accessibility rules
   - [`build-blueprint.md`](build-blueprint.md): the builder-ready spec
2. **Work cards.** Kiro split the build into small [work cards](work-cards/) (skeleton → layout → add → edit/delete → storage → review → ship → upgrades). It implemented one card at a time, ran `npm run build` plus logic checks in the terminal, then stopped so I could test each card on localhost.
3. **Self-review.** Kiro ran a review against the blueprint, found a keyboard-focus accessibility issue after editing, and fixed it.
4. **Progress log.** [`build-status.md`](build-status.md) records every decision, check, and fix, so the build could resume at any point.
5. **Steering.** [`.kiro/steering/belanja-log.md`](.kiro/steering/belanja-log.md) gives Kiro the project's scope, data, and design rules on every request.
6. **Shipping.** Kiro committed and pushed to GitHub, and Vercel deploys from `main`.

Bugs the spec prevented before they happened: dates use local time (no "yesterday before 8am" UTC bug), money is summed in sen (no RM 0.30000000004), and broken saved data loads as an empty list instead of crashing.

## Tech

- Vite + React (JavaScript), plain CSS
- No backend, no chart library, no external APIs
- Deployed on Vercel as a static site

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173). Build with `npm run build`.

## Project structure

```text
src/
  App.jsx, App.css, main.jsx
  components/  WeeklyTotal, ExpenseForm, WeeklyBreakdown, CategoryRing,
               ExpenseList, DayGroup, ExpenseItem, EmptyState
  lib/         categories, money, dates, storage, breakdown, compare
public/        favicon.svg, batik.svg
```

## Privacy note

Everything is stored in your browser only. Clearing browser data erases it, and nothing is sent to any server.
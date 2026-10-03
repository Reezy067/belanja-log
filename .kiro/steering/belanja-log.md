---
inclusion: always
---

# Belanja Log — project rules for Kiro

Belanja Log is a daily expense tracker in Ringgit Malaysia for Malaysian students and young workers. It is a browser-local tool: one data type (expenses), saved in `localStorage`, no backend.

## Source of truth

Read these before changing anything: `build-status.md`, `build-blueprint.md`, `design.md`, and the current work card in `work-cards/`. Update `build-status.md` after every change.

## Scope

- Never add: login, backend, database, cloud sync, live APIs, payments, uploads, budgets/limits, multiple currencies, chart libraries.
- Allowed visuals: simple CSS bars and the one SVG category ring.
- Ask the learner before any scope change.

## Data rules

- Expense: `{ id, amount, category, date "YYYY-MM-DD", note }`; storage key `belanja-log.expenses.v1`.
- Dates use local time only. Never `toISOString()` or `new Date("YYYY-MM-DD")`.
- Sum money in sen (`Math.round(amount * 100)`); display as "RM 1,234.50".
- Week is Monday to Sunday.

## Design rules

- Apple-like premium minimal with subtle Malaysian touches; follow `design.md` tokens.
- Accent royal blue `#003893`; gold `#FFCC00` and category colours are decoration only, never text.
- Frosted-glass cards over the faint batik-inspired background; bank-card weekly total.
- AA contrast, visible focus rings, labels on all inputs, 44px tap targets, no sideways scroll at 360px, respect `prefers-reduced-motion`.
- No fake data, logos, testimonials, flag imagery, or lorem ipsum.

## Workflow

- One work card at a time; run `npm run build`; stop for the learner's localhost check before committing or pushing.
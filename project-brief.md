# Project Brief

## Project Identity

Belanja Log — a daily expense tracker in Ringgit Malaysia (RM).

## One-Sentence Concept

A simple browser-based log where Malaysians quickly record daily spending in RM and see their weekly total, with no account and no budgeting, just awareness.

## Target User

Malaysian students and young workers who feel the rising cost of living and lose track of small daily spending.

## User Goal

Quickly log an expense (amount in RM, category, optional note), see where their money went this week, and fix or remove mistakes.

## Build Shape

Browser-local tool. One data type: expense entries, saved in browser `localStorage`.

## Shape Confirmation

Confirmed by learner on 2026-10-03.

## Version-One Success

- Add an expense: amount (RM), category, optional note
- See all expenses in a list
- Edit an expense
- Delete an expense
- See this week's total in RM
- Entries remain after page refresh (same browser)
- Clear empty state when there are no expenses
- Works on a mobile screen

## Now / Later / Never

### Now

The core loop listed in Version-One Success.

### Later

- Category breakdown for the week
- "Spent today" total

### Never

Not today:

- No budgets or spending limits
- No login or accounts
- No cloud sync, backend, or database
- No charts or graphs
- No bank or e-wallet connections (e.g. Touch 'n Go, DuitNow)
- No receipt photo uploads
- No multiple currencies (RM only)

## Assumptions

- "This week" runs Monday to Sunday, using the device's local date.
- Amounts are shown with 2 decimal places (e.g. RM 8.50).
- Categories come from a short fixed list (decided in Architecture).
- Data lives only in this browser; clearing browser data erases it.

## Proof Target

- Live Vercel URL and public GitHub repo (Reezy067).
- Demo: add a real sample expense (e.g. RM 8.50, Food, "Nasi lemak + teh tarik"), refresh to show it remains, edit it, delete it, show the empty state, and show the mobile view.

## Trainer / Learner Notes

- Learner: Reezy067
- Week start (Monday) and category list can be adjusted in Architecture.
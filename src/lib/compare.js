// "vs this time last week" comparison for the bank card (design.md v1.2).
// Fair comparison: this week so far (Monday..today) against last week's
// Monday up to the same weekday (today - 7 days). Sums in sen.
import { addDays } from './dates.js'

function sumSen(expenses, start, end) {
  let sen = 0
  for (const e of expenses) {
    if (start <= e.date && e.date <= end) sen += Math.round(e.amount * 100)
  }
  return sen
}

/**
 * @param {{ amount: number, date: string }[]} expenses all expenses
 * @param {{ start: string }} weekRange this week's range
 * @param {string} today "YYYY-MM-DD"
 * @returns {{ thisWeek: number, lastWeek: number, diff: number } | null}
 *   null when there is nothing logged in last week's matching period.
 */
export function compareWithLastWeek(expenses, weekRange, today) {
  const thisSen = sumSen(expenses, weekRange.start, today)
  const lastSen = sumSen(expenses, addDays(weekRange.start, -7), addDays(today, -7))
  if (lastSen === 0) return null
  return { thisWeek: thisSen / 100, lastWeek: lastSen / 100, diff: (thisSen - lastSen) / 100 }
}
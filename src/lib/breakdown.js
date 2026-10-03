// Weekly category breakdown ("Where your money went").
// Sums in sen (whole cents) so amounts match the weekly total exactly.
import { CATEGORIES } from './categories.js'

const ORDER = CATEGORIES.map((c) => c.id)

/**
 * @param {{ amount: number, category: string }[]} weekExpenses
 * @returns {{ category: string, amount: number, share: number }[]}
 *   Largest first; ties follow the fixed category order. share is 0–1.
 */
export function categoryBreakdown(weekExpenses) {
  const senByCategory = new Map()
  for (const expense of weekExpenses) {
    const sen = Math.round(expense.amount * 100)
    senByCategory.set(expense.category, (senByCategory.get(expense.category) ?? 0) + sen)
  }

  let totalSen = 0
  for (const sen of senByCategory.values()) totalSen += sen
  if (totalSen === 0) return []

  return [...senByCategory.entries()]
    .map(([category, sen]) => ({ category, amount: sen / 100, share: sen / totalSen }))
    .sort((a, b) => b.amount - a.amount || ORDER.indexOf(a.category) - ORDER.indexOf(b.category))
}

/** Percentage label, e.g. 0.78 -> "78%", 0.004 -> "<1%". */
export function formatShare(share) {
  if (share > 0 && share < 0.01) return '<1%'
  return `${Math.round(share * 100)}%`
}
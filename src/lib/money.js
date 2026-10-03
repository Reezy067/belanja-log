// Money helpers. Amounts are always shown as "RM 1,234.50".

export const MAX_AMOUNT = 99999.99

/**
 * Format a number as Malaysian Ringgit, e.g. 8.5 -> "RM 8.50".
 * @param {number} amount
 * @returns {string}
 */
export function formatRM(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  return (
    'RM ' +
    value.toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

/**
 * Validate the text typed into the Amount field.
 * @param {string} text
 * @returns {{ value: number } | { error: string }}
 */
export function parseAmount(text) {
  const trimmed = String(text ?? '').trim()

  if (trimmed === '') return { error: 'Enter an amount, e.g. 8.50' }
  if (/^-/.test(trimmed)) return { error: 'Amount must be more than RM 0' }
  if (/^\d+\.\d{3,}$/.test(trimmed)) return { error: 'Use up to 2 decimal places' }
  if (/^\d{6,}(\.\d*)?$/.test(trimmed)) return { error: 'Amount must be RM 99,999.99 or less' }
  if (!/^\d{1,5}(\.\d{1,2})?$/.test(trimmed)) return { error: 'Enter an amount, e.g. 8.50' }

  const value = Number(trimmed)
  if (value <= 0) return { error: 'Amount must be more than RM 0' }

  return { value: Math.round(value * 100) / 100 }
}

/**
 * Add up amounts in sen (whole cents) so decimals never drift.
 * @param {{ amount: number }[]} expenses
 * @returns {number}
 */
export function sumAmounts(expenses) {
  const sen = expenses.reduce((total, expense) => total + Math.round(expense.amount * 100), 0)
  return sen / 100
}
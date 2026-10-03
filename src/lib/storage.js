// localStorage persistence for the one data type: expenses.
// Data lives only in this browser. Every access is wrapped in try/catch so
// private mode, full storage, or broken data never crash the app.
import { CATEGORIES } from './categories.js'
import { isValidDateString } from './dates.js'

export const STORAGE_KEY = 'belanja-log.expenses.v1'

const CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id))

/** Return a clean Expense, or null if the stored item is unusable. */
function normaliseExpense(item) {
  if (!item || typeof item !== 'object') return null
  const { id, amount, category, date, note } = item

  if (typeof id !== 'string' || id === '') return null
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return null
  if (!CATEGORY_IDS.has(category)) return null
  if (!isValidDateString(date)) return null

  return {
    id,
    amount: Math.round(amount * 100) / 100,
    category,
    date,
    note: typeof note === 'string' ? note.slice(0, 100) : '',
  }
}

/**
 * Load saved expenses. Missing key, invalid JSON, or a non-array value
 * all give an empty list. Items missing required fields are dropped.
 * @returns {object[]}
 */
export function loadExpenses() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normaliseExpense).filter(Boolean)
  } catch (error) {
    console.warn('Belanja Log: could not read saved expenses, starting empty.', error)
    return []
  }
}

/**
 * Save the whole expenses array.
 * @param {object[]} expenses
 */
export function saveExpenses(expenses) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.warn('Belanja Log: could not save expenses in this browser.', error)
  }
}
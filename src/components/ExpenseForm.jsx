import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../lib/categories.js'
import { parseAmount } from '../lib/money.js'
import { isValidDateString, todayString } from '../lib/dates.js'

const DEFAULT_CATEGORY = CATEGORIES[0].id

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

// One form for both modes (Work Cards 03–04).
// App remounts this form (via `key`) when switching between add and edit,
// so the initial state below always matches the current mode.
function ExpenseForm({ editingExpense, onAdd, onUpdate, onCancel }) {
  const isEditing = Boolean(editingExpense)

  const [amount, setAmount] = useState(() =>
    isEditing ? editingExpense.amount.toFixed(2) : '',
  )
  const [category, setCategory] = useState(() =>
    isEditing ? editingExpense.category : DEFAULT_CATEGORY,
  )
  const [date, setDate] = useState(() => (isEditing ? editingExpense.date : todayString()))
  const [note, setNote] = useState(() => (isEditing ? editingExpense.note : ''))
  const [errors, setErrors] = useState({})

  const sectionRef = useRef(null)
  const amountRef = useRef(null)
  const categoryRef = useRef(null)
  const dateRef = useRef(null)

  // Entering edit mode: bring the form into view and focus Amount.
  useEffect(() => {
    if (!isEditing) return
    sectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    amountRef.current?.focus({ preventScroll: true })
  }, [isEditing])

  function clearError(field) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const today = todayString()
    const nextErrors = {}

    const parsed = parseAmount(amount)
    if (parsed.error) nextErrors.amount = parsed.error

    if (!CATEGORIES.some((c) => c.id === category)) {
      nextErrors.category = 'Choose a category'
    }

    if (!isValidDateString(date)) {
      nextErrors.date = 'Choose a date'
    } else if (date > today) {
      nextErrors.date = "Date can't be in the future"
    }

    setErrors(nextErrors)

    // Move focus to the first invalid field so the message is announced.
    if (nextErrors.amount) return amountRef.current?.focus()
    if (nextErrors.category) return categoryRef.current?.focus()
    if (nextErrors.date) return dateRef.current?.focus()

    const data = { amount: parsed.value, category, date, note: note.trim() }

    if (isEditing) {
      onUpdate(editingExpense.id, data)
      return
    }

    onAdd(data)

    // Reset for the next entry; keep the chosen category.
    setAmount('')
    setNote('')
    setDate(today)
    amountRef.current?.focus()
  }

  return (
    <section
      ref={sectionRef}
      className={`card form-card${isEditing ? ' is-editing' : ''}`}
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="card-title">
        {isEditing ? 'Edit expense' : 'Add expense'}
      </h2>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="amount">Amount (RM)</label>
          <div className="amount-input">
            <span className="amount-prefix" aria-hidden="true">
              RM
            </span>
            <input
              ref={amountRef}
              id="amount"
              name="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              autoComplete="off"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                clearError('amount')
              }}
              aria-invalid={errors.amount ? 'true' : undefined}
              aria-describedby={errors.amount ? 'amount-error' : undefined}
            />
          </div>
          {errors.amount && (
            <p id="amount-error" className="field-error">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            ref={categoryRef}
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              clearError('category')
            }}
            aria-invalid={errors.category ? 'true' : undefined}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {`${c.label} \u2014 ${c.description}`}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="field-error">
              {errors.category}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            ref={dateRef}
            id="date"
            name="date"
            type="date"
            max={todayString()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              clearError('date')
            }}
            aria-invalid={errors.date ? 'true' : undefined}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className="field-error">
              {errors.date}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="note">
            Note <span className="optional">(optional)</span>
          </label>
          <input
            id="note"
            name="note"
            type="text"
            maxLength={100}
            placeholder="e.g. Nasi lemak + teh tarik"
            autoComplete="off"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save changes' : 'Add expense'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ExpenseForm
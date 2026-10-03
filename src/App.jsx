import { useEffect, useRef, useState } from 'react'
import WeeklyTotal from './components/WeeklyTotal.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { sumAmounts } from './lib/money.js'
import { formatRange, getWeekRange, isInWeek, todayString } from './lib/dates.js'
import { loadExpenses, saveExpenses } from './lib/storage.js'

// Unique ID for each expense. randomUUID needs a secure context
// (https or localhost), so fall back for plain-http LAN testing.
function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

// Belanja Log — add, list, edit, delete, weekly total, saved in localStorage.
function App() {
  // Load once on startup (lazy initialiser), then save after every change.
  const [expenses, setExpenses] = useState(() => loadExpenses())
  // editingId is UI state only; it is never saved.
  const [editingId, setEditingId] = useState(null)

  // After Save changes / Cancel, return focus to that expense's Edit button
  // so keyboard and screen-reader users don't lose their place.
  const returnFocusId = useRef(null)

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  useEffect(() => {
    if (editingId !== null || returnFocusId.current === null) return
    const button = document.querySelector(`[data-edit-id="${returnFocusId.current}"]`)
    returnFocusId.current = null
    if (!button) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    button.closest('.expense-card')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    })
    button.focus({ preventScroll: true })
  }, [editingId])

  const today = todayString()
  const weekRange = getWeekRange(today)
  const weekTotal = sumAmounts(expenses.filter((e) => isInWeek(e.date, weekRange)))
  const editingExpense = expenses.find((e) => e.id === editingId) ?? null

  function addExpense(data) {
    setExpenses((prev) => [{ id: createId(), ...data }, ...prev])
  }

  function startEdit(id) {
    setEditingId(id)
  }

  // Replace the fields but keep the id and the position in the array.
  function updateExpense(id, data) {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...data, id } : e)))
    returnFocusId.current = id
    setEditingId(null)
  }

  function cancelEdit() {
    returnFocusId.current = editingId
    setEditingId(null)
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Belanja Log</h1>
        <p className="tagline">Track your RM, stay aware</p>
      </header>

      <main className="app-main">
        <WeeklyTotal total={weekTotal} rangeLabel={formatRange(weekRange)} />

        <ExpenseForm
          key={editingExpense ? `edit-${editingExpense.id}` : 'add'}
          editingExpense={editingExpense}
          onAdd={addExpense}
          onUpdate={updateExpense}
          onCancel={cancelEdit}
        />

        <section className="list-section" aria-labelledby="list-title">
          <h2 id="list-title" className="section-title">
            Your expenses
          </h2>
          <ExpenseList
            expenses={expenses}
            today={today}
            editingId={editingId}
            onEdit={startEdit}
            onDelete={deleteExpense}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Saved in this browser only. Clearing browser data will erase it.</p>
      </footer>
    </div>
  )
}

export default App
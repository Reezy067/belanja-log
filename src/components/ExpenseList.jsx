import DayGroup from './DayGroup.jsx'
import EmptyState from './EmptyState.jsx'
import { dayLabel } from '../lib/dates.js'

// Newest date first, grouped by day. Within a day, newest added stays first
// (new expenses are prepended and Array.prototype.sort is stable).
function ExpenseList({ expenses, today, editingId, onEdit, onDelete }) {
  if (expenses.length === 0) return <EmptyState />

  const sorted = [...expenses].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const groups = []
  for (const expense of sorted) {
    const last = groups[groups.length - 1]
    if (last && last.date === expense.date) last.items.push(expense)
    else groups.push({ date: expense.date, items: [expense] })
  }

  return (
    <div className="expense-list">
      {groups.map((group) => (
        <DayGroup
          key={group.date}
          date={group.date}
          label={dayLabel(group.date, today)}
          items={group.items}
          editingId={editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ExpenseList
import ExpenseItem from './ExpenseItem.jsx'

// A day heading ("Today", "Yesterday", "Mon, 28 Sep") and that day's expenses.
function DayGroup({ date, label, items, editingId, onEdit, onDelete }) {
  const headingId = `day-${date}`
  return (
    <section className="day-group" aria-labelledby={headingId}>
      <h3 id={headingId} className="day-heading">
        {label}
      </h3>
      <ul className="day-items">
        {items.map((expense) => (
          <li key={expense.id}>
            <ExpenseItem
              expense={expense}
              isEditing={expense.id === editingId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DayGroup
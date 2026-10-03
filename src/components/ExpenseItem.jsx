import { formatRM } from '../lib/money.js'

// One expense card with quiet Edit / Delete text buttons.
function ExpenseItem({ expense, isEditing, onEdit, onDelete }) {
  const summary = `${formatRM(expense.amount)} ${expense.category}`

  function handleDelete() {
    if (window.confirm('Delete this expense?')) onDelete(expense.id)
  }

  return (
    <article className={`card expense-card${isEditing ? ' is-editing' : ''}`}>
      <div className="expense-main">
        <div className="expense-top">
          <span className="expense-amount">{formatRM(expense.amount)}</span>
          <span className="category-pill">{expense.category}</span>
        </div>
        {expense.note && <p className="expense-note">{expense.note}</p>}
      </div>

      <div className="expense-actions">
        <button
          type="button"
          className="btn-text btn-text-edit"
          data-edit-id={expense.id}
          onClick={() => onEdit(expense.id)}
          aria-label={`Edit ${summary}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-text btn-text-delete"
          onClick={handleDelete}
          aria-label={`Delete ${summary}`}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default ExpenseItem
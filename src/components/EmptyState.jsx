// Shown in the list area when there are no expenses.
function EmptyState() {
  return (
    <div className="card empty-state">
      <svg
        className="empty-icon"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {/* Simple wallet outline */}
        <path d="M17 6V4.8a1.5 1.5 0 0 0-1.9-1.45L5 6" />
        <rect x="3" y="6" width="18" height="14" rx="2.5" />
        <path d="M21 10.5h-3.5a2 2 0 0 0 0 4H21" />
        <circle cx="17.5" cy="12.5" r="0.6" fill="currentColor" />
      </svg>
      <p className="empty-title">No expenses yet</p>
      <p className="empty-text">
        Add your first one above, e.g. RM 8.50 for nasi lemak.
      </p>
    </div>
  )
}

export default EmptyState
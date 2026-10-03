import { formatRM } from '../lib/money.js'

// Hero card: this week's total (Monday to Sunday).
// aria-live lets screen readers hear the total when it changes.
function WeeklyTotal({ total, rangeLabel }) {
  return (
    <section
      className="card total-card"
      aria-labelledby="total-label"
      aria-live="polite"
    >
      <p id="total-label" className="total-label">
        This week
      </p>
      <p className="total-amount">{formatRM(total)}</p>
      {rangeLabel && <p className="total-range">{rangeLabel}</p>}
    </section>
  )
}

export default WeeklyTotal
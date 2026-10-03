import { formatRM } from '../lib/money.js'

// Hero: this week's total styled like a bank-card balance (design.md v1.1).
// aria-live lets screen readers hear the total when it changes.
function WeeklyTotal({ total, rangeLabel, count }) {
  const countLabel =
    count === 0 ? 'No expenses yet' : `${count} ${count === 1 ? 'expense' : 'expenses'}`

  return (
    <section
      className="card total-card"
      aria-labelledby="total-label"
      aria-live="polite"
    >
      <div className="total-top">
        <p id="total-label" className="total-label">
          This week
        </p>
        <span className="card-chip" aria-hidden="true" />
      </div>

      <p className="total-amount">{formatRM(total)}</p>

      <div className="total-bottom">
        {rangeLabel && <p className="total-range">{rangeLabel}</p>}
        <p className="total-count">{countLabel}</p>
      </div>
    </section>
  )
}

export default WeeklyTotal
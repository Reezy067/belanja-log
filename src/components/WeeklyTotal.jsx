import { formatRM } from '../lib/money.js'

function comparisonText(comparison) {
  if (comparison.diff === 0) return { arrow: '=', text: 'Same as this time last week' }
  const amount = formatRM(Math.abs(comparison.diff))
  return comparison.diff < 0
    ? { arrow: '\u2193', text: `${amount} less than this time last week` }
    : { arrow: '\u2191', text: `${amount} more than this time last week` }
}

// Hero: this week's total styled like a bank-card balance (design.md v1.1–v1.2).
// aria-live lets screen readers hear the total when it changes.
function WeeklyTotal({ total, rangeLabel, count, comparison }) {
  const countLabel =
    count === 0 ? 'No expenses yet' : `${count} ${count === 1 ? 'expense' : 'expenses'}`
  const compare = comparison ? comparisonText(comparison) : null

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

      {compare && (
        <p className="total-compare">
          <span className="total-compare-arrow" aria-hidden="true">
            {compare.arrow}
          </span>
          {compare.text}
        </p>
      )}

      <div className="total-bottom">
        {rangeLabel && <p className="total-range">{rangeLabel}</p>}
        <p className="total-count">{countLabel}</p>
      </div>
    </section>
  )
}

export default WeeklyTotal
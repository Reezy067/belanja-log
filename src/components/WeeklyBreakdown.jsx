import { formatRM } from '../lib/money.js'
import { formatShare } from '../lib/breakdown.js'

// "Where your money went": this week's spending per category (design.md v1.1).
// Bars are decorative; the row text carries all the information.
function WeeklyBreakdown({ items }) {
  return (
    <section className="card breakdown-card" aria-labelledby="breakdown-title">
      <h2 id="breakdown-title" className="card-title">
        Where your money went
      </h2>
      <p className="breakdown-sub">This week, by category</p>

      {items.length === 0 ? (
        <p className="breakdown-empty">Nothing spent this week yet.</p>
      ) : (
        <ul className="breakdown-list">
          {items.map((item) => (
            <li key={item.category} className="breakdown-row">
              <div className="breakdown-line">
                <span className="breakdown-name">{item.category}</span>
                <span className="breakdown-value">
                  <span className="breakdown-amount">{formatRM(item.amount)}</span>
                  <span className="breakdown-share">{formatShare(item.share)}</span>
                </span>
              </div>
              <div className="breakdown-track" aria-hidden="true">
                <div
                  className="breakdown-fill"
                  style={{ width: `${Math.max(item.share * 100, 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WeeklyBreakdown
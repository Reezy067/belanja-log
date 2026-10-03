import { categoryColor } from '../lib/categories.js'
import { formatRM } from '../lib/money.js'

const SIZE = 140
const STROKE = 16
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP = 3 // px gap between segments when there is more than one

// MAE-style ring: one coloured segment per category (design.md v1.2).
// Plain SVG, no chart library. Decorative: the list next to it carries the data.
function CategoryRing({ items, total }) {
  const gap = items.length > 1 ? GAP : 0
  let offset = 0

  return (
    <div className="ring">
      <svg
        className="ring-svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className="ring-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {items.map((item) => {
            const length = Math.max(item.share * CIRCUMFERENCE - gap, 1.5)
            const segment = (
              <circle
                key={item.category}
                className="ring-segment"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={categoryColor(item.category)}
                strokeWidth={STROKE}
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={-offset}
              />
            )
            offset += item.share * CIRCUMFERENCE
            return segment
          })}
        </g>
      </svg>
      <div className="ring-center">
        <span className="ring-amount">{formatRM(total)}</span>
        <span className="ring-caption">this week</span>
      </div>
    </div>
  )
}

export default CategoryRing
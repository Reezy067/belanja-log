// Date helpers. Everything uses the device's LOCAL date.
// Never use toISOString() (it converts to UTC and gives yesterday's date
// before 8am in Malaysia) or new Date("YYYY-MM-DD") (parsed as UTC).

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function pad(n) {
  return String(n).padStart(2, '0')
}

/** Date object -> "YYYY-MM-DD" using local time. */
export function toDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Today's local date as "YYYY-MM-DD". */
export function todayString() {
  return toDateString(new Date())
}

/** "YYYY-MM-DD" -> local Date at midnight. */
export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** True if str is a real calendar date in "YYYY-MM-DD" form. */
export function isValidDateString(str) {
  if (typeof str !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return false
  return toDateString(parseDate(str)) === str
}

/** Add (or subtract) whole days to a "YYYY-MM-DD" string. */
export function addDays(str, days) {
  const date = parseDate(str)
  date.setDate(date.getDate() + days)
  return toDateString(date)
}

/**
 * Monday-to-Sunday week containing todayStr.
 * On a Sunday, Monday is 6 days earlier.
 * @returns {{ start: string, end: string }}
 */
export function getWeekRange(todayStr) {
  const dayOfWeek = parseDate(todayStr).getDay() // 0 = Sun ... 6 = Sat
  const daysSinceMonday = (dayOfWeek + 6) % 7
  const start = addDays(todayStr, -daysSinceMonday)
  return { start, end: addDays(start, 6) }
}

/** "YYYY-MM-DD" strings sort correctly, so compare them as strings. */
export function isInWeek(dateStr, range) {
  return range.start <= dateStr && dateStr <= range.end
}

/** "Today", "Yesterday", or e.g. "Mon, 28 Sep" (year added if not this year). */
export function dayLabel(dateStr, todayStr) {
  if (dateStr === todayStr) return 'Today'
  if (dateStr === addDays(todayStr, -1)) return 'Yesterday'
  const date = parseDate(dateStr)
  const label = `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`
  return date.getFullYear() === parseDate(todayStr).getFullYear()
    ? label
    : `${label} ${date.getFullYear()}`
}

/** Week range label, e.g. "28 Sep – 4 Oct". */
export function formatRange(range) {
  const start = parseDate(range.start)
  const end = parseDate(range.end)
  return `${start.getDate()} ${MONTHS[start.getMonth()]} \u2013 ${end.getDate()} ${MONTHS[end.getMonth()]}`
}
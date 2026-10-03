// Fixed category list (order matters: Lain-lain stays last).
// See architecture.md > Data / State Model.
// `color` is used only for graphics (ring segments, bars, dots), never for text.
export const CATEGORIES = [
  { id: 'Makan', label: 'Makan', description: 'food & drinks', color: '#003893' },
  { id: 'Transport', label: 'Transport', description: 'Grab, LRT/MRT, petrol, toll', color: '#3d7fe0' },
  { id: 'Bills', label: 'Bills', description: 'phone, internet, utilities', color: '#6a5acd' },
  { id: 'Shopping', label: 'Shopping', description: 'Shopee, Lazada, groceries', color: '#e0a800' },
  { id: 'Pengajian', label: 'Pengajian', description: 'books, courses, study materials', color: '#13917f' },
  { id: 'Fun', label: 'Fun', description: 'movies, outings, subscriptions', color: '#d9577a' },
  { id: 'Lain-lain', label: 'Lain-lain', description: 'other', color: '#8a8f98' },
]

const COLOR_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c.color]))

/** Graphic colour for a category id (grey fallback). */
export function categoryColor(id) {
  return COLOR_BY_ID.get(id) ?? '#8a8f98'
}
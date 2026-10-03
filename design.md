# Design Direction

## Design Inspiration URL

No designmd.ai URL. Fallback style: **Apple-like premium minimal**, with subtle Malaysian identity touches. No external brand cloned.

## What We Borrow

- Layout: single centred column, generous white space, weekly total as the hero
- Spacing: roomy padding (24px inside cards, 16px gaps), nothing cramped
- Color mood: soft light neutrals + one accent (royal blue)
- Typography feel: system sans-serif, bold headings, lighter body, big confident digits
- Card/button style: frosted-glass cards, 14px radius, soft shadows; solid rounded primary button
- Mobile feel: calm, native-app-like, full-width cards, large tap targets

## What We Do Not Copy

- Brand/logo: no Apple logos, product names, icons, or wording
- Content/copy: all text is our own
- Testimonials/stats: none
- Photos/private identity: none; no flag imagery or government-style emblems
- Exact layout if it would look like a clone: no clone of any Apple page or app

## Visual Mood

Clean, calm, premium, trustworthy, quietly Malaysian.

## Layout Rules

Top to bottom, max width 560px, centred:

1. Header: "Belanja Log" + tagline "Track your RM, stay aware"
2. Weekly total card (hero): label "This week" + "RM 123.45" in large type + small date range (e.g. "28 Sep – 4 Oct")
3. Expense form card: Amount (RM), Category (dropdown), Date (defaults to today), Note (optional), primary "Add expense" button
4. Expense list: day headings ("Today", "Yesterday", "Mon, 28 Sep"), then one card per expense
5. Footer note: "Saved in this browser only. Clearing browser data will erase it."

## Color / Contrast Rules

- Background: soft gradient `#fbfbfd` to `#f2f1ee` (off-white to light warm grey)
- Cards: `rgba(255,255,255,0.72)` + `backdrop-filter: blur(16px)`; solid `#ffffff` fallback when blur is unsupported
- Headings: `#000000`; body text: `#1d1d1f`; muted text: `#57575c` (passes AA on cards and background)
- Accent (primary): royal blue `#003893` for primary button, focus rings, links, edit-state highlight
- Secondary: gold `#FFCC00` for decoration only (thin borders, small dot or underline); never as text, and never as a text background unless the text is dark
- Destructive: muted red `#b42318` for Delete text
- Errors: `#b42318` with a text message, never color alone

## Typography Feel

Calm and premium, like a banking app.

- Font stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- Weekly total: 44px (mobile 36px), weight 700, `font-variant-numeric: tabular-nums`
- Item amount: 20px, weight 600, tabular numerals
- Headings: weight 700; body: 16px weight 400; secondary: 14px muted
- Amounts always shown as "RM 1,234.50" (space after RM)

## Component Style

Buttons:

- Primary: solid `#003893`, white text, 12px radius, min height 44px, slight darken on hover
- Secondary (Cancel): 1px `#003893` outline, blue text, transparent fill
- Quiet actions (Edit / Delete on items): text buttons, 14px, blue for Edit, muted red for Delete, underline on hover; min tap area 44px

Cards:

- Frosted glass, 14px radius, shadow `0 4px 20px rgba(0,0,0,0.06)`
- Hover: lift 1px + slightly stronger shadow (disabled under reduced motion)
- Expense card: amount (large, left) + category pill; note and date below in muted text; Edit / Delete on the right (below on mobile)

Inputs:

- White fill, 1px `#d2d2d7` border, 10px radius, min height 44px
- Focus: 2px `#003893` ring with a soft blue glow
- Visible label above every field; error message below the field in red

Status chips / labels:

- Category pill: small rounded pill, light grey fill `#f2f2f5`, dark text, thin gold `#FFCC00` border

## Edit State

- Form card title switches to "Edit expense" and gets a 2px blue border
- Button text becomes "Save changes"; "Cancel" appears beside it
- The expense being edited gets a thin blue outline in the list
- The page scrolls the form into view when Edit is tapped

## Delete Affordance

- Quiet red "Delete" text button on each expense card
- Browser confirm "Delete this expense?" before removal

## Empty State

- Centred in the list area: a simple inline SVG wallet/receipt outline in muted blue
- Text: "No expenses yet" + "Add your first one above, e.g. RM 8.50 for nasi lemak."
- Weekly total still shows "RM 0.00"

## Refresh Proof Visibility

- Footer note always visible: "Saved in this browser only."
- After refresh, the same entries and weekly total reappear unchanged

## Mobile Rules

- Single column; cards full-width with 16px side margins
- Weekly total stays first and readable (36px)
- Form fields stack vertically; buttons full-width on screens under 480px
- Edit / Delete move below the card content on small screens
- Tap targets at least 44px; no horizontal scroll at 360px

## Accessibility Basics

- AA contrast for all text (gold never used for text)
- Visible blue focus ring on every interactive element (`:focus-visible`)
- Every input has a `<label>`; errors are linked with `aria-describedby`
- Edit/Delete buttons include the item in their accessible name (e.g. "Delete RM 8.50 Makan")
- Weekly total region uses `aria-live="polite"` so updates are announced
- `prefers-reduced-motion`: no lift or transition animations
- No tiny tap targets

## Anti-Slop Rules

- No fake logos
- No fake testimonials
- No fake stats unless clearly marked sample; no sample data pre-loaded in the final proof
- No lorem ipsum in final proof
- No random gradient blobs or decorative clutter
- No literal flag imagery; Malaysian touches stay subtle (blue/gold accents, RM, local copy)
- No animation libraries; CSS transitions only
- One clear primary action: "Add expense"
- Readable on phone width (360px)

## Version 1.1 Upgrades (approved 2026-10-03)

These override the Header, Weekly total, and Background rules above.

### Background with depth

Plain off-white made the frosted glass look flat, so the background now gives the glass something to blur:

- Base: gradient `#f4f6fb` (cool) to `#f3f1ec` (warm)
- A single soft royal-blue light from above the header (`rgba(0,56,147,0.12)`), not random blobs
- Faint four-petal "bunga" motif inspired by Malaysian batik and songket (`public/batik.svg`): blue strokes at about 11% opacity with a tiny gold centre, 96px tile, fading towards the bottom
- Cards: `rgba(255,255,255,0.68)` + `blur(16px) saturate(140%)`, so the motif turns into a soft texture behind them
- Text contrast is unchanged (AA); the motif never sits behind text at a visible strength

### Header logo mark

- A 44px rounded square (12px radius) in `#003893` with white bold "BL", and a short gold `#FFCC00` bar along the bottom (decoration only)
- Sits left of "Belanja Log" and the tagline
- The same mark is the browser-tab icon (`public/favicon.svg`); `theme-color` is `#003893`

### Bank-card weekly total (hero)

Inspired by the feel of seeing your balance in a banking app. No bank names, logos, or card numbers.

- Background: gradient `#003893` to `#002a70` (135deg); white text; no frosted glass on this card
- Shadow: `0 12px 32px rgba(0, 56, 147, 0.28)`; 16px radius
- Top row: "This week" (white, 80% opacity, 14px, weight 600) on the left; a small gold "card chip" (decorative, `aria-hidden`) on the right
- Middle: amount, white, 44px (36px mobile), weight 700, tabular numerals, left-aligned
- Bottom row: week range on the left and expense count on the right ("3 expenses"), white at 80% opacity, 14px
- White and 80%-white text on `#003893` passes AA

### "Where your money went" breakdown

- Frosted card placed after the form, before "Your expenses"; shown once any expense exists
- Title "Where your money went", subtitle "This week, by category" (muted)
- One row per category with spending this week, largest first: category name (left), amount in RM + percentage (right), then a thin bar below
- Bar: 8px tall, 999px radius, track `#e8e8ed`, fill `#003893`; width = share of the weekly total (minimum 2% so tiny amounts stay visible)
- Percent shows "<1%" when under 1%
- If there are expenses but none this week: "Nothing spent this week yet."
- Bars are `aria-hidden`; the row text carries all the information
- Simple CSS bars only. No chart library, no pie or donut chart

### Upgrade checklist

- [ ] Hero reads like a bank-card balance and stays readable at 360px
- [ ] Logo mark and favicon match; gold is decoration only
- [ ] Breakdown totals match the weekly total; percentages look sensible
- [ ] Breakdown updates after add, edit, delete, and survives refresh

## Version 1.2 Upgrades (approved 2026-10-03)

### "vs this time last week" (bank card)

- Small pill under the amount: "↓ RM 3.00 less than this time last week", "↑ RM 3.00 more…", or "Same as this time last week"
- Fair comparison: this week Monday to today, against last week Monday to the same weekday
- Hidden when nothing was logged in last week's matching period
- White text on a `rgba(255,255,255,0.14)` pill; arrows are `aria-hidden`; neutral tone (awareness, not judgement)

### Category ring (MAE-style)

- Inside "Where your money went": a 140px SVG ring on the left, rows on the right (stacked and centred under 480px)
- One segment per category, largest first from the top, 3px gaps; track `#e8e8ed`; centre shows the weekly total and "this week"
- Category colours (graphics only, never text): Makan `#003893`, Transport `#3d7fe0`, Bills `#6a5acd`, Shopping `#e0a800`, Pengajian `#13917f`, Fun `#d9577a`, Lain-lain `#8a8f98`
- Each row gets a matching colour dot, and its bar uses the same colour
- Plain SVG, no chart library; ring is `aria-hidden` because the rows carry the data
## Later

- "vs. last week" comparison
- Monthly view; any chart library

## Design Verification Checklist

- [ ] The first screen shows header, weekly total hero, and form, and feels calm and premium.
- [ ] The layout supports quick logging and reviewing.
- [ ] Mobile width (360px) is readable with no horizontal scroll.
- [ ] Nothing clones Apple or any other brand; no flag imagery.
- [ ] The build avoids fake claims, pre-loaded sample data, and generic AI decoration.
- [ ] Gold is never used as text; all text passes AA contrast.
- [ ] Edit state, delete confirm, and empty state are visible and clear.
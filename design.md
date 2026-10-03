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

## Later (not version one)

- Faint batik-inspired background texture
- "vs. last week" comparison
- Charts, category breakdown, monthly view

## Design Verification Checklist

- [ ] The first screen shows header, weekly total hero, and form, and feels calm and premium.
- [ ] The layout supports quick logging and reviewing.
- [ ] Mobile width (360px) is readable with no horizontal scroll.
- [ ] Nothing clones Apple or any other brand; no flag imagery.
- [ ] The build avoids fake claims, pre-loaded sample data, and generic AI decoration.
- [ ] Gold is never used as text; all text passes AA contrast.
- [ ] Edit state, delete confirm, and empty state are visible and clear.
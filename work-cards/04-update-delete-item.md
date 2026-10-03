# Work Card 04 — Update and Delete Item

## Goal

Let the user edit an expense through the same form (with Cancel) and delete an expense after a confirm prompt.

## Inputs

- `build-blueprint.md` — Design Direction Summary (States: Edit state, Delete)
- `architecture.md` — User Flow (Edit, Delete)
- `design.md` — Edit State, Delete Affordance, Component Style (quiet actions), Accessibility Basics

## Files likely touched

- `src/App.jsx`
- `src/App.css`
- `src/components/ExpenseForm.jsx`
- `src/components/ExpenseItem.jsx`
- `src/components/DayGroup.jsx`
- `src/components/ExpenseList.jsx`
- `build-status.md`

## Instructions for the coding agent

1. `App.jsx`: add `const [editingId, setEditingId] = useState(null)`.
   - `startEdit(id)`: set `editingId` and scroll the form card into view (`scrollIntoView` with `behavior: "smooth"`, or `"auto"` under `prefers-reduced-motion`). Move focus to the Amount field.
   - `updateExpense(id, data)`: replace that expense's fields (keep its `id` and position), then clear `editingId`.
   - `cancelEdit()`: clear `editingId`.
   - `deleteExpense(id)`: remove it; if it was being edited, clear `editingId`.
2. `ExpenseForm.jsx`:
   - receive `editingExpense` (or `null`). When it changes, load its values into the fields; when it becomes `null`, reset to add mode (amount blank, date today, note blank).
   - edit mode: heading "Edit expense", 2px `#003893` border on the form card, primary button "Save changes", secondary outline button "Cancel".
   - the same validation rules apply in edit mode.
3. `ExpenseItem.jsx`: add quiet text buttons:
   - "Edit": blue text; `aria-label` like "Edit RM 8.50 Makan"
   - "Delete": muted red `#b42318` text; `aria-label` like "Delete RM 8.50 Makan"; on click call `window.confirm("Delete this expense?")` and delete only if OK
   - minimum tap area 44px; underline on hover
   - the item being edited gets a thin blue outline
4. CSS: Edit / Delete sit on the right of the card on wider screens and move below the content under 480px. Cancel button full-width under 480px like the primary button.

## What not to do

- Do not use a custom modal or undo toast; use `window.confirm`.
- Do not add inline editing in the list.
- Do not add `localStorage` yet.
- Do not use icons for Edit / Delete.

## Done when

- Edit loads the expense into the form, Save changes updates it in place, and the weekly total updates.
- Cancel returns the form to add mode without changing anything.
- Delete asks for confirmation; OK removes the item, Cancel keeps it.
- Deleting the last item shows the empty state and "RM 0.00".
- Deleting the item currently being edited returns the form to add mode.
- `npm run build` completes with no errors.
- `build-status.md` is updated.

## Verification steps

- Run `npm run build` and confirm it succeeds.
- Confirm Edit/Delete `aria-label`s include amount and category.
- Confirm changing an expense's date during edit moves it to the correct day group.
- Design check: edit-state form border and title, edited-item outline, quiet Edit/Delete buttons, delete confirm, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Add RM 8.50, Makan, "Nasi lemak + teh tarik". Tap Edit. The form says "Edit expense", shows the values, and the item has a blue outline.
- Change the amount to 9.00 and tap "Save changes". The item shows "RM 9.00" and the weekly total updates.
- Tap Edit again, then Cancel. The form goes back to "Add expense" and nothing changes.
- Tap Delete and choose Cancel in the confirm box. The item stays. Tap Delete again and choose OK. It disappears, and the empty state and "RM 0.00" return.
- At 360px phone width, confirm Edit and Delete sit below the item content and are easy to tap.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after verification and output the learner checkpoint. Do not start Work Card 05.

## Status

Done (2026-10-03). `npm run build` passes; learner localhost test passed.

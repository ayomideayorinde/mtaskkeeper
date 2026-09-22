# TaskKeeper

A responsive personal task manager built with React, Vite, and Firebase by Michael Ayorinde.


## Behavior

Sign in with email or Google, or create an account. Add and edit tasks, mark them complete, search by title or description, and filter by status. Deleting a task requires confirmation. Task data syncs through one owner-scoped Firestore listener, with counts and progress derived from the same data. Existing `todos` fields (`title`, `description`, `status`, `uId`, and `createdAt`) and legacy user profiles remain compatible.

The theme follows your system preference on first visit and remembers subsequent choices. Dialogs support keyboard focus and Escape, pending requests disable repeat actions, and animations respect reduced-motion preferences.


# MTaskKeeper

A responsive personal task manager built with React, Vite, and Firebase.

## Local development

1. Install Node.js 22.12+ and run `npm ci`.
2. Copy `.env.example` to `.env` and fill in your Firebase web app configuration.
3. Enable Email/Password and Google in Firebase Authentication, authorize your development and deployment domains, and create a Cloud Firestore database.
4. Run `npm run dev`.

Firebase client configuration is public application metadata. Never put service account keys or other server credentials in VITE-prefixed variables. Firestore rules must restrict each todo to its authenticated owner (`uId`) and each user profile to its matching user ID. Verify your deployed rules separately; this repository does not deploy them.

## Commands

- `npm run dev`: local development
- `npm run lint`: lint source files
- `npm test`: task filtering and progress regression tests
- `npm run build`: production build in `dist/`
- `npm run preview`: serve the production build locally

## Structure

```text
src/
  app/                 Application routing and authentication lifecycle
  components/ui/       Shared brand, theme switch, and accessible modal
  features/
    auth/              Account forms and authentication error messages
    tasks/             Dashboard, task form, subscription, and task utilities
  lib/                 Firebase client initialization
  styles/              Shared design tokens and responsive styles
  main.jsx             React entry point
 tests/                Task utility regression tests
```

## Behavior

Sign in with email or Google, or create an account. Add and edit tasks, mark them complete, search by title or description, and filter by status. Deleting a task requires confirmation. Task data syncs through one owner-scoped Firestore listener, with counts and progress derived from the same data. Existing `todos` fields (`title`, `description`, `status`, `uId`, and `createdAt`) and legacy user profiles remain compatible.

The theme follows your system preference on first visit and remembers subsequent choices. Dialogs support keyboard focus and Escape, pending requests disable repeat actions, and animations respect reduced-motion preferences.

## Deployment

Run the lint, test, and build commands before deploying. Configure the six variables from `.env.example` in your hosting environment. Vite injects these values at build time. The existing `vercel.json` provides SPA routing for direct dashboard links.

Live authentication and Firestore integration require a configured Firebase project and should be verified with a dedicated test account before release.

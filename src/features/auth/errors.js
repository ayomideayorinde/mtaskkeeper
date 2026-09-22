export function authMessage(code) {
  return ({
    'auth/invalid-credential': 'The email or password is incorrect. Please try again.',
    'auth/email-already-in-use': 'An account already uses this email. Please sign in.',
    'auth/weak-password': 'Choose a password with at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Check your internet connection and try again.',
    'auth/popup-closed-by-user': 'Google sign-in was closed. You can try again.',
    'auth/popup-blocked': 'Allow pop-ups for this site to sign in with Google.',
  })[code] || 'We couldn’t complete that request. Please try again.';
}

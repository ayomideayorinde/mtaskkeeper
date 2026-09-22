import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AuthPage from '../features/auth/AuthPage';
import { ThemeButton } from '../components/ui/ThemeButton';

const Dashboard = lazy(() => import('../features/tasks/Dashboard'));

export default function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [authError, setAuthError] = useState('');
  useEffect(() => onAuthStateChanged(auth, (value) => {
    setUser(value);
    setReady(true);
  }, () => { setAuthError('Unable to connect. Please refresh and try again.'); setReady(true); }), []);

  if (!ready || authError) return <main className="loading-screen" role="status">{authError || 'Opening your workspace…'}</main>;
  return <BrowserRouter>
    <ThemeButton />
    <Suspense fallback={<main className="loading-screen" role="status">Loading your tasks…</main>}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/dashboard" element={user ? <Dashboard key={user.uid} user={user} /> : <Navigate to="/" replace />} />
        <Route path="*" element={<main className="loading-screen"><span className="eyebrow">404 · A little off track</span><h1>Let’s get you back.</h1><a className="button primary" href="/">Back to your workspace</a></main>} />
      </Routes>
    </Suspense>
  </BrowserRouter>;
}

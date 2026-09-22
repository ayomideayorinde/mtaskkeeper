import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { LuArrowRight, LuCheck, LuEye, LuEyeOff, LuShieldCheck, LuSparkles } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../lib/firebase';
import { Brand } from '../../components/ui/Brand';
import { authMessage } from './errors';

export default function AuthPage() {
  const [signup, setSignup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  async function perform(action) {
    setError(''); setNotice(''); setBusy(true);
    try { await action(); } catch (err) { setError(authMessage(err.code)); } finally { setBusy(false); }
  }
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (signup && !data.get('name').trim()) { setError('Please enter your name.'); return; }
    if (signup && data.get('password') !== data.get('confirm')) { setError('Your passwords don’t match.'); return; }
    perform(async () => {
      if (signup) {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), data.get('password'));
        await updateProfile(result.user, { displayName: data.get('name').trim() });
      } else await signInWithEmailAndPassword(auth, email.trim(), data.get('password'));
    });
  }
  return <main className="auth-layout">
    <section className="auth-story">
      <Brand />
      <div className="story-content">
        <span className="eyebrow"><span className="tiny-line" /> A little structure. A lot more clarity.</span>
        <h1>Make room for<br />what <span>matters.</span></h1>
        <p>Your ideas, plans, and everyday to-dos.<br className="desktop-break" /> All together in one calm place.</p>
        <div className="preview-card" aria-label="Example task list">
          <div className="preview-heading"><span><LuSparkles /> A fresh start</span><span className="mini-tag">TODAY</span></div>
          <div className="preview-task checked"><span className="fake-check"><LuCheck /></span><span>Make a little space to focus</span></div>
          <div className="preview-task"><span className="fake-check" /><span>Bring your next idea to life</span><span className="task-dot" /></div>
          <div className="preview-task"><span className="fake-check" /><span>Take it one step at a time</span></div>
          <div className="preview-footer"><span>Small steps. Real progress.</span><span>1 / 3 complete</span></div>
          <div className="preview-progress"><span /></div>
        </div>
        <div className="story-note"><span className="note-icon"><LuCheck /></span>Less mental clutter. More getting things done.</div>
      </div>
      <footer>YOUR DAY, WITH A LITTLE MORE INTENTION.</footer>
    </section>
    <section className="auth-panel">
      <div className="auth-form-wrap">
        <span className="eyebrow">YOUR PERSONAL WORKSPACE</span>
        <h2>{signup ? 'Start something good.' : 'Welcome back.'}</h2>
        <p className="muted">{signup ? 'A clearer day starts with your first task.' : 'A clear mind starts with a simple plan.'}</p>
        <div className="auth-tabs" aria-label="Account options">{[false, true].map(value => <button key={String(value)} disabled={busy} aria-pressed={signup === value} className={signup === value ? 'active' : ''} onClick={() => { setSignup(value); setError(''); setNotice(''); }}>{value ? 'Create account' : 'Sign in'}</button>)}</div>
        <form onSubmit={submit} className="auth-form">
          <fieldset disabled={busy}>
            {signup && <label>Full name<input name="name" autoComplete="name" placeholder="Alex Morgan" maxLength={80} required /></label>}
            <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></label>
            <label>Password<span className="password-input"><input type={visible ? 'text' : 'password'} name="password" autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 6 characters' : 'Enter your password'} minLength={signup ? 6 : undefined} required /><button type="button" className="icon-button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}>{visible ? <LuEyeOff /> : <LuEye />}</button></span></label>
            {signup && <label>Confirm password<input type={visible ? 'text' : 'password'} name="confirm" autoComplete="new-password" placeholder="Enter your password again" required /></label>}
            {!signup && <button className="text-button forgot" type="button" onClick={() => { if (!email.trim()) { setError('Enter your email above to reset your password.'); return; } perform(async () => { await sendPasswordResetEmail(auth, email.trim()); setNotice('If an account exists, a reset link has been sent. Check your inbox.'); }); }}>Forgot password?</button>}
            {error && <p className="message error" role="alert">{error}</p>}
            {notice && <p className="message success" role="status">{notice}</p>}
            <button className="button primary full" type="submit">{busy ? 'One moment…' : signup ? 'Create your account' : 'Sign in to your workspace'}<LuArrowRight /></button>
          </fieldset>
        </form>
        <div className="divider"><span>or keep it simple</span></div>
        <button className="button google full" disabled={busy} onClick={() => perform(() => signInWithPopup(auth, new GoogleAuthProvider()))}><FcGoogle size={20} />Continue with Google</button>
        <p className="privacy-note"><LuShieldCheck /> Your tasks. Your space. Only yours.</p>
      </div>
      <footer>A little more organized, every day.</footer>
    </section>
  </main>;
}

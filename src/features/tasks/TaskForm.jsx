import { useState } from 'react';
import { Modal } from '../../components/ui/Modal';

export function TaskForm({ task, onClose, onSave }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title').trim();
    if (!title) { setError('Give your task a title.'); return; }
    setBusy(true); setError('');
    try { await onSave({ title, description: data.get('description').trim() }, task?.id); onClose(); }
    catch { setError('Your task couldn’t be saved. Please try again.'); setBusy(false); }
  }
  return <Modal title={task ? 'Edit your task' : 'Make a little plan'} onClose={onClose} busy={busy}>
    <p className="muted">One small step toward a clearer day.</p>
    <form onSubmit={submit}><fieldset disabled={busy}>
      <label>Task title<input name="title" defaultValue={task?.title || ''} placeholder="What would you like to get done?" maxLength={200} required autoFocus /></label>
      <label>Description <span className="muted">(optional)</span><textarea name="description" defaultValue={task?.description || ''} placeholder="Add a few details…" maxLength={3000} rows={4} /></label>
      {error && <p className="message error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" type="submit">{busy ? 'Saving…' : task ? 'Save changes' : 'Add task'}</button></div>
    </fieldset></form>
  </Modal>;
}

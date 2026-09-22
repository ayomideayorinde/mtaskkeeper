import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LuArrowUpRight, LuCheck, LuCircleCheck, LuLayoutDashboard, LuListTodo, LuLogOut, LuPencil, LuPlus, LuSearch, LuSparkles, LuTrash2 } from 'react-icons/lu';
import { auth, db } from '../../lib/firebase';
import { Brand } from '../../components/ui/Brand';
import { Modal } from '../../components/ui/Modal';
import { TaskForm } from './TaskForm';
import { useTasks } from './useTasks';
import { filterTasks, taskStats } from './taskUtils';

export default function Dashboard({ user }) {
  const { tasks, loading, error, save, toggle, remove } = useTasks(user.uid);
  const [name, setName] = useState(user.displayName || user.email?.split('@')[0] || 'there');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(undefined);
  const [deleting, setDeleting] = useState(null);
  const [pending, setPending] = useState(null);
  const [actionError, setActionError] = useState('');
  const stats = taskStats(tasks);
  const visible = filterTasks(tasks, filter, search);
  useEffect(() => {
    let active = true;
    getDoc(doc(db, 'users', user.uid)).then(profile => {
      if (active) setName(profile.data()?.fName || user.displayName || user.email?.split('@')[0] || 'there');
    }).catch(() => {});
    return () => { active = false; };
  }, [user]);
  async function act(id, action) {
    setPending(id); setActionError('');
    try { await action(); } catch { setActionError('That change couldn’t be saved. Please try again.'); } finally { setPending(null); }
  }
  return <div className="workspace">
    <aside className="sidebar"><Brand /><span className="eyebrow sidebar-label">WORKSPACE</span><button className="nav-item active" onClick={() => { setFilter('all'); setSearch(''); }}><LuLayoutDashboard />My tasks<span>{tasks.length}</span></button><div className="sidebar-tip"><LuSparkles /><h3>A little every day.</h3><p>Big things happen one small task at a time. You’ve got this.</p></div><div className="account"><span className="avatar">{name.charAt(0).toUpperCase()}</span><div><strong>{name}</strong><small>Personal workspace</small></div><button className="icon-button" aria-label="Sign out" disabled={pending !== null} onClick={() => act('signout', () => signOut(auth))}><LuLogOut /></button></div></aside>
    <div className="workspace-body"><header className="workspace-header"><span>Workspace <span className="muted">/</span> <strong>My tasks</strong></span><span className="header-date">{new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}</span></header>
      <main className="dashboard-main"><div className="dashboard-intro"><div><span className="eyebrow">LET’S MAKE TODAY COUNT</span><h1>A little focus, {name.split(' ')[0]}<span className="brand-dot">.</span></h1><p className="muted">Your day, your pace. Make space for what matters.</p></div><button className="button primary" onClick={() => setEditing(null)}><LuPlus />New task</button></div>
        <div className="stats-grid"><div className="stat-card"><span className="stat-icon"><LuListTodo /></span><span>Total tasks<strong>{loading ? '—' : stats.total}</strong></span><LuArrowUpRight className="stat-arrow" /></div><div className="stat-card"><span className="stat-icon peach"><LuSparkles /></span><span>In progress<strong>{loading ? '—' : stats.pending}</strong></span></div><div className="stat-card"><span className="stat-icon green"><LuCircleCheck /></span><span>Completed<strong>{loading ? '—' : stats.completed}</strong></span></div></div>
        <section className="task-panel" aria-label="Your tasks"><div className="task-panel-heading"><div><h2>My tasks <span className="count-pill">{tasks.length}</span></h2><p className="muted">A home for everything on your list.</p></div><label className="search-field"><LuSearch /><input type="search" aria-label="Search tasks" placeholder="Search tasks…" value={search} onChange={event => setSearch(event.target.value)} /></label></div>
          <div className="task-tabs">{[['all', 'All tasks', stats.total], ['pending', 'In progress', stats.pending], ['completed', 'Completed', stats.completed]].map(([value, label, count]) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}<span>{count}</span></button>)}</div>
          {(error || actionError) && <p className="message error panel-message" role="alert">{error || actionError}</p>}
          {loading ? <div className="empty-state" role="status">Gathering your tasks…</div> : !error && !visible.length ? <div className="empty-state"><span className="empty-icon"><LuListTodo /></span><h3>{tasks.length ? 'A little breathing room.' : 'Great things start with a small task.'}</h3><p>{tasks.length ? 'No tasks match this view. Try another filter or search.' : 'Get it out of your head and onto your list.'}</p>{!tasks.length && <button className="button primary" onClick={() => setEditing(null)}><LuPlus />Add your first task</button>}</div> : <ul className="task-list">{visible.map(task => <li key={task.id} className={`task-row ${task.status ? 'is-complete' : ''}`}><button className="task-check" aria-label={`Mark ${task.title} as ${task.status ? 'in progress' : 'completed'}`} aria-pressed={!!task.status} disabled={pending !== null} onClick={() => act(task.id, () => toggle(task))}>{task.status && <LuCheck />}</button><div className="task-copy"><h3>{task.title}</h3>{task.description && <p>{task.description}</p>}</div><span className={`status-tag ${task.status ? 'done' : ''}`}><span />{task.status ? 'Completed' : 'In progress'}</span><div className="task-actions"><button className="icon-button" aria-label={`Edit ${task.title}`} disabled={pending !== null} onClick={() => setEditing(task)}><LuPencil /></button><button className="icon-button delete-button" aria-label={`Delete ${task.title}`} disabled={pending !== null} onClick={() => { setActionError(''); setDeleting(task); }}><LuTrash2 /></button></div></li>)}</ul>}
          <div className="list-footer"><span>{visible.length} {visible.length === 1 ? 'task' : 'tasks'} in this view</span><span><LuCheck /> Small steps count.</span></div>
        </section>
        <section className="progress-card"><span className="progress-spark"><LuSparkles /></span><div><h3>{stats.total && stats.progress === 100 ? 'Look at you. All done!' : 'Progress, one task at a time.'}</h3><p>{stats.completed} of {stats.total} tasks complete. Keep going at your own pace.</p></div><div className="progress-meter"><span>{stats.progress}% complete</span><progress aria-label="Tasks completed" value={stats.progress} max="100" /></div></section>
        <footer className="dashboard-footer">A little more organized, every day.<span>MTaskKeeper</span></footer>
      </main>
    </div>
    {editing !== undefined && <TaskForm task={editing} onClose={() => setEditing(undefined)} onSave={save} />}
    {deleting && <Modal title="Delete this task?" busy={pending !== null} onClose={() => setDeleting(null)}><p className="muted">“{deleting.title}” will be permanently removed.</p>{actionError && <p className="message error" role="alert">{actionError}</p>}<div className="modal-actions"><button className="button secondary" disabled={pending !== null} onClick={() => setDeleting(null)}>Keep task</button><button className="button danger" disabled={pending !== null} onClick={() => act(deleting.id, async () => { await remove(deleting.id); setDeleting(null); })}>{pending ? 'Deleting…' : 'Delete task'}</button></div></Modal>}
  </div>;
}

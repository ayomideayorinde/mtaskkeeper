export function filterTasks(tasks, filter, search) {
  const term = search.trim().toLowerCase();
  return tasks.filter(task => (filter === 'all' || (filter === 'completed' ? task.status : !task.status)) && `${task.title} ${task.description || ''}`.toLowerCase().includes(term));
}

export function taskStats(tasks) {
  const completed = tasks.filter(task => task.status).length;
  return { total: tasks.length, completed, pending: tasks.length - completed, progress: tasks.length ? Math.round(completed / tasks.length * 100) : 0 };
}

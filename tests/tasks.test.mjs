import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterTasks, taskStats } from '../src/features/tasks/taskUtils.js';

const tasks = [
  { title: 'Plan the week', description: 'Review project milestones', status: false },
  { title: 'Send update', description: '', status: true },
  { title: 'Read notes', status: false },
];

test('search matches titles and descriptions regardless of case or surrounding spaces', () => {
  assert.deepEqual(filterTasks(tasks, 'all', '  MILESTONES  '), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, 'all', 'read'), [tasks[2]]);
});

test('status filtering composes with search without changing the original list', () => {
  assert.deepEqual(filterTasks(tasks, 'completed', ''), [tasks[1]]);
  assert.deepEqual(filterTasks(tasks, 'pending', 'update'), []);
  assert.equal(tasks.length, 3);
});

test('empty lists have finite zero progress', () => {
  assert.deepEqual(taskStats([]), { total: 0, completed: 0, pending: 0, progress: 0 });
});

test('progress reflects completion and reopening tasks', () => {
  assert.deepEqual(taskStats(tasks), { total: 3, completed: 1, pending: 2, progress: 33 });
  assert.equal(taskStats(tasks.map(task => ({ ...task, status: true }))).progress, 100);
  assert.equal(taskStats(tasks.map(task => ({ ...task, status: false }))).progress, 0);
});

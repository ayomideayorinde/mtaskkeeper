import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export function useTasks(uid) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => onSnapshot(query(collection(db, 'todos'), where('uId', '==', uid)), snapshot => {
    setTasks(snapshot.docs.map(item => ({ ...item.data(), id: item.id })).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    setLoading(false); setError('');
  }, () => { setError('Your tasks couldn’t load. Check your connection and refresh to try again.'); setLoading(false); }), [uid]);
  const save = (values, id) => id ? updateDoc(doc(db, 'todos', id), values) : addDoc(collection(db, 'todos'), { ...values, uId: uid, status: false, createdAt: serverTimestamp() });
  const toggle = task => updateDoc(doc(db, 'todos', task.id), { status: !task.status });
  const remove = id => deleteDoc(doc(db, 'todos', id));
  return { tasks, loading, error, save, toggle, remove };
}

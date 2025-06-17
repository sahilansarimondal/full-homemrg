import { useState, useEffect } from 'react';
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { fetch('/api/tasks', { credentials: 'include' }).then(r=>r.json()).then(setTasks); }, []);
  const getTask     = id => fetch(`/api/tasks/${id}`, {credentials:'include'}).then(r=>r.json());
  const createTask  = data => fetch('/api/tasks', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(data)}).then(() => fetch('/api/tasks',{credentials:'include'}).then(r=>r.json()).then(setTasks));
  const updateTask  = (id,data) => fetch(`/api/tasks/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(data)}).then(() => fetch('/api/tasks',{credentials:'include'}).then(r=>r.json()).then(setTasks));
  return { tasks, getTask, createTask, updateTask };
}
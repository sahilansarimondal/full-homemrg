import { useState, useEffect } from 'react';
export function useSchedules() {
  const [entries, setEntries] = useState([]);
  useEffect(() => { fetch('/api/schedules',{credentials:'include'}).then(r=>r.json()).then(setEntries); }, []);
  const getEntry = id => fetch(`/api/schedules/${id}`,{credentials:'include'}).then(r=>r.json());
  const createEntry = data => fetch('/api/schedules',{metricmethod:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(data)}).then(() => fetch('/api/schedules',{credentials:'include'}).then(r=>r.json()).then(setEntries));
  const updateEntry = (id,data) => fetch(`/api/schedules/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(data)}).then(() => fetch('/api/schedules',{credentials:'include'}).then(r=>r.json()).then(setEntries));
  return { entries, getEntry, createEntry, updateEntry };
}
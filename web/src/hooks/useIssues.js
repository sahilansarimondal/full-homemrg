import { useState, useEffect } from 'react';
export function useIssues() {
  const [issues, setIssues] = useState([]);
  useEffect(() => { fetch('/api/issues',{credentials:'include'}).then(r=>r.json()).then(setIssues); }, []);
  const createIssue = data => fetch('/api/issues',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(data)}).then(() => fetch('/api/issues',{credentials:'include'}).then(r=>r.json()).then(setIssues));
  return { issues, createIssue };
}
import { useState, useEffect } from 'react';
export function useUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetch('/api/users',{credentials:'include'}).then(r=>r.json()).then(setUsers); }, []);
  const getUser    = id => fetch(`/api/users/${id}`,{credentials:'include'}).then(r=>r.json());
  const createUser = data => fetch('/api/users',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(data)}).then(() => fetch('/api/users',{credentials:'include'}).then(r=>r.json()).then(setUsers));
  const updateUser = (id,data) => fetch(`/api/users/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(data)}).then(() => fetch('/api/users',{credentials:'include'}).then(r=>r.json()).then(setUsers));
  return { users, getUser, createUser, updateUser };
}
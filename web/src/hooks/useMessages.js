import { useState, useEffect } from 'react';

export function useMessages() {
  const [threads, setThreads] = useState([]);

  // fetch the list of threads
  useEffect(() => {
    fetch('/api/threads', { credentials: 'include' })
      .then(r => r.json())
      .then(setThreads)
      .catch(() => setThreads([]));
  }, []);

  // fetch one thread’s full data
  const getThread = id =>
    fetch(`/api/threads/${id}`, { credentials: 'include' })
      .then(r => r.json());

  // post a new message to a thread
  const sendMessage = (threadId, body) =>
    fetch(`/api/threads/${threadId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ body }),
    });

  return { threads, getThread, sendMessage };
}

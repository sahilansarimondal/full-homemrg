import React, { useState, useEffect } from 'react';
import { useClock } from '../../../hooks/useClock';

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export default function ClockPage() {
  const { clockIn, clockOut, getLogs } = useClock();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Determine current status from last log
  const lastLog = logs[0];
  const isClockedIn = lastLog?.type === 'IN';

  useEffect(() => {
    setLoading(true);
    getLogs().then(setLogs).catch(() => setError('Failed to load logs')).finally(() => setLoading(false));
  }, []);

  const handleClock = async (type) => {
    setLoading(true);
    setError('');
    try {
      if (type === 'in') await clockIn();
      else await clockOut();
      const updated = await getLogs();
      setLogs(updated);
    } catch {
      setError('Action failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 0 }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8, color: '#1746a0' }}>Time Clock</h1>
        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            display: 'inline-block',
            width: 12, height: 12, borderRadius: '50%',
            background: isClockedIn ? '#4ade80' : '#f87171',
            marginRight: 8,
            border: '1.5px solid #e5e7eb',
          }} />
          <span style={{ fontWeight: 600, color: isClockedIn ? '#15803d' : '#b91c1c' }}>
            {isClockedIn ? 'You are clocked in' : 'You are clocked out'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <button
            onClick={() => handleClock('in')}
            disabled={loading || isClockedIn}
            style={{
              background: isClockedIn ? '#e5e7eb' : '#4f8cff',
              color: isClockedIn ? '#64748b' : '#fff',
              border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: '1rem', cursor: isClockedIn ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Clock In
          </button>
          <button
            onClick={() => handleClock('out')}
            disabled={loading || !isClockedIn}
            style={{
              background: !isClockedIn ? '#e5e7eb' : '#f87171',
              color: !isClockedIn ? '#64748b' : '#fff',
              border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: '1rem', cursor: !isClockedIn ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Clock Out
          </button>
        </div>
        {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 700, color: '#1746a0', marginBottom: 8, fontSize: '1.05rem' }}>Recent Activity</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {logs.length === 0 && <li style={{ color: '#64748b' }}>No activity yet.</li>}
            {logs.map((l, i) => (
              <li key={l.id || i} style={{
                background: l.type === 'IN' ? '#e0f7fa' : '#fef2f2',
                color: l.type === 'IN' ? '#036666' : '#b91c1c',
                borderRadius: 6, padding: '8px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem',
              }}>
                <span style={{ fontWeight: 700 }}>{l.type === 'IN' ? '🟢 In' : '🔴 Out'}</span>
                <span style={{ flex: 1 }}>{formatTime(l.time)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
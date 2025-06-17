import React from 'react';
import { useNotifications } from '../../../hooks/useNotifications';

const typeStyles = {
  info: { color: '#2563eb', icon: 'ℹ️', bg: '#eaf1fb' },
  reminder: { color: '#eab308', icon: '⏰', bg: '#fffbe7' },
  alert: { color: '#dc2626', icon: '⚠️', bg: '#fff1f2' },
  default: { color: '#334155', icon: '🔔', bg: '#f1f5f9' }
};

export default function NotificationsPage() {
  const { notifications } = useNotifications();

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #e0e0e0',
        marginBottom: 24,
        paddingBottom: 8
      }}>
        <span style={{ fontSize: '2rem', marginRight: 12 }}>🔔</span>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Notifications</h1>
      </div>
      {notifications.length === 0 ? (
        <div style={{ color: '#888', textAlign: 'center' }}>No notifications to show</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map(n => {
            const style = typeStyles[n.type] || typeStyles.default;
            return (
              <li key={n.id} style={{
                background: style.bg,
                border: `1.5px solid ${style.color}`,
                borderRadius: 10,
                marginBottom: 18,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 2px 12px rgba(25, 118, 210, 0.04)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16
              }}>
                <span style={{ fontSize: '1.7rem', marginTop: 2 }}>{style.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: style.color, marginBottom: 2, letterSpacing: '0.2px' }}>{n.title}</div>
                  <div style={{ color: '#1e293b', fontSize: '1.05rem', marginBottom: 7, fontWeight: 500 }}>{n.message}</div>
                  <div style={{ fontSize: '0.92rem', color: '#64748b' }}>{new Date(n.timestamp).toLocaleString()}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useSchedules } from '../../hooks/useSchedules';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

export default function HomePage() {
  const [welcomeName, setWelcomeName] = useState('');
  const { tasks } = useTasks();
  const { entries } = useSchedules();

  useEffect(() => {
    // simulate fetching user
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => r.json())
      .then(u => setWelcomeName(u.name || 'Homeowner'));
  }, []);

  const upcoming = entries
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <>
      <div className="page-wrapper">
        <div className="section-card">
          <h1>Welcome, {welcomeName}</h1>
          <p>Here's what's happening with your home today.</p>
        </div>
        <div className="section-card">
          <h2>Upcoming Appointments</h2>
          {upcoming.length ? (
            <ul>
              {upcoming.map(a => (
                <li key={a.id}>
                  <strong>{a.serviceName}</strong> – {new Date(a.date).toLocaleDateString()} @ {a.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </div>
        <div className="section-card">
          <h2>My To‑Do List</h2>
          {tasks.length ? (
            <ul>
              {tasks.map(t => (
                <li key={t.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => {/* TODO: handle toggle */}}
                    />{' '}
                    {t.title}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned</p>
          )}
        </div>
        <div className="section-card">
          <h2>Who Should Hire a Home Manager?</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            <div style={{
              flex: '1 1 300px',
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              maxWidth: '350px',
              minWidth: '280px'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Busy Professionals</h3>
              <p style={{ color: '#475569', lineHeight: '1.5' }}>Perfect for those with demanding careers who need help managing household tasks and maintaining work-life balance.</p>
            </div>
            <div style={{
              flex: '1 1 300px',
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              maxWidth: '350px',
              minWidth: '280px'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Growing Families</h3>
              <p style={{ color: '#475569', lineHeight: '1.5' }}>Ideal for families juggling multiple schedules, activities, and household responsibilities.</p>
            </div>
            <div style={{
              flex: '1 1 300px',
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              maxWidth: '350px',
              minWidth: '280px'
            }}>
              <h3 style={{ color: '#1e3a8a', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Empty Nesters</h3>
              <p style={{ color: '#475569', lineHeight: '1.5' }}>Great for those looking to maintain their home while enjoying more free time and less maintenance stress.</p>
            </div>
          </div>
        </div>
        <div className="section-card cta-box">
          <h2>Need help managing your home?</h2>
          <p>Explore our services and let us take care of the details for you.</p>
          <a href="/our-services" className="cta-button">Explore Services</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
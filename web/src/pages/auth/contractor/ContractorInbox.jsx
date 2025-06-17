import React, { useState } from 'react';

// Mock contacts: multiple homeowners and their office manager
const CONTACTS = [
  { name: 'Pat Homeowner', email: 'pat@home.com' },
  { name: 'Alex Homeowner', email: 'alex@home.com' },
  { name: 'Morgan Homeowner', email: 'morgan@home.com' },
  { name: 'Office Manager', email: 'manager@office.com' },
];

// Mock threads/messages
const MOCK_THREADS = [
  {
    id: 1,
    subject: 'Welcome!',
    participants: ['Pat Homeowner', 'Contractor'],
    messages: [
      { sender: 'Pat Homeowner', body: 'Hi, looking forward to working with you!', time: '2025-05-10 09:00' },
      { sender: 'Contractor', body: 'Thank you! Let me know if you need anything.', time: '2025-05-10 09:05' },
    ],
  },
  {
    id: 2,
    subject: 'Cleaning Schedule',
    participants: ['Alex Homeowner', 'Contractor'],
    messages: [
      { sender: 'Alex Homeowner', body: 'Can we update the cleaning schedule?', time: '2025-05-09 14:00' },
      { sender: 'Contractor', body: 'Sure, what days work for you?', time: '2025-05-09 14:10' },
    ],
  },
  {
    id: 3,
    subject: 'Urgent: Water Leak',
    participants: ['Morgan Homeowner', 'Office Manager', 'Contractor'],
    messages: [
      { sender: 'Morgan Homeowner', body: 'There is a water leak in the kitchen!', time: '2025-05-08 11:00' },
      { sender: 'Office Manager', body: 'Contractor, can you check this ASAP?', time: '2025-05-08 11:05' },
      { sender: 'Contractor', body: 'On my way now.', time: '2025-05-08 11:10' },
    ],
  },
];

export default function ContractorInbox() {
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [selectedId, setSelectedId] = useState(threads[0]?.id || null);
  const [message, setMessage] = useState('');

  // Find the thread for a contact (by name)
  const findThreadByContact = (contactName) =>
    threads.find(t => t.participants.includes(contactName));

  // When clicking a contact, open or create the thread
  const handleContactMessage = (contactName) => {
    let thread = findThreadByContact(contactName);
    if (!thread) {
      thread = {
        id: Math.max(0, ...threads.map(t => t.id)) + 1,
        subject: `Message to ${contactName}`,
        participants: ['Contractor', contactName],
        messages: [],
      };
      setThreads(ts => [...ts, thread]);
    }
    setSelectedId(thread.id);
  };

  const handleSend = e => {
    e.preventDefault();
    if (!message.trim()) return;
    setThreads(ts => ts.map(t =>
      t.id === selectedId
        ? { ...t, messages: [...t.messages, { sender: 'Contractor', body: message, time: new Date().toLocaleString() }] }
        : t
    ));
    setMessage('');
  };

  const selectedThread = threads.find(t => t.id === selectedId);

  // For compact, no-scroll layout
  const MAX_HEIGHT = 540; // px, fits most desktops
  const CONTACTS_HEIGHT = 180;
  const THREADS_HEIGHT = 220;

  // Find which contact is selected
  const selectedContactName = selectedThread?.participants.find(p => p !== 'Contractor');

  return (
    <div className="inbox-page" style={{ display: 'flex', height: MAX_HEIGHT, maxHeight: MAX_HEIGHT, minHeight: MAX_HEIGHT, boxSizing: 'border-box', background: '#fafdff', borderRadius: 14, boxShadow: '0 2px 12px #0001', margin: '2rem auto', maxWidth: 1100 }}>
      {/* Contacts */}
      <div style={{ width: 200, background: '#f8fafc', borderRight: '1.5px solid #e5e7eb', padding: '0.7rem 0.5rem', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
        <div style={{ fontWeight: 700, color: '#1746a0', fontSize: '1.01rem', marginBottom: 4 }} title="Click a contact to open or start a conversation">Contacts <span style={{fontSize:'0.9em',color:'#64748b'}}>(click to message)</span></div>
        <div style={{ overflowY: 'auto', maxHeight: CONTACTS_HEIGHT }}>
          {CONTACTS.map((c, i) => {
            const isSelected = c.name === selectedContactName;
            return (
              <div
                key={i}
                onClick={() => handleContactMessage(c.name)}
                style={{
                  marginBottom: 4,
                  padding: '6px 8px',
                  background: isSelected ? '#2563eb' : '#e0e7ff',
                  color: isSelected ? '#fff' : '#1746a0',
                  borderRadius: 6,
                  fontSize: '0.97rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 2px 8px #2563eb22' : 'none',
                  border: isSelected ? '1.5px solid #2563eb' : '1.5px solid #e3e8f0',
                  transition: 'background 0.15s, color 0.15s',
                }}
                title={`Message ${c.name}`}
              >
                <span>{c.name}</span>
                <span role="img" aria-label="message" style={{ fontSize: '1.1em', color: isSelected ? '#fff' : '#2563eb' }}>✉️</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Conversation List */}
      <div style={{ width: 220, borderRight: '1.5px solid #e3e8f0', padding: '0.7rem 0.5rem', background: '#f7f9fb', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, height: '100%' }}>
        <div style={{ fontSize: '1.01rem', fontWeight: 800, color: '#2563eb', marginBottom: 8, textAlign: 'center' }}>Inbox</div>
        <div style={{ overflowY: 'auto', maxHeight: THREADS_HEIGHT }}>
          {threads.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', marginTop: 20, fontSize: '0.97rem' }}>No conversations yet</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {threads.map((t, idx) => (
                <li key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setSelectedId(t.id)}
                    style={{
                      width: '100%',
                      background: selectedId === t.id ? '#e3f0fc' : 'none',
                      border: 'none',
                      borderRadius: 6,
                      padding: '7px 8px 6px 8px',
                      marginBottom: 4,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: selectedId === t.id ? 700 : 500,
                      color: selectedId === t.id ? '#2563eb' : '#222',
                      boxShadow: selectedId === t.id ? '0 1px 4px rgba(25, 118, 210, 0.07)' : 'none',
                      fontSize: '0.97rem',
                    }}
                  >
                    <div style={{ fontSize: '0.97rem', marginBottom: 1 }}>{t.subject}</div>
                  </button>
                  <button
                    title="Delete conversation"
                    onClick={() => {
                      setThreads(ts => ts.filter(th => th.id !== t.id));
                      if (selectedId === t.id) {
                        // Select next available thread or none
                        const next = threads.filter(th => th.id !== t.id)[0]?.id || null;
                        setSelectedId(next);
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', marginLeft: 4, fontSize: '1.08em', padding: 0 }}
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Message View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
        <div style={{ borderBottom: '1.5px solid #e3e8f0', padding: '0.7rem 1rem 0.5rem 1rem', minHeight: 48 }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1746a0' }}>{selectedThread?.subject || 'Select a conversation'}</div>
          <div style={{ fontSize: '0.93rem', color: '#888', marginTop: 1 }}>
            {selectedThread?.participants?.join(', ')}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.7rem 1rem', background: '#fafdff', minHeight: 0 }}>
          {selectedThread?.messages?.length ? (
            selectedThread.messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: m.sender === 'Contractor' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: m.sender === 'Contractor' ? '#2563eb' : '#e3e8f0',
                  color: m.sender === 'Contractor' ? '#fff' : '#222',
                  borderRadius: 7,
                  padding: '7px 12px',
                  maxWidth: 260,
                  fontSize: '0.97rem',
                  fontWeight: 500,
                  boxShadow: '0 1px 4px rgba(25, 118, 210, 0.07)'
                }}>{m.body}</div>
                <div style={{ fontSize: '0.82rem', color: '#888', marginTop: 1 }}>{m.sender} • {m.time}</div>
              </div>
            ))
          ) : (
            <div style={{ color: '#888', textAlign: 'center', marginTop: 20, fontSize: '0.97rem' }}>No messages yet</div>
          )}
        </div>
        {selectedThread && (
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1.5px solid #e3e8f0', padding: '0.5rem 1rem', background: '#fafdff' }}>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, padding: '7px 12px', borderRadius: 6, border: '1.5px solid #e3e8f0', fontSize: '0.97rem', marginRight: 8 }}
            />
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 700, fontSize: '0.97rem', cursor: 'pointer' }}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
} 
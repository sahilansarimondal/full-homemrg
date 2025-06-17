import React, { useState } from 'react';

// Mock data for demo
const MOCK_THREADS = [
  {
    id: 1,
    subject: 'Welcome to Home Manager!',
    participants: ['Homeowner', 'Manager'],
    messages: [
      { sender: 'Manager', body: 'Welcome! Let us know if you need anything.', time: '2025-05-10 09:00' },
      { sender: 'Homeowner', body: 'Thank you! Looking forward to using the service.', time: '2025-05-10 09:05' },
    ],
  },
  {
    id: 2,
    subject: 'Spring Cleaning Schedule',
    participants: ['Homeowner', 'Contractor'],
    messages: [
      { sender: 'Homeowner', body: 'When will the spring cleaning be scheduled?', time: '2025-05-09 14:00' },
      { sender: 'Contractor', body: 'We can come next Tuesday at 10am. Does that work?', time: '2025-05-09 14:10' },
    ],
  },
  {
    id: 3,
    subject: 'Invoice Question',
    participants: ['Homeowner', 'Manager'],
    messages: [
      { sender: 'Homeowner', body: 'I have a question about my last invoice.', time: '2025-05-08 11:00' },
      { sender: 'Manager', body: 'Sure, what would you like to know?', time: '2025-05-08 11:05' },
    ],
  },
];

const FIXED_CONTACTS = [
  { name: 'Manager', email: 'manager@homemanager.com' },
  { name: 'Home Manager', email: 'homemanager@homemanager.com' },
];

export default function InboxPage() {
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [selectedId, setSelectedId] = useState(threads[0]?.id || null);
  const [message, setMessage] = useState('');

  const selectedThread = threads.find(t => t.id === selectedId);

  // Find or create a thread for a contact
  const handleContactMessage = (contactName) => {
    let thread = threads.find(t => t.participants.includes(contactName));
    if (!thread) {
      thread = {
        id: Math.max(0, ...threads.map(t => t.id)) + 1,
        subject: `Message to ${contactName}`,
        participants: ['Homeowner', contactName],
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
        ? { ...t, messages: [...t.messages, { sender: 'You', body: message, time: new Date().toLocaleString() }] }
        : t
    ));
    setMessage('');
  };

  return (
    <div className="inbox-page" style={{ display: 'flex', height: 'calc(100vh - 40px)' }}>
      {/* Fixed Contacts Section */}
      <div style={{ width: 220, background: '#f8fafc', borderRight: '1.5px solid #e5e7eb', padding: '1.2rem 0.7rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontWeight: 700, color: '#1746a0', fontSize: '1.08rem', marginBottom: 8 }}>Contacts</div>
        {FIXED_CONTACTS.map((c, i) => (
          <div key={i} style={{ marginBottom: 6, padding: '7px 10px', background: '#e0e7ff', borderRadius: 7, fontSize: '0.98rem', color: '#1746a0', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{c.name}</span>
            <button
              title={`Send message to ${c.name}`}
              onClick={() => handleContactMessage(c.name)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 8 }}
            >
              <span role="img" aria-label="message" style={{ fontSize: '1.15em', color: '#2563eb' }}>✉️</span>
            </button>
          </div>
        ))}
      </div>
      {/* Conversation List */}
      <div style={{ width: 270, borderRight: '1.5px solid #e3e8f0', padding: '1.2rem 0.7rem', background: '#f7f9fb', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', marginBottom: 18, textAlign: 'center' }}>Inbox</h2>
        {threads.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>No conversations yet</div>
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
                    borderRadius: 7,
                    padding: '10px 10px 8px 10px',
                    marginBottom: 6,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: selectedId === t.id ? 700 : 500,
                    color: selectedId === t.id ? '#2563eb' : '#222',
                    boxShadow: selectedId === t.id ? '0 1px 4px rgba(25, 118, 210, 0.07)' : 'none',
                  }}
                >
                  <div style={{ fontSize: '1rem', marginBottom: 2 }}>{t.subject}</div>
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
                  style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', marginLeft: 6, fontSize: '1.15em', padding: 0 }}
                >
                  <span role="img" aria-label="delete">🗑️</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Message View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ borderBottom: '1.5px solid #e3e8f0', padding: '1.2rem 1.5rem 0.7rem 1.5rem', minHeight: 70 }}>
          <div style={{ fontSize: '1.13rem', fontWeight: 800, color: '#1746a0' }}>{selectedThread?.subject || 'Select a conversation'}</div>
          <div style={{ fontSize: '0.97rem', color: '#888', marginTop: 2 }}>
            {selectedThread?.participants?.join(', ')}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem', background: '#fafdff' }}>
          {selectedThread?.messages?.length ? (
            selectedThread.messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', alignItems: m.sender === 'You' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: m.sender === 'You' ? '#2563eb' : '#e3e8f0',
                  color: m.sender === 'You' ? '#fff' : '#222',
                  borderRadius: 8,
                  padding: '8px 14px',
                  maxWidth: 340,
                  fontSize: '1rem',
                  fontWeight: 500,
                  boxShadow: '0 1px 4px rgba(25, 118, 210, 0.07)'
                }}>{m.body}</div>
                <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 2 }}>{m.sender} • {m.time}</div>
              </div>
            ))
          ) : (
            <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>No messages yet</div>
          )}
        </div>
        {selectedThread && (
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1.5px solid #e3e8f0', padding: '0.7rem 1.5rem', background: '#fafdff' }}>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: 7, border: '1.5px solid #e3e8f0', fontSize: '1rem', marginRight: 10 }}
            />
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 28px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
}

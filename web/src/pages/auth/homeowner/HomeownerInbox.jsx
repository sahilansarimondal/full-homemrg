import React, { useState } from 'react';
import users from '../../../data/users.json';
import { FaUserCircle, FaPlus, FaPaperPlane } from 'react-icons/fa';

// Helper: get all contacts for a homeowner (manager + all contractors)
function getContacts() {
  const manager = users.managers[0];
  const contractor = users.contractors[0]; // Only the first contractor
  return [
    { id: manager.id, name: 'Office Manager', role: 'Office Manager', email: manager.email },
    { id: contractor.id, name: 'Home Manager', role: 'Home Manager', email: contractor.name.replace(/ /g, '').toLowerCase() + '@contractors.com' }
  ];
}

// Mock message threads for demo
const MOCK_THREADS = [
  {
    id: 'manager-thread-1',
    contactId: 'manager-jane-doe',
    contactName: 'Jane Doe',
    subject: 'Welcome to Home Manager!',
    messages: [
      { sender: 'Jane Doe', body: 'Welcome! Let us know if you need anything.', time: '2025-05-10 09:00' },
      { sender: 'You', body: 'Thank you! Looking forward to using the service.', time: '2025-05-10 09:05' },
    ],
    unread: false,
  },
  {
    id: 'manager-thread-2',
    contactId: 'manager-jane-doe',
    contactName: 'Jane Doe',
    subject: 'Invoice Question',
    messages: [
      { sender: 'You', body: 'I have a question about my last invoice.', time: '2025-05-08 11:00' },
      { sender: 'Jane Doe', body: 'Sure, what would you like to know?', time: '2025-05-08 11:05' },
    ],
    unread: true,
  },
  {
    id: 'contractor-thread-1',
    contactId: 'olivia-thomas',
    contactName: 'Olivia Thomas',
    subject: 'Spring Cleaning Schedule',
    messages: [
      { sender: 'You', body: 'When will the spring cleaning be scheduled?', time: '2025-05-09 14:00' },
      { sender: 'Olivia Thomas', body: 'We can come next Tuesday at 10am. Does that work?', time: '2025-05-09 14:10' },
    ],
    unread: false,
  },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function HomeownerInbox() {
  const contacts = getContacts();
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [message, setMessage] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);

  // Filter threads for selected contact
  const filteredThreads = selectedContactId
    ? threads.filter(t => t.contactId === selectedContactId)
    : [];

  const selectedThread = threads.find(t => t.id === selectedThreadId);
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Contact click: select contact, clear thread selection
  const handleContactClick = (contact) => {
    setSelectedContactId(contact.id);
    setSelectedThreadId(null);
  };

  // Thread click: select thread
  const handleThreadClick = (threadId) => {
    setSelectedThreadId(threadId);
    setThreads(ts => ts.map(t => t.id === threadId ? { ...t, unread: false } : t));
  };

  // Send a message
  const handleSend = e => {
    e.preventDefault();
    if (!message.trim() || !selectedThreadId) return;
    setThreads(ts => ts.map(t =>
      t.id === selectedThreadId
        ? { ...t, messages: [...t.messages, { sender: 'You', body: message, time: new Date().toLocaleString() }] }
        : t
    ));
    setMessage('');
  };

  // New message modal (for demo, just select contact)
  const handleNewMessage = (contactId) => {
    setSelectedContactId(contactId);
    setShowNewMessage(false);
    // Create a new thread if none exists
    let thread = threads.find(t => t.contactId === contactId);
    if (!thread) {
      const contact = contacts.find(c => c.id === contactId);
      thread = { id: `${contactId}-thread-new`, contactId, contactName: contact.name, subject: 'New Message', messages: [], unread: false };
      setThreads(ts => [...ts, thread]);
    }
    setSelectedThreadId(thread.id);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 40px)', background: '#f4f7fb', borderRadius: 12, boxShadow: '0 2px 12px #0001', margin: '1.5rem auto', maxWidth: 1100, minHeight: 600 }}>
      {/* Contacts List */}
      <div style={{ width: 220, background: '#f8fafc', borderRight: '1.5px solid #e5e7eb', padding: '1.2rem 0.7rem', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontWeight: 700, color: '#1746a0', fontSize: '1.08rem' }}>Contacts</div>
          <button onClick={() => setShowNewMessage(true)} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '1.2rem', cursor: 'pointer' }} title="New Message"><FaPlus /></button>
        </div>
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => handleContactClick(c)}
            style={{
              marginBottom: 6,
              padding: '7px 10px',
              background: selectedContactId === c.id ? '#e0e7ff' : '#e5e7eb',
              borderRadius: 7,
              fontSize: '0.98rem',
              color: '#1746a0',
              fontWeight: 600,
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: selectedContactId === c.id ? '0 1px 4px #2563eb22' : 'none',
              transition: 'background 0.15s',
            }}
          >
            <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.05rem' }}>{getInitials(c.name)}</span>
            <span>{c.name}</span>
            <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.93em', marginLeft: 'auto' }}>({c.role})</span>
          </button>
        ))}
        {/* New Message Modal */}
        {showNewMessage && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px #0002', position: 'relative' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 18, color: '#1746a0' }}>Start New Message</h2>
              {contacts.map(c => (
                <button key={c.id} onClick={() => handleNewMessage(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: '#e5e7eb', border: 'none', borderRadius: 7, padding: '10px 12px', marginBottom: 8, fontWeight: 600, color: '#1746a0', cursor: 'pointer' }}>
                  <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.05rem' }}>{getInitials(c.name)}</span>
                  <span>{c.name}</span>
                  <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.93em', marginLeft: 'auto' }}>({c.role})</span>
                </button>
              ))}
              <button onClick={() => setShowNewMessage(false)} style={{ background: 'none', border: 'none', color: '#b91c1c', fontWeight: 700, fontSize: '1.1rem', marginTop: 10, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      {/* Threads List */}
      <div style={{ width: 300, borderRight: '1.5px solid #e3e8f0', padding: '1.2rem 0.7rem', background: '#f7f9fb', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', marginBottom: 18, textAlign: 'center', letterSpacing: '0.5px' }}>Inbox</h2>
        {selectedContactId ? (
          filteredThreads.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>No conversations yet</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredThreads.map((t) => {
                const lastMsg = t.messages[t.messages.length - 1];
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => handleThreadClick(t.id)}
                      style={{
                        width: '100%',
                        background: selectedThreadId === t.id ? '#e3f0fc' : 'none',
                        border: 'none',
                        borderRadius: 7,
                        padding: '10px 10px 8px 10px',
                        marginBottom: 6,
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: selectedThreadId === t.id ? 700 : 500,
                        color: selectedThreadId === t.id ? '#2563eb' : '#222',
                        boxShadow: selectedThreadId === t.id ? '0 1px 4px rgba(25, 118, 210, 0.07)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 2,
                        borderLeft: t.unread ? '4px solid #2563eb' : '4px solid transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: 2, fontWeight: t.unread ? 800 : 600 }}>{t.subject}</div>
                      <div style={{ fontSize: '0.97rem', color: '#64748b', fontWeight: 400, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lastMsg ? `${lastMsg.sender}: ${lastMsg.body}` : 'No messages yet'}</div>
                      <div style={{ fontSize: '0.89rem', color: '#b0b0b0', marginTop: 2 }}>{lastMsg?.time}</div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )
        ) : (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>Select a contact</div>
        )}
      </div>
      {/* Message View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#fafdff', position: 'relative' }}>
        {selectedThread ? (
          <>
            {/* Header */}
            <div style={{ borderBottom: '1.5px solid #e3e8f0', padding: '1.2rem 1.5rem 0.7rem 1.5rem', minHeight: 70, display: 'flex', alignItems: 'center', gap: 14, background: '#e3f0fc', borderTopRightRadius: 12 }}>
              <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.15rem' }}>{getInitials(selectedThread.contactName)}</span>
              <div>
                <div style={{ fontSize: '1.13rem', fontWeight: 800, color: '#1746a0' }}>{selectedThread.subject}</div>
                <div style={{ fontSize: '0.97rem', color: '#888', marginTop: 2 }}>{selectedThread.contactName} <span style={{ color: '#22c55e', fontWeight: 600, marginLeft: 8 }}>Online</span></div>
              </div>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, background: '#fafdff' }}>
              {selectedThread.messages.length ? (
                selectedThread.messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'You' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      background: m.sender === 'You' ? '#2563eb' : '#e3e8f0',
                      color: m.sender === 'You' ? '#fff' : '#222',
                      borderRadius: m.sender === 'You' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      padding: '10px 18px',
                      maxWidth: 420,
                      fontSize: '1.04rem',
                      fontWeight: 500,
                      boxShadow: '0 1px 4px rgba(25, 118, 210, 0.07)',
                      marginBottom: 2,
                      marginLeft: m.sender === 'You' ? 40 : 0,
                      marginRight: m.sender === 'You' ? 0 : 40,
                      transition: 'background 0.15s',
                    }}>{m.body}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 2 }}>{m.sender} • {m.time}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>No messages yet</div>
              )}
            </div>
            {/* Message Input Bar */}
            <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', borderTop: '1.5px solid #e3e8f0', padding: '0.7rem 1.5rem', background: '#fafdff', position: 'sticky', bottom: 0, zIndex: 2 }}>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: '12px 16px', borderRadius: 7, border: '1.5px solid #e3e8f0', fontSize: '1.05rem', marginRight: 10, background: '#fff' }}
              />
              <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7, padding: '12px 28px', fontWeight: 800, fontSize: '1.08rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><FaPaperPlane /> Send</button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '1.1rem' }}>
            {selectedContactId ? 'Select a subject to view messages' : 'Select a contact to begin'}
          </div>
        )}
      </div>
    </div>
  );
} 
import React, { useState } from 'react';

const MOCK_MESSAGES = {
  inbox: [
    { id: 1, subject: 'Welcome to Home Manager!', from: 'System', date: '2025-05-10', content: 'Welcome! Let us know if you need anything.', status: 'unread' },
    { id: 2, subject: 'Spring Cleaning Schedule', from: 'Pat Homeowner', date: '2025-05-11', content: 'Can we update the cleaning schedule?', status: 'read' },
  ],
  issues: [
    { id: 3, subject: 'Broken Dishwasher', from: 'Morgan Resident', date: '2025-05-12', content: 'The dishwasher is not working.', status: 'unread' },
  ],
  urgent: [
    { id: 4, subject: 'Water Leak', from: 'Alex Homeowner', date: '2025-05-13', content: 'There is a water leak in the kitchen!', status: 'unread' },
  ],
  archive: [],
};

export default function ManagerInboxPage() {
  const [tab, setTab] = useState('inbox');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [selectedId, setSelectedId] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleMarkComplete = (msgId) => {
    // Find the tab containing the message
    const currentTab = tab;
    const msg = messages[currentTab].find(m => m.id === msgId);
    if (!msg) return;
    setMessages(prev => {
      const updated = { ...prev };
      updated[currentTab] = updated[currentTab].filter(m => m.id !== msgId);
      updated.archive = [msg, ...updated.archive];
      return updated;
    });
    setSelectedId(null);
  };

  const currentMessages = messages[tab] || [];
  const selectedMsg = currentMessages.find(m => m.id === selectedId) || null;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e3e8f0' }}>
        <button onClick={() => { setTab('inbox'); setSelectedId(null); }} style={{ fontWeight: 700, fontSize: '1.1rem', background: tab === 'inbox' ? '#2563eb' : '#f3f4f6', color: tab === 'inbox' ? '#fff' : '#1e293b', border: 'none', borderRadius: '8px 8px 0 0', padding: '0.7rem 2.2rem', cursor: 'pointer' }}>Inbox</button>
        <button onClick={() => { setTab('issues'); setSelectedId(null); }} style={{ fontWeight: 700, fontSize: '1.1rem', background: tab === 'issues' ? '#2563eb' : '#f3f4f6', color: tab === 'issues' ? '#fff' : '#1e293b', border: 'none', borderRadius: '8px 8px 0 0', padding: '0.7rem 2.2rem', cursor: 'pointer' }}>Reported Issues</button>
        <button onClick={() => { setTab('urgent'); setSelectedId(null); }} style={{ fontWeight: 700, fontSize: '1.1rem', background: tab === 'urgent' ? '#ef4444' : '#f3f4f6', color: tab === 'urgent' ? '#fff' : '#b91c1c', border: 'none', borderRadius: '8px 8px 0 0', padding: '0.7rem 2.2rem', cursor: 'pointer' }}>Urgent Requests</button>
        <button onClick={() => { setTab('archive'); setSelectedId(null); }} style={{ fontWeight: 700, fontSize: '1.1rem', background: tab === 'archive' ? '#64748b' : '#f3f4f6', color: tab === 'archive' ? '#fff' : '#1e293b', border: 'none', borderRadius: '8px 8px 0 0', padding: '0.7rem 2.2rem', cursor: 'pointer', marginLeft: 'auto' }}>Archive</button>
      </div>
      <div style={{ display: 'flex', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', minHeight: 500 }}>
        {/* Message List */}
        <div style={{ width: 340, borderRight: '1.5px solid #e3e8f0', padding: '1.2rem 0.7rem', overflowY: 'auto', background: '#f9fafb' }}>
          {currentMessages.length === 0 && <div style={{ color: '#64748b', textAlign: 'center', marginTop: 40 }}>No messages.</div>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {currentMessages.map(msg => (
              <li key={msg.id} onClick={() => setSelectedId(msg.id)} style={{ background: selectedId === msg.id ? '#e0e7ff' : '#fff', borderRadius: 8, padding: '0.7rem 0.8rem', marginBottom: 6, cursor: 'pointer', fontWeight: msg.status === 'unread' ? 700 : 500, color: '#1e293b', boxShadow: selectedId === msg.id ? '0 2px 8px #2563eb22' : 'none', border: selectedId === msg.id ? '1.5px solid #2563eb' : '1.5px solid #e5e7eb' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>{msg.subject}</div>
                <div style={{ fontSize: '0.97em', color: '#64748b' }}>{msg.from} • {msg.date}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Message Content */}
        <div style={{ flex: 1, padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', background: '#fff', color: '#1e293b' }}>
          {selectedMsg ? (
            <>
              <div style={{ borderBottom: '1.5px solid #e3e8f0', marginBottom: 18, paddingBottom: 8 }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1746a0' }}>{selectedMsg.subject}</div>
                <div style={{ fontSize: '1.05em', color: '#64748b', marginTop: 2 }}>{selectedMsg.from} • {selectedMsg.date}</div>
              </div>
              <div style={{ fontSize: '1.08rem', color: '#222', marginBottom: 24 }}>{selectedMsg.content}</div>
              {tab !== 'archive' && (
                <>
                  <button onClick={() => setShowReply(v => !v)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', marginTop: 12, marginRight: 12 }}>Reply</button>
                  <button onClick={() => handleMarkComplete(selectedMsg.id)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', marginTop: 12 }}>Mark Complete & Archive</button>
                  {showReply && (
                    <div style={{ marginTop: 18 }}>
                      <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={3} placeholder="Type your reply..." style={{ width: '100%', borderRadius: 6, border: '1.5px solid #e3e8f0', padding: 10, fontSize: '1.05rem', marginBottom: 8 }} />
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.6rem', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer' }} onClick={() => { setReplyText(''); setShowReply(false); }}>Send</button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div style={{ color: '#64748b', textAlign: 'center', marginTop: 80, fontSize: '1.1rem' }}>Select a message to view its details.</div>
          )}
        </div>
      </div>
    </div>
  );
} 
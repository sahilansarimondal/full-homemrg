import React, { useState, useEffect } from 'react';
import { useMessages } from '../../hooks/useMessages';

export default function MessageModal({ threadId, onClose }) {
  const { getThread, sendMessage } = useMessages();
  const [thread, setThread]       = useState(null);
  const [text, setText]           = useState('');

  // load messages when modal opens
  useEffect(() => {
    getThread(threadId).then(setThread);
  }, [threadId]);

  const handleSend = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage(threadId, text);
    const updated = await getThread(threadId);
    setThread(updated);
    setText('');
  };

  if (!thread) return null; // or a spinner

  return (
    <div className="modal-backdrop">
      <div className="modal chat-modal" style={{ maxWidth: 600 }}>
        <h2>{thread.subject || 'Conversation'}</h2>
        <div
          style={{
            height: '300px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '0.5rem',
            marginBottom: '1rem',
            background: '#fafafa'
          }}
        >
          {thread.messages.map(m => (
            <div key={m.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{m.senderName || m.sender}:</strong> {m.body}
              <div style={{ fontSize: '0.75rem', color: '#999' }}>
                {new Date(m.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ flex: 1, padding: '0.5rem' }}
            placeholder="Type a message…"
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Send
          </button>
        </form>
        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Close
        </button>
      </div>
    </div>
  );
}

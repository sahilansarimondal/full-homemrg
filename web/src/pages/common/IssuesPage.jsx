import React, { useState } from 'react';
import '../../styles/SharedStyles.css';

const CATEGORIES = ['Plumbing', 'Electrical', 'Cleaning', 'Appliance', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
const CONTACTS = ['Email', 'Phone', 'Text', 'No Preference'];
const TABS = [
  { key: 'new', label: 'Report New' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'archived', label: 'Archived' },
];

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [priority, setPriority] = useState('Medium');
  const [contact, setContact] = useState('No Preference');
  const [photo, setPhoto] = useState(null);
  const [tab, setTab] = useState('new');

  const handlePhoto = e => setPhoto(e.target.files[0]);

  const handleSubmit = e => {
    e.preventDefault();
    setIssues(prev => [{
      id: Date.now(),
      title,
      description,
      category,
      priority,
      contact,
      photo: photo ? photo.name : null,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      archived: false,
    }, ...prev]);
    setTitle('');
    setDescription('');
    setCategory('Other');
    setPriority('Medium');
    setContact('No Preference');
    setPhoto(null);
    setTab('pending');
  };

  // Filtering by tab
  let filteredIssues = issues;
  if (tab === 'pending') filteredIssues = issues.filter(i => i.status === 'Pending' && !i.archived);
  if (tab === 'completed') filteredIssues = issues.filter(i => i.status === 'Completed' && !i.archived);
  if (tab === 'archived') filteredIssues = issues.filter(i => i.archived);

  const handleArchive = id => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, archived: true } : i));
  };
  const handleComplete = id => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status: 'Completed' } : i));
  };

  return (
    <div style={{ display: 'flex', maxWidth: 950, margin: '2rem auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 10px #2563eb22', minHeight: 500 }}>
      {/* Tabs Sidebar */}
      <div style={{ width: 160, background: '#f7f9fb', borderRight: '1.5px solid #e3e8f0', borderTopLeftRadius: 14, borderBottomLeftRadius: 14, padding: '2rem 0.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background: tab === t.key ? '#2563eb' : 'none',
              color: tab === t.key ? '#fff' : '#1746a0',
              border: 'none',
              borderRadius: 7,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              marginBottom: 2,
              transition: 'background 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem 2.5rem', minHeight: 500 }}>
        {tab === 'new' && (
          <>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#2563eb', marginBottom: 22 }}>Report an Issue</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: 36, background: '#f7f9fb', borderRadius: 10, padding: '1.5rem 1.5rem 1.2rem 1.5rem', boxShadow: '0 1px 4px rgba(25, 118, 210, 0.03)', border: '1.5px solid #e3e8f0', maxWidth: 600 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr', gap: 18, marginBottom: 14 }}>
                <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4 }}>Title
                  <input value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }} />
                </label>
                <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4 }}>Category
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4 }}>Priority
                  <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
              </div>
              <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>Description
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={2} style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', resize: 'vertical' }} />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: 18, marginBottom: 18 }}>
                <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4 }}>Preferred Contact
                  <select value={contact} onChange={e => setContact(e.target.value)} style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}>
                    {CONTACTS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label style={{ fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4 }}>Photo (optional)
                  <input type="file" accept="image/*" onChange={handlePhoto} style={{ fontSize: '1rem' }} />
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="submit" style={{ padding: '10px 38px', borderRadius: 7, background: '#2563eb', color: '#fff', fontWeight: 900, fontSize: '1.08rem', border: 'none', cursor: 'pointer', boxShadow: '0 1px 4px rgba(25, 118, 210, 0.07)' }}>Submit</button>
              </div>
            </form>
          </>
        )}
        {tab !== 'new' && (
          <>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb', marginBottom: 18 }}>{TABS.find(t => t.key === tab)?.label} Issues</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
              <thead>
                <tr style={{ background: '#f7f9fb' }}>
                  <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Title</th>
                  <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Category</th>
                  <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Priority</th>
                  <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Status</th>
                  <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Date</th>
                  {tab === 'pending' && <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700 }}></th>}
                  {tab === 'completed' && <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700 }}></th>}
                  {tab === 'archived' && <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700 }}></th>}
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map(i => (
                  <tr key={i.id} style={{ borderBottom: '1px solid #e3e8f0' }}>
                    <td style={{ padding: '8px 6px', fontWeight: 500 }}>{i.title}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px' }}>{i.category}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px' }}>{i.priority}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px', color: i.status === 'Pending' ? '#d97706' : 'green', fontWeight: 600 }}>{i.status}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px' }}>{i.date}</td>
                    {tab === 'pending' && <td style={{ textAlign: 'center', padding: '8px 6px' }}><button onClick={() => handleComplete(i.id)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Mark Completed</button> <button onClick={() => handleArchive(i.id)} style={{ background: '#64748b', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginLeft: 8 }}>Archive</button></td>}
                    {tab === 'completed' && <td style={{ textAlign: 'center', padding: '8px 6px' }}><button onClick={() => handleArchive(i.id)} style={{ background: '#64748b', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Archive</button></td>}
                    {tab === 'archived' && <td style={{ textAlign: 'center', padding: '8px 6px', color: '#888' }}>Archived</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredIssues.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>No issues to show.</div>}
          </>
        )}
      </div>
    </div>
  );
}

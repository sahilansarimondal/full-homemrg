import React, { useState, useEffect } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Mock data for homeowners and contractors
const MOCK_HOMEOWNERS = [
  { id: 'h1', name: 'Pat Homeowner', email: 'pat@example.com', active: true, reference: 'H1' },
  { id: 'h2', name: 'Morgan Resident', email: 'morgan@example.com', active: false, reference: 'H2' },
  { id: 'h3', name: 'Alex Homeowner', email: 'alex@example.com', active: true, reference: 'H3' },
];

const MOCK_CONTRACTORS = [
  { id: 'c1', name: 'Alex Contractor', email: 'alex@contractor.com', active: true, reference: 'C1' },
  { id: 'c2', name: 'Jamie Builder', email: 'jamie@builder.com', active: false, reference: 'C2' },
  { id: 'c3', name: 'Sam Worker', email: 'sam@worker.com', active: true, reference: 'C3' },
];

function ToggleSwitch({ checked, onChange }) {
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <span style={{ marginRight: 8, color: checked ? '#15803d' : '#b91c1c', fontWeight: 500, fontSize: '0.98em' }}>
          {checked ? 'Active' : 'Inactive'}
        </span>
        <span style={{ position: 'relative', width: 38, height: 22, display: 'inline-block' }}>
          <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0, left: 0, right: 0, bottom: 0,
            background: checked ? '#4ade80' : '#f87171',
            borderRadius: 22,
            transition: 'background 0.2s',
          }} />
          <span style={{
            position: 'absolute',
            left: checked ? 18 : 2,
            top: 2,
            width: 18, height: 18,
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 1px 4px #0002',
            transition: 'left 0.2s',
            border: '1px solid #e5e7eb',
          }} />
        </span>
      </label>
    </span>
  );
}

// Multi-step application for contractors
function ContractorApplication({ onSubmit, onCancel }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', skills: '', experience: '' });
  const [error, setError] = useState('');

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFinalSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.skills) {
      setError('Please complete all required fields.');
      return;
    }
    onSubmit(form);
  };

  return (
    <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 18, marginBottom: 18, maxWidth: 400 }}>
      <div style={{ marginBottom: 10, fontWeight: 600, color: '#1746a0' }}>Contractor Application</div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontWeight: 500 }}>Step {step} of 3</span>
      </div>
      <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step === 1 && (
          <>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" onClick={onCancel} style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Cancel</button>
              <button type="button" onClick={next} style={{ background: '#1746a0', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Next</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 48 }} />
            <textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (optional)" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 48 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" onClick={prev} style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Back</button>
              <button type="button" onClick={next} style={{ background: '#1746a0', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div style={{ background: '#fff', borderRadius: 6, padding: 12, marginBottom: 10 }}>
              <div><b>Name:</b> {form.name}</div>
              <div><b>Email:</b> {form.email}</div>
              <div><b>Skills:</b> {form.skills}</div>
              <div><b>Experience:</b> {form.experience || 'N/A'}</div>
            </div>
            {error && <div style={{ color: '#b91c1c', marginBottom: 8 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={prev} style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Back</button>
              <button type="submit" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600 }}>Submit Application</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'homeowners';
  
  // const { users, createUser, updateUser } = useUsers();
  // For demo, use mock users
  const [users, setUsers] = useState(initialTab === 'homeowners' ? MOCK_HOMEOWNERS : MOCK_CONTRACTORS);
  const [tab, setTab] = useState(initialTab);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', active: true });
  const [error, setError] = useState('');
  // Assignment state: { [homeownerId]: [contractorId, ...] }
  const [assignments, setAssignments] = useState({});
  const [assigningId, setAssigningId] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState('');
  // Applicants state
  const [applicants, setApplicants] = useState([]);

  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab });
  }, [tab, setSearchParams]);

  // Separate users by role
  const contractors = users.filter(u => u.role === 'contractor' && u.active !== false);
  const homeowners = users.filter(u => u.role === 'homeowner');

  // Handlers
  const handleAdd = () => {
    setShowAdd(true);
    setEditId(null);
    setError('');
  };
  const handleEdit = (u) => {
    setForm({ name: u.name, email: u.email, active: u.active !== false });
    setEditId(u.id);
    setShowAdd(false);
    setError('');
  };
  const handleCancel = () => {
    setShowAdd(false);
    setEditId(null);
    setError('');
  };
  // When application is submitted, add to applicants
  const handleSubmit = async (formData) => {
    setError('');
    try {
      setApplicants([...applicants, { ...formData, id: Math.random().toString(36).slice(2) }]);
      setShowAdd(false);
    } catch {
      setError('Failed to save.');
    }
  };
  const handleToggleActive = (u, checked) => {
    setUsers(users.map(user => user.id === u.id ? { ...user, active: checked } : user));
  };
  // Assignment logic
  const handleStartAssign = (homeownerId) => {
    setAssigningId(homeownerId);
    setSelectedContractor('');
  };
  const handleAssign = () => {
    if (!selectedContractor) return;
    setAssignments(prev => {
      const prevList = prev[assigningId] || [];
      return { ...prev, [assigningId]: [...new Set([...prevList, selectedContractor])] };
    });
    setAssigningId(null);
    setSelectedContractor('');
  };
  const handleRemoveAssignment = (homeownerId, contractorId) => {
    setAssignments(prev => ({
      ...prev,
      [homeownerId]: (prev[homeownerId] || []).filter(id => id !== contractorId)
    }));
  };
  // Hire applicant: move to contractors, remove from applicants
  const handleHireApplicant = (applicant) => {
    setUsers([...users, { ...applicant, role: 'contractor', active: true }]);
    setApplicants(applicants.filter(a => a.id !== applicant.id));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 40 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 2rem' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 0, justifyContent: 'center' }}>
          <button
            onClick={() => { setTab('homeowners'); setShowAdd(false); setEditId(null); setError(''); }}
            style={{
              flex: 1,
              background: tab === 'homeowners' ? '#1746a0' : '#f3f4f6',
              color: tab === 'homeowners' ? '#fff' : '#1746a0',
              border: 'none',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 0,
              borderBottom: tab === 'homeowners' ? '2px solid #1746a0' : '2px solid #e5e7eb',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '14px 0',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 150,
            }}
          >
            Homeowners
          </button>
          <button
            onClick={() => { setTab('contractors'); setShowAdd(false); setEditId(null); setError(''); }}
            style={{
              flex: 1,
              background: tab === 'contractors' ? '#1746a0' : '#f3f4f6',
              color: tab === 'contractors' ? '#fff' : '#1746a0',
              border: 'none',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottom: tab === 'contractors' ? '2px solid #1746a0' : '2px solid #e5e7eb',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '14px 0',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 150,
            }}
          >
            Contractors
          </button>
          <button
            onClick={() => { setTab('applicants'); setShowAdd(false); setEditId(null); setError(''); }}
            style={{
              flex: 1,
              background: tab === 'applicants' ? '#1746a0' : '#f3f4f6',
              color: tab === 'applicants' ? '#fff' : '#1746a0',
              border: 'none',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 10,
              borderBottom: tab === 'applicants' ? '2px solid #1746a0' : '2px solid #e5e7eb',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '14px 0',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 150,
            }}
          >
            Applicants
          </button>
        </div>
        {/* Canvas Area */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 36, minHeight: 320, marginTop: 0 }}>
          {tab === 'homeowners' && (
            <>
              <button
                style={{ marginBottom: 18, background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                onClick={handleAdd}
              >
                Add Homeowner
              </button>
              {showAdd && (
                <ContractorApplication onSubmit={handleSubmit} onCancel={handleCancel} />
              )}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.filter(u => u.role === 'homeowner').length === 0 && <li style={{ color: '#64748b' }}>No homeowners yet.</li>}
                {users.filter(u => u.role === 'homeowner').map(u => (
                  <li
                    key={u.id}
                    onClick={() => handleEdit(u)}
                    style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', fontWeight: 500, color: u.active === false ? '#b91c1c' : '#222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span>{u.name} <span style={{ fontSize: '0.9em', color: '#64748b', marginLeft: 8 }}>{u.active === false ? '(Inactive)' : ''}</span></span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <ToggleSwitch checked={u.active !== false} onChange={checked => handleToggleActive(u, checked)} />
                      <button onClick={() => handleStartAssign(u.id)} style={{ color: '#fff', background: '#4f8cff', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.95em' }}>Assign Contractor</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === 'contractors' && (
            <>
              <button
                style={{ marginBottom: 18, background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                onClick={handleAdd}
              >
                Add Contractor
              </button>
              {showAdd && (
                <ContractorApplication onSubmit={handleSubmit} onCancel={handleCancel} />
              )}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.filter(u => u.role === 'contractor').length === 0 && <li style={{ color: '#64748b' }}>No contractors yet.</li>}
                {users.filter(u => u.role === 'contractor').map(u => (
                  <li
                    key={u.id}
                    onClick={() => handleEdit(u)}
                    style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', fontWeight: 500, color: u.active === false ? '#b91c1c' : '#222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span>{u.name}</span>
                    <ToggleSwitch checked={u.active !== false} onChange={checked => handleToggleActive(u, checked)} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === 'applicants' && (
            <div>
              <h3 style={{ color: '#1746a0', marginBottom: 18 }}>Employment Applications</h3>
              {applicants.length === 0 && <div style={{ color: '#64748b' }}>No applicants yet.</div>}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {applicants.map(app => (
                  <li key={app.id} style={{ background: '#f3f4f6', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 4px #0001', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div><b>Name:</b> {app.name}</div>
                    <div><b>Email:</b> {app.email}</div>
                    <div><b>Skills:</b> {app.skills}</div>
                    <div><b>Experience:</b> {app.experience || 'N/A'}</div>
                    <button onClick={() => handleHireApplicant(app)} style={{ marginTop: 10, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, alignSelf: 'flex-end' }}>Hire</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
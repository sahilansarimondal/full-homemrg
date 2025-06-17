import React, { useState } from 'react';
// import { useSchedules } from '../hooks/useSchedules';
// import { useModal } from '../components/ModalManager';

// For demo, use localStorage or a static list to simulate selected services
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Mock data for demo
const MOCK_SCHEDULE = [
  { name: 'Laundry Service (wash, dry, fold, iron)', frequency: 'Weekly', estimate: 60 },
  { name: 'Kitchen & Appliance Wipe-Down', frequency: 'Daily', estimate: 20 },
  { name: 'Grocery Shopping & Delivery (based on meal plan)', frequency: 'Weekly', estimate: 90 },
  { name: 'Closet Organization & Seasonal Swap', frequency: 'Quarterly', estimate: 120 },
  { name: 'Appointment Booking', frequency: 'Monthly', estimate: 15 },
  { name: 'Bill & Subscription Reminders', frequency: 'Monthly', estimate: 10 },
  { name: 'Party & Gathering Planning', frequency: 'Annually', estimate: 180 },
];

// Helper to get selected services from localStorage (simulate backend)
function getSelectedServices() {
  // This should match the structure in TasksPage.jsx
  const saved = window.localStorage.getItem('selectedServices');
  if (saved) return JSON.parse(saved);
  return [];
}

function AvailabilityModal({ open, onClose, schedule, onSave }) {
  const [days, setDays] = useState([]);
  const [start, setStart] = useState('08:00');
  const [end, setEnd] = useState('17:00');
  const [reqStart, setReqStart] = useState('09:00');
  const [reqEnd, setReqEnd] = useState('12:00');
  const [allowEntry, setAllowEntry] = useState(false);

  const handleDayToggle = (day) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleSave = () => {
    onSave({ days, start, end, reqStart, reqEnd, allowEntry });
    onClose();
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '2.2rem 2.5rem', minWidth: 370, maxWidth: 440, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563eb', marginBottom: 22, letterSpacing: '0.5px' }}>Set My Availability</h2>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#1746a0', fontSize: '1.05rem' }}>Available Days:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {DAYS.map(day => (
              <label key={day} style={{ fontWeight: 500, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: 3, minWidth: 100 }}>
                <input type="checkbox" checked={days.includes(day)} onChange={() => handleDayToggle(day)} /> {day}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#1746a0', fontSize: '1.01rem' }}>Available Start Time:</div>
              <input type="time" value={start} onChange={e => setStart(e.target.value)} style={{ padding: 5, borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#1746a0', fontSize: '1.01rem' }}>Available End Time:</div>
              <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={{ padding: 5, borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#1746a0', fontSize: '1.01rem' }}>Requested Start Time:</div>
              <input type="time" value={reqStart} onChange={e => setReqStart(e.target.value)} style={{ padding: 5, borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#1746a0', fontSize: '1.01rem' }}>Requested End Time:</div>
              <input type="time" value={reqEnd} onChange={e => setReqEnd(e.target.value)} style={{ padding: 5, borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: '#1746a0', fontSize: '1.05rem' }}>Requested Services:</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.99rem', color: '#222' }}>
            {schedule.map(s => <li key={s.name}>{s.name}</li>)}
          </ul>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={allowEntry} onChange={e => setAllowEntry(e.target.checked)} />
            Allow contractor to enter home without me present
          </label>
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 22px', borderRadius: 6, border: '1.5px solid #ccc', background: '#f3f4f6', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '8px 22px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function SchedulesPage() {
  // For demo, use mock data
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [availability, setAvailability] = useState(null);

  const handleChange = (idx, field, value) => {
    setSchedule(sch => sch.map((item, i) => i === idx ? { ...item, [field]: value } : item));
    setSaved(false);
  };

  const handleSave = () => {
    // TODO: Save schedule to backend
    setSaved(true);
  };

  if (!schedule.length) {
    return <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center', color: '#888' }}>No services selected. Please select services on the Manage Tasks page.</div>;
  }

  return (
    <div style={{ maxWidth: 700, margin: '1.5rem auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 10px rgba(25, 118, 210, 0.05)', padding: '1.5rem' }}>
      <AvailabilityModal open={modalOpen} onClose={() => setModalOpen(false)} schedule={schedule} onSave={setAvailability} />
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563eb', textAlign: 'center', marginBottom: 18 }}>Service Schedule</h1>
      <button
        onClick={() => setModalOpen(true)}
        style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 0', width: '100%', fontWeight: 700, fontSize: '1rem', marginBottom: 18, cursor: 'pointer', letterSpacing: '0.5px' }}
      >
        Set My Availability
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead>
          <tr style={{ background: '#f7f9fb' }}>
            <th style={{ textAlign: 'left', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Service</th>
            <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Frequency</th>
            <th style={{ textAlign: 'center', padding: '8px', fontWeight: 700, color: '#1746a0' }}>Time Estimate (min)</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, idx) => (
            <tr key={item.name} style={{ borderBottom: '1px solid #e3e8f0' }}>
              <td style={{ padding: '8px 6px', fontWeight: 500 }}>{item.name}</td>
              <td style={{ textAlign: 'center', padding: '8px 6px' }}>
                <select
                  value={item.frequency}
                  onChange={e => handleChange(idx, 'frequency', e.target.value)}
                  style={{ padding: '4px 8px', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }}
                >
                  <option value="">Select...</option>
                  {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </td>
              <td style={{ textAlign: 'center', padding: '8px 6px' }}>
                <input
                  type="number"
                  min="1"
                  value={item.estimate}
                  onChange={e => handleChange(idx, 'estimate', e.target.value)}
                  style={{ width: 60, padding: '4px 6px', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }}
                  placeholder="min"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', width: '100%', fontWeight: 700, fontSize: '1rem', marginTop: 18, cursor: 'pointer', letterSpacing: '0.5px' }}
      >
        Save Schedule
      </button>
      {saved && <div style={{ color: 'green', marginTop: 10, textAlign: 'center', fontSize: '0.98rem' }}>Your schedule has been saved!</div>}
    </div>
  );
}
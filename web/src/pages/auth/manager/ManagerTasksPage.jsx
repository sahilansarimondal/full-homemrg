import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import servicesCatalog from '../../../data/serviceCatalog.json';
import '../../../styles/SharedStyles.css';

// Mock users for demo (should be replaced with real data or context)
const MOCK_USERS = [
  { id: 'c1', name: 'Alex Contractor', role: 'contractor', active: true, services: ['Laundry Service (wash, dry, fold, iron)', 'Kitchen & Appliance Wipe-Down'] },
  { id: 'c2', name: 'Jamie Builder', role: 'contractor', active: false, services: ['Grocery Shopping & Delivery (based on meal plan)'] },
  { id: 'h1', name: 'Pat Homeowner', role: 'homeowner', active: true, services: ['Laundry Service (wash, dry, fold, iron)', 'Closet Organization & Seasonal Swap'] },
  { id: 'h2', name: 'Morgan Resident', role: 'homeowner', active: false, services: ['Kitchen & Appliance Wipe-Down'] },
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

export default function ManagerTasksPage() {
  const { user } = useAuth();
  const [activeServices, setActiveServices] = useState(() => {
    const all = {};
    servicesCatalog.forEach(item => { all[item.service] = true; });
    return all;
  });
  const [page, setPage] = useState(1);
  const [saveMsg, setSaveMsg] = useState('');
  const [userTasks, setUserTasks] = useState({});

  // Load all user tasks on component mount
  useEffect(() => {
    const loadUserTasks = () => {
      const homeownerTasks = JSON.parse(localStorage.getItem('hm_tasks_homeowner') || '{}');
      const contractorTasks = JSON.parse(localStorage.getItem('hm_tasks_contractor') || '{}');
      setUserTasks({ ...homeownerTasks, ...contractorTasks });
    };
    loadUserTasks();
  }, []);

  const SERVICES_PER_PAGE = 10;
  const allServices = servicesCatalog.map(item => item.service);
  const totalPages = Math.ceil(allServices.length / SERVICES_PER_PAGE);
  const pagedServices = allServices.slice((page - 1) * SERVICES_PER_PAGE, page * SERVICES_PER_PAGE);

  // Count users per service
  const getUserCount = (service) => {
    return Object.values(userTasks).filter(task => 
      task.selected && task.selected[service]
    ).length;
  };

  const handleToggle = (service) => {
    setActiveServices(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const handleSave = () => {
    // Save active services to localStorage
    localStorage.setItem('hm_active_services', JSON.stringify(activeServices));
    setSaveMsg('Changes saved!');
    setTimeout(() => setSaveMsg(''), 1800);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem 0', background: 'none', minHeight: 'unset', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 820, background: '#fff', borderRadius: 10, boxShadow: '0 2px 10px rgba(25, 118, 210, 0.05)', padding: '0.7rem 0.8rem 0.8rem 0.8rem', marginTop: 0, border: '1.5px solid #e3e8f0', position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}>
        {/* Save Button Top Right */}
        <div style={{ position: 'absolute', top: 16, right: 24, zIndex: 2 }}>
          <button onClick={handleSave} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', letterSpacing: '0.5px' }}>Save</button>
          {saveMsg && <div style={{ color: '#22c55e', fontWeight: 700, textAlign: 'right', marginTop: 6 }}>{saveMsg}</div>}
        </div>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: 10, color: '#2563eb', letterSpacing: '0.5px', textAlign: 'center', borderBottom: '1px solid #e3e8f0', paddingBottom: 4 }}>
          Manage Tasks & Services
        </h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, fontSize: '0.98rem' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ textAlign: 'left', padding: '6px 6px', fontWeight: 700, color: '#1746a0' }}>Service</th>
                <th style={{ textAlign: 'center', padding: '6px 6px', fontWeight: 700, color: '#1746a0' }}>Active</th>
                <th style={{ textAlign: 'center', padding: '6px 6px', fontWeight: 700, color: '#1746a0' }}># Users</th>
              </tr>
            </thead>
            <tbody>
              {pagedServices.map(service => (
                <tr key={service} style={{ borderBottom: '1px solid #e3e8f0' }}>
                  <td style={{ padding: '6px', color: '#1746a0' }}>{service}</td>
                  <td style={{ padding: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginRight: 8, color: activeServices[service] ? '#15803d' : '#b91c1c', fontWeight: 500, fontSize: '0.98em' }}>
                          {activeServices[service] ? 'Active' : 'Inactive'}
                        </span>
                        <span style={{ position: 'relative', width: 38, height: 22, display: 'inline-block' }}>
                          <input type="checkbox" checked={!!activeServices[service]} onChange={() => handleToggle(service)} style={{ opacity: 0, width: 0, height: 0 }} />
                          <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: activeServices[service] ? '#4ade80' : '#f87171',
                            borderRadius: 22,
                            transition: 'background 0.2s',
                          }} />
                          <span style={{
                            position: 'absolute',
                            left: activeServices[service] ? 18 : 2,
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
                  </td>
                  <td style={{ padding: '6px', textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{getUserCount(service)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Sticky Pagination Controls */}
        <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, background: '#fff', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, margin: '10px 0 0 0', borderTop: '1px solid #e3e8f0', padding: '10px 0 6px 0' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '4px 12px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === 1 ? '#e5e7eb' : '#2563eb', color: page === 1 ? '#64748b' : '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '4px 12px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === totalPages ? '#e5e7eb' : '#2563eb', color: page === totalPages ? '#64748b' : '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
      </div>
    </div>
  );
} 
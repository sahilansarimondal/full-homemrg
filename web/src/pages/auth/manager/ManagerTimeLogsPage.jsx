import React, { useState } from 'react';
import usersData from '../../../data/users.json';

// Mock time logs for demo
const MOCK_LOGS = [
  { id: 1, contractorId: 'olivia-thomas', start: '2025-06-10T08:00:00', end: '2025-06-10T12:00:00', hours: 4, status: 'submitted', homeownerIssue: null },
  { id: 2, contractorId: 'olivia-thomas', start: '2025-06-09T13:00:00', end: '2025-06-09T17:00:00', hours: 4, status: 'submitted', homeownerIssue: null },
  { id: 3, contractorId: 'james-reed', start: '2025-06-10T09:00:00', end: '2025-06-10T11:30:00', hours: 2.5, status: 'submitted', homeownerIssue: null },
  { id: 4, contractorId: 'maya-gonzalez', start: '2025-06-08T10:00:00', end: '2025-06-08T14:00:00', hours: 4, status: 'submitted', homeownerIssue: null },
  // Add more logs as needed
];

const CONTRACTORS_PER_PAGE = 6;

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export default function ManagerTimeLogsPage() {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [approved, setApproved] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [regionFilter, setRegionFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [page, setPage] = useState(1);

  // Get contractors with submitted logs
  const contractors = (usersData.contractors || []).filter(contractor =>
    logs.some(l => l.contractorId === contractor.id && l.status === 'submitted')
  );

  // Filters
  const regions = Array.from(new Set(contractors.map(c => c.region)));
  const filteredContractors = contractors.filter(c => {
    const regionMatch = !regionFilter || c.region === regionFilter;
    const nameMatch = !nameFilter || c.name.toLowerCase().includes(nameFilter.toLowerCase());
    return regionMatch && nameMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContractors.length / CONTRACTORS_PER_PAGE);
  const pagedContractors = filteredContractors.slice((page - 1) * CONTRACTORS_PER_PAGE, page * CONTRACTORS_PER_PAGE);

  // Reset to page 1 if filters change
  React.useEffect(() => { setPage(1); }, [regionFilter, nameFilter]);

  // Modal logic
  const openModal = (contractor) => {
    setSelectedContractor(contractor);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedContractor(null);
  };

  // Approve/request info logic
  const handleApprove = (logId) => {
    setLogs(prev => prev.map(l => l.id === logId ? { ...l, status: 'approved' } : l));
    setApproved(prev => [...prev, logId]);
  };
  const handleRequestInfo = (logId) => {
    alert('Request for more information sent to contractor (mock).');
  };

  // Get logs for selected contractor
  const selectedLogs = selectedContractor
    ? logs.filter(l => l.contractorId === selectedContractor.id && l.status === 'submitted')
    : [];

  return (
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '1rem 0' }}>
      <h1 style={{ textAlign: 'center', color: '#2563eb', fontWeight: 900, marginBottom: 30, fontSize: '2.2rem' }}>Contractor Time Log Approvals</h1>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24, justifyContent: 'center' }}>
        <div>
          <label style={{ fontWeight: 600, color: '#3b4252', marginRight: 8 }}>Region:</label>
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All</option>
            {regions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600, color: '#3b4252', marginRight: 8 }}>Contractor Name:</label>
          <input
            type="text"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            placeholder="Search by name"
            style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 180 }}
          />
        </div>
      </div>
      {/* Contractor Tiles Grid */}
      {pagedContractors.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888' }}>No contractors with submitted logs found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 32 }}>
          {pagedContractors.map(contractor => {
            const count = logs.filter(l => l.contractorId === contractor.id && l.status === 'submitted').length;
            return (
              <div
                key={contractor.id}
                style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 10px #2563eb11', padding: '1.2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.18s' }}
                onClick={() => openModal(contractor)}
              >
                {contractor.image && (
                  <img src={contractor.image} alt={contractor.name} style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb', marginBottom: 10 }} />
                )}
                <div style={{ fontWeight: 800, color: '#1746a0', fontSize: '1.13rem', marginBottom: 2 }}>{contractor.name}</div>
                <div style={{ color: '#64748b', fontWeight: 500, fontSize: '0.98rem', marginBottom: 6 }}>{contractor.title}</div>
                <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.05rem' }}>{count} submitted log{count !== 1 ? 's' : ''}</div>
              </div>
            );
          })}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, margin: '18px 0 32px 0' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 16px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === 1 ? '#e5e7eb' : '#2563eb', color: page === 1 ? '#64748b' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.08rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '6px 16px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === totalPages ? '#e5e7eb' : '#2563eb', color: page === totalPages ? '#64748b' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
      )}
      {/* Modal for contractor logs */}
      {modalOpen && selectedContractor && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '2.2rem 2.5rem', minWidth: 370, maxWidth: 540, boxShadow: '0 4px 24px rgba(0,0,0,0.13)', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: '1.5rem', color: '#2563eb', cursor: 'pointer' }}>&times;</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 10 }}>
              {selectedContractor.image && (
                <img src={selectedContractor.image} alt={selectedContractor.name} style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }} />
              )}
              <div>
                <div style={{ fontWeight: 800, color: '#1746a0', fontSize: '1.13rem' }}>{selectedContractor.name}</div>
                <div style={{ color: '#64748b', fontWeight: 500, fontSize: '0.98rem' }}>{selectedContractor.title} &mdash; {selectedContractor.region}</div>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 700, color: '#1746a0' }}>Start</th>
                  <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 700, color: '#1746a0' }}>End</th>
                  <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 700, color: '#1746a0' }}>Hours</th>
                  <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 700, color: '#1746a0' }}>Homeowner Issue</th>
                  <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 700, color: '#1746a0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #e3e8f0' }}>
                    <td style={{ padding: '8px 6px' }}>{formatTime(log.start)}</td>
                    <td style={{ padding: '8px 6px' }}>{formatTime(log.end)}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px' }}>{log.hours}</td>
                    <td style={{ textAlign: 'center', padding: '8px 6px', color: log.homeownerIssue ? '#b91c1c' : '#22c55e', fontWeight: 600 }}>
                      {log.homeownerIssue ? log.homeownerIssue : 'No issues'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px 6px' }}>
                      {log.status === 'approved' || approved.includes(log.id) ? (
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>Approved</span>
                      ) : (
                        <>
                          <button onClick={() => handleApprove(log.id)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 700, fontSize: '0.98rem', cursor: 'pointer', marginRight: 8 }}>Approve</button>
                          <button onClick={() => handleRequestInfo(log.id)} style={{ background: '#f59e42', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 700, fontSize: '0.98rem', cursor: 'pointer' }}>Request Info</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 
import React, { useEffect, useState } from 'react';
import contractorsData from '../../../data/users.json';
import '../../../styles/SharedStyles.css';

// Mock scheduled jobs for each contractor (in a real app, fetch from backend)
const MOCK_JOBS = {
  'olivia-thomas': [
    { service: 'Laundry Service (wash, dry, fold, iron)', frequency: 'Weekly', time: 'Mon 9:00am' },
    { service: 'Kitchen & Appliance Wipe-Down', frequency: 'Daily', time: 'Tue 2:00pm' },
  ],
  'james-reed': [
    { service: 'Grocery Shopping & Delivery (based on meal plan)', frequency: 'Weekly', time: 'Wed 11:00am' },
    { service: 'Closet Organization & Seasonal Swap', frequency: 'Quarterly', time: 'Fri 1:00pm' },
  ],
  'maya-gonzalez': [
    { service: 'Appointment Booking', frequency: 'Monthly', time: 'Thu 3:00pm' },
  ],
  // ...add more for each contractor as needed
};

const CONTRACTORS_PER_PAGE = 5;

export default function ManagerSchedulePage() {
  const [contractors, setContractors] = useState([]);
  const [page, setPage] = useState(1);
  const [regionFilter, setRegionFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  useEffect(() => {
    setContractors(contractorsData.contractors || []);
  }, []);

  // Get unique regions and services for filters
  const regions = Array.from(new Set((contractorsData.contractors || []).map(c => c.region)));
  const allServices = Array.from(new Set(Object.values(MOCK_JOBS).flat().map(j => j.service)));

  // Filter contractors
  const filteredContractors = contractors.filter(contractor => {
    const regionMatch = !regionFilter || contractor.region === regionFilter;
    const serviceMatch = !serviceFilter || (MOCK_JOBS[contractor.id] || []).some(j => j.service === serviceFilter);
    return regionMatch && serviceMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContractors.length / CONTRACTORS_PER_PAGE);
  const pagedContractors = filteredContractors.slice((page - 1) * CONTRACTORS_PER_PAGE, page * CONTRACTORS_PER_PAGE);

  // Reset to page 1 if filters change
  useEffect(() => { setPage(1); }, [regionFilter, serviceFilter]);

  return (
    <div className="page-wrapper" style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 0' }}>
      <style>{`
        .manager-schedule-heading {
          text-align: center;
          color: #1e3559;
          font-weight: 900;
          margin-bottom: 30px;
          font-size: 2.5rem;
          letter-spacing: 0.5px;
        }
        .manager-schedule-label {
          font-weight: 600;
          color: #3b4252;
          margin-right: 8px;
          font-size: 1.08rem;
        }
        .manager-schedule-contractor {
          margin: 0;
          color: #1e3559;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: 0.5px;
        }
        .manager-schedule-title {
          color: #6b7280;
          font-weight: 500;
          font-size: 1.08rem;
        }
        .manager-schedule-th {
          font-weight: 700;
          color: #2563eb;
          font-size: 1.08rem;
        }
      `}</style>
      <h1 className="manager-schedule-heading">Contractor Schedules</h1>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24, justifyContent: 'center' }}>
        <div>
          <label className="manager-schedule-label">Region:</label>
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All</option>
            {regions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>
        </div>
        <div>
          <label className="manager-schedule-label">Service:</label>
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All</option>
            {allServices.map(service => <option key={service} value={service}>{service}</option>)}
          </select>
        </div>
      </div>
      {pagedContractors.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888' }}>No contractors found.</div>
      ) : (
        pagedContractors.map(contractor => (
          <div key={contractor.id} className="section-card" style={{ marginBottom: 32, boxShadow: '0 2px 10px #2563eb11', borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 10 }}>
              {contractor.image && (
                <img src={contractor.image} alt={contractor.name} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }} />
              )}
              <div>
                <h2 className="manager-schedule-contractor">{contractor.name}</h2>
                <div className="manager-schedule-title">{contractor.title} &mdash; {contractor.region}</div>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th className="manager-schedule-th" style={{ textAlign: 'left', padding: '8px 6px' }}>Service</th>
                  <th className="manager-schedule-th" style={{ textAlign: 'center', padding: '8px 6px' }}>Frequency</th>
                  <th className="manager-schedule-th" style={{ textAlign: 'center', padding: '8px 6px' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {(MOCK_JOBS[contractor.id] || []).length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>No scheduled jobs.</td></tr>
                ) : (
                  MOCK_JOBS[contractor.id].map((job, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e3e8f0' }}>
                      <td style={{ padding: '8px 6px' }}>{job.service}</td>
                      <td style={{ textAlign: 'center', padding: '8px 6px' }}>{job.frequency}</td>
                      <td style={{ textAlign: 'center', padding: '8px 6px' }}>{job.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, margin: '18px 0 0 0' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 16px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === 1 ? '#e5e7eb' : '#2563eb', color: page === 1 ? '#64748b' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.08rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '6px 16px', borderRadius: 6, border: '1.5px solid #2563eb', background: page === totalPages ? '#e5e7eb' : '#2563eb', color: page === totalPages ? '#64748b' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
      )}
    </div>
  );
} 
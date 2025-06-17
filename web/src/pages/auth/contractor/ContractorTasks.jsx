import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

// Mock data for accepted jobs
const ACCEPTED_JOBS = [
  {
    id: 1,
    title: 'AC Tune-Up',
    homeowner: 'Pat Homeowner',
    address: '123 Main St',
    requestedTimes: ['2025-06-01 10:00am'],
    expectedHours: 2,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Deep Cleaning',
    homeowner: 'Alex Homeowner',
    address: '456 Oak Ave',
    requestedTimes: ['2025-06-03 2:00pm'],
    expectedHours: 3,
    status: 'Scheduled',
  },
];

// Mock data for jobs needing assignment (each job is a set of tasks)
const UNASSIGNED_JOBS = [
  {
    id: 3,
    title: 'Gutter Cleaning',
    homeowner: 'Morgan Homeowner',
    address: '789 Pine Rd',
    tasks: [
      {
        name: 'Clean front gutters',
        requestedTimes: ['2025-06-05 9:00am'],
        expectedHours: 0.75,
      },
      {
        name: 'Clean back gutters',
        requestedTimes: ['2025-06-05 1:00pm'],
        expectedHours: 0.75,
      },
    ],
    status: 'Unassigned',
  },
  {
    id: 4,
    title: 'Window Washing',
    homeowner: 'Pat Homeowner',
    address: '123 Main St',
    tasks: [
      {
        name: 'Wash downstairs windows',
        requestedTimes: ['2025-06-06 11:00am'],
        expectedHours: 1,
      },
      {
        name: 'Wash upstairs windows',
        requestedTimes: ['2025-06-06 1:00pm'],
        expectedHours: 1,
      },
    ],
    status: 'Unassigned',
  },
];

export default function ContractorTasks() {
  const { user } = useAuth();
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [unassignedJobs, setUnassignedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoRequest, setInfoRequest] = useState({ subject: '', message: '' });

  // Load jobs on component mount
  useEffect(() => {
    const loadJobs = () => {
      // Load accepted jobs from localStorage
      const savedAcceptedJobs = JSON.parse(localStorage.getItem(`hm_accepted_jobs_${user.email}`) || '[]');
      setAcceptedJobs(savedAcceptedJobs);

      // Load unassigned jobs from active services and homeowner tasks
      const activeServices = JSON.parse(localStorage.getItem('hm_active_services') || '{}');
      const homeownerTasks = JSON.parse(localStorage.getItem('hm_tasks_homeowner') || '{}');
      
      const unassigned = Object.entries(homeownerTasks).map(([email, tasks]) => {
        const selectedServices = Object.entries(tasks.selected || {})
          .filter(([service, isSelected]) => isSelected && activeServices[service])
          .map(([service]) => service);

        if (selectedServices.length > 0) {
          return {
            id: email,
            title: 'Home Services',
            homeowner: email,
            tasks: selectedServices.map(service => ({
              name: service,
              requestedTimes: tasks.frequencies?.[service] ? [tasks.frequencies[service]] : [],
              expectedHours: 2 // Default value, should come from service details
            })),
            status: 'Unassigned'
          };
        }
        return null;
      }).filter(Boolean);

      setUnassignedJobs(unassigned);
    };

    loadJobs();
  }, [user]);

  const handleAcceptJob = (job) => {
    // Add to accepted jobs
    const updatedAcceptedJobs = [...acceptedJobs, { ...job, status: 'Accepted' }];
    setAcceptedJobs(updatedAcceptedJobs);
    
    // Save to localStorage
    localStorage.setItem(`hm_accepted_jobs_${user.email}`, JSON.stringify(updatedAcceptedJobs));
    
    // Remove from unassigned jobs
    setUnassignedJobs(prev => prev.filter(j => j.id !== job.id));
    
    // Close all modals
    setSelectedJob(null);
    setShowInfoModal(false);
  };

  const handleRejectJob = (job) => {
    // Remove from unassigned jobs
    setUnassignedJobs(prev => prev.filter(j => j.id !== job.id));
    // Close all modals
    setSelectedJob(null);
    setShowInfoModal(false);
  };

  const handleRequestInfo = (job) => {
    setInfoRequest({
      subject: `Information Request: ${job.title}`,
      message: ''
    });
    setShowInfoModal(true);
  };

  const handleSubmitInfoRequest = (e) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log('Sending info request:', {
      jobId: selectedJob.id,
      ...infoRequest
    });
    setShowInfoModal(false);
    setSelectedJob(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1.2rem', background: '#fafdff', borderRadius: 14, boxShadow: '0 2px 12px #0001', position: 'relative' }}>
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1746a0', marginBottom: 18 }}>Contractor Tasks</h1>
      {/* Accepted Jobs */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.08rem', color: '#2563eb', fontWeight: 700, marginBottom: 10 }}>Accepted Jobs</h2>
        {acceptedJobs.length === 0 ? (
          <div style={{ color: '#888', fontSize: '0.98rem' }}>No accepted jobs yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px #2563eb11' }}>
            <thead>
              <tr style={{ background: '#e0e7ff', color: '#1746a0' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Job</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Homeowner</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Requested Time</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Expected Hours</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {acceptedJobs.map(job => (
                <tr key={job.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '7px 10px' }}>{job.title}</td>
                  <td style={{ padding: '7px 10px' }}>{job.homeowner}</td>
                  <td style={{ padding: '7px 10px' }}>
                    {Array.isArray(job.requestedTimes)
                      ? job.requestedTimes.join(', ')
                      : job.tasks && job.tasks.length > 0
                        ? (Array.isArray(job.tasks[0].requestedTimes) ? job.tasks[0].requestedTimes.join(', ') : '—')
                        : '—'}
                  </td>
                  <td style={{ padding: '7px 10px' }}>{job.expectedHours} hr{job.expectedHours !== 1 ? 's' : ''}</td>
                  <td style={{ padding: '7px 10px', color: job.status === 'Completed' ? '#22c55e' : '#2563eb', fontWeight: 600 }}>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* Jobs Needing Assignment */}
      <section>
        <h2 style={{ fontSize: '1.08rem', color: '#b91c1c', fontWeight: 700, marginBottom: 10 }}>Tasks</h2>
        {unassignedJobs.length === 0 ? (
          <div style={{ color: '#888', fontSize: '0.98rem' }}>No jobs needing assignment.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px #ef444411' }}>
            <thead>
              <tr style={{ background: '#fee2e2', color: '#b91c1c' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Job</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Homeowner</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}># of Tasks</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {unassignedJobs.map(job => (
                <tr key={job.id} style={{ borderBottom: '1px solid #fca5a5', cursor: 'pointer', background: selectedJob?.id === job.id ? '#fef3c7' : undefined }} onClick={() => setSelectedJob(job)} title="Click to review details">
                  <td style={{ padding: '7px 10px', color: '#1746a0', fontWeight: 600 }}>{job.title}</td>
                  <td style={{ padding: '7px 10px' }}>{job.homeowner}</td>
                  <td style={{ padding: '7px 10px' }}>{job.tasks.length}</td>
                  <td style={{ padding: '7px 10px', color: '#b91c1c', fontWeight: 600 }}>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* Info Request Modal */}
      {showInfoModal && selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.18)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 3rem', minWidth: 480, maxWidth: 580, position: 'relative' }}>
            <button onClick={() => setShowInfoModal(false)} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: '1.8rem', color: '#b91c1c', cursor: 'pointer' }} title="Close">×</button>
            <h3 style={{ fontSize: '1.3rem', color: '#2563eb', fontWeight: 800, marginBottom: 20 }}>Request Information</h3>
            <form onSubmit={handleSubmitInfoRequest}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#1746a0', fontWeight: 600 }}>Subject</label>
                <input
                  type="text"
                  value={infoRequest.subject}
                  onChange={e => setInfoRequest(prev => ({ ...prev, subject: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1.5px solid #e5e7eb', fontSize: '1rem' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#1746a0', fontWeight: 600 }}>Message</label>
                <textarea
                  value={infoRequest.message}
                  onChange={e => setInfoRequest(prev => ({ ...prev, message: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1.5px solid #e5e7eb', fontSize: '1rem', minHeight: 120, resize: 'vertical' }}
                  placeholder="Please provide any specific questions or information you need..."
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" onClick={() => setShowInfoModal(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f3f4f6', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Job Details Modal */}
      {selectedJob && !showInfoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedJob(null)}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 3rem', minWidth: 480, maxWidth: 580, position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: '1.8rem', color: '#b91c1c', cursor: 'pointer' }} title="Close">×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h3 style={{ fontSize: '1.3rem', color: '#b91c1c', fontWeight: 800, margin: 0 }}>{selectedJob.title}</h3>
              <button
                onClick={() => handleRequestInfo(selectedJob)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Request Information"
              >
                ℹ️
              </button>
            </div>
            <div style={{ fontSize: '1.1rem', color: '#1746a0', marginBottom: 8 }}>Homeowner: {selectedJob.homeowner}</div>
            <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: 14 }}>Zip Code: {selectedJob.zipCode}</div>
            <div style={{ fontWeight: 700, color: '#2563eb', marginBottom: 8, fontSize: '1.1rem' }}>Tasks:</div>
            <ul style={{ paddingLeft: 20, margin: 0, marginBottom: 16 }}>
              {selectedJob.tasks.map((task, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 600, color: '#1746a0', fontSize: '1.05rem' }}>{task.name}</div>
                  <div style={{ fontSize: '1rem', color: '#222' }}>Requested: {(Array.isArray(task.requestedTimes) ? task.requestedTimes : []).join(', ')}</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>Expected Hours: {task.expectedHours}</div>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
              <button onClick={() => handleRejectJob(selectedJob)} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f3f4f6', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Reject</button>
              <button onClick={() => handleRequestInfo(selectedJob)} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #2563eb', background: '#fff', color: '#2563eb', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Request Info</button>
              <button onClick={() => handleAcceptJob(selectedJob)} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
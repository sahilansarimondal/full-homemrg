import React, { useState } from 'react';
import usersData from '../../../data/users.json';

// Mock data for demo
const MOCK_INVOICES = [
  {
    id: 101,
    date: '2025-05-01',
    description: 'Monthly Home Management Fee',
    amount: 120.0,
    status: 'Paid',
    contractor: 'Acme Home Services',
    services: [
      { name: 'Laundry Service (wash, dry, fold, iron)', frequency: 'Weekly' },
      { name: 'Kitchen & Appliance Wipe-Down', frequency: 'Daily' },
    ],
  },
  {
    id: 102,
    date: '2025-04-01',
    description: 'Spring Cleaning Service',
    amount: 200.0,
    status: 'Unpaid',
    contractor: 'Sparkle Cleaners',
    services: [
      { name: 'Spring Cleaning', frequency: 'One-time' },
      { name: 'Gutter Cleaning', frequency: 'One-time' },
    ],
  },
  {
    id: 103,
    date: '2025-03-15',
    description: 'Gutter Cleaning',
    amount: 85.0,
    status: 'Paid',
    contractor: 'Sparkle Cleaners',
    services: [
      { name: 'Gutter Cleaning', frequency: 'One-time' },
    ],
  },
  {
    id: 104,
    date: '2025-02-28',
    description: 'HVAC Filter Replacement',
    amount: 45.0,
    status: 'Unpaid',
    contractor: 'Acme Home Services',
    services: [
      { name: 'HVAC Filter Replacement', frequency: 'Monthly' },
    ],
  },
];

function InvoiceModal({ open, invoice, onClose }) {
  if (!open || !invoice) return null;
  // Find customer info from users.json (mock: use first homeowner)
  let customer = null;
  if (invoice.customer) {
    customer = (usersData.homeowners || []).find(h => h.email === invoice.customer || h.id === invoice.customer);
  } else {
    customer = (usersData.homeowners || [])[0]; // fallback for demo
  }
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '2.2rem 2.5rem', minWidth: 370, maxWidth: 440, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2563eb', marginBottom: 18 }}>Invoice #{invoice.id}</h2>
        <div style={{ marginBottom: 10, color: '#444' }}><b>Date:</b> {invoice.date}</div>
        <div style={{ marginBottom: 10, color: '#444' }}><b>Contractor:</b> {invoice.contractor}</div>
        <div style={{ marginBottom: 10, color: '#444' }}><b>Description:</b> {invoice.description}</div>
        <div style={{ marginBottom: 16 }}>
          <b>Services Rendered:</b>
          <ul style={{ margin: '6px 0 0 18px', padding: 0, color: '#222', fontSize: '0.99rem' }}>
            {invoice.services.map((s, i) => (
              <li key={i}>{s.name} <span style={{ color: '#888', fontSize: '0.97rem' }}>({s.frequency})</span></li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 10, color: '#444' }}><b>Amount:</b> <span style={{ color: '#2563eb', fontWeight: 700 }}>${invoice.amount.toFixed(2)}</span></div>
        <div style={{ marginBottom: 18, color: invoice.status === 'Paid' ? 'green' : '#d97706', fontWeight: 700 }}>
          Status: {invoice.status}
        </div>
        {/* Customer Info */}
        {customer && (
          <div style={{ marginBottom: 18, background: '#f3f4f6', borderRadius: 8, padding: '10px 14px' }}>
            <b>Customer:</b> {customer.firstName} {customer.lastName}<br />
            <b>Email:</b> {customer.email}<br />
            <b>Address:</b> {customer.streetAddress}, {customer.city}, {customer.state} {customer.zipCode}
            <div style={{ marginTop: 10 }}>
              <a href={`mailto:${customer.email}`} style={{ background: '#2563eb', color: '#fff', borderRadius: 6, padding: '7px 18px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', display: 'inline-block' }}>Email Customer</a>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 22px', borderRadius: 6, border: '1.5px solid #ccc', background: '#f3f4f6', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function ManagerInvoicesPage() {
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [followingUp, setFollowingUp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleFollowUp = (id) => {
    setFollowingUp(id);
    setTimeout(() => {
      setFollowingUp(null);
      // Optionally, show a notification or update status
    }, 1000);
  };

  const handleRowClick = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  return (
    <div style={{ maxWidth: 900, margin: '2.5rem auto', background: 'none', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 700, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30, 64, 175, 0.10)', padding: '2.2rem 2.5rem 2.5rem 2.5rem', border: '1.5px solid #e3e8f0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#2563eb', textAlign: 'center', marginBottom: 28, letterSpacing: '-1px' }}>Invoices</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '1.08rem', background: '#fff', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '90px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '110px' }} />
              <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ textAlign: 'left', padding: '14px 10px', fontWeight: 800, color: '#1746a0', fontSize: '1.08rem', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Invoice #</th>
                <th style={{ textAlign: 'center', padding: '14px 10px', fontWeight: 800, color: '#1746a0', fontSize: '1.08rem', whiteSpace: 'nowrap' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '14px 10px', fontWeight: 800, color: '#1746a0', fontSize: '1.08rem', whiteSpace: 'nowrap' }}>Amount</th>
                <th style={{ textAlign: 'center', padding: '14px 10px', fontWeight: 800, color: '#1746a0', fontSize: '1.08rem', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '14px 10px', fontWeight: 800, fontSize: '1.08rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr
                  key={inv.id}
                  style={{ borderBottom: '1.5px solid #e3e8f0', cursor: 'pointer', background: selectedInvoice && selectedInvoice.id === inv.id ? '#e0e7ff' : 'inherit', transition: 'background 0.18s' }}
                  onClick={() => handleRowClick(inv)}
                  onMouseOver={e => e.currentTarget.style.background = '#f1f5fb'}
                  onMouseOut={e => e.currentTarget.style.background = selectedInvoice && selectedInvoice.id === inv.id ? '#e0e7ff' : '#fff'}
                >
                  <td style={{ padding: '14px 10px', fontWeight: 700, fontSize: '1.07rem', color: '#1746a0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inv.id}</td>
                  <td style={{ textAlign: 'center', padding: '14px 10px', color: '#334155', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inv.date}</td>
                  <td style={{ textAlign: 'right', padding: '14px 10px', color: '#2563eb', fontWeight: 800, fontSize: '1.09rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>${inv.amount.toFixed(2)}</td>
                  <td style={{ textAlign: 'center', padding: '14px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    <span style={{
                      color: inv.status === 'Paid' ? '#22c55e' : '#f59e42',
                      background: inv.status === 'Paid' ? '#e7fbe9' : '#fff7ed',
                      borderRadius: 8,
                      padding: '4px 14px',
                      fontWeight: 800,
                      fontSize: '1.01rem',
                      letterSpacing: '0.5px',
                      border: inv.status === 'Paid' ? '1.5px solid #22c55e' : '1.5px solid #f59e42',
                      display: 'inline-block',
                    }}>{inv.status}</span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '14px 10px' }} onClick={e => e.stopPropagation()}>
                    {inv.status === 'Unpaid' ? (
                      <button
                        onClick={() => handleFollowUp(inv.id)}
                        disabled={followingUp === inv.id}
                        style={{ background: '#e0e7ff', color: '#2563eb', border: 'none', borderRadius: 6, padding: '5px 14px', fontWeight: 500, fontSize: '0.98rem', cursor: followingUp === inv.id ? 'not-allowed' : 'pointer', opacity: followingUp === inv.id ? 0.7 : 1, boxShadow: 'none', letterSpacing: '0.2px', transition: 'background 0.15s' }}
                      >
                        {followingUp === inv.id ? 'Following Up...' : 'Follow Up'}
                      </button>
                    ) : inv.status === 'Paid' ? (
                      <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '1.3rem' }}>✓</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoices.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>No invoices to show.</div>}
      </div>
      <InvoiceModal open={modalOpen} invoice={selectedInvoice} onClose={() => setModalOpen(false)} />
    </div>
  );
} 
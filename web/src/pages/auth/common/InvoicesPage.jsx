import React, { useState } from 'react';

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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 22px', borderRadius: 6, border: '1.5px solid #ccc', background: '#f3f4f6', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function InvoicesPage({ isManager }) {
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
    <div style={{ maxWidth: 900, margin: '1.5rem auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 10px rgba(25, 118, 210, 0.05)', padding: '1.5rem' }}>
      <InvoiceModal open={modalOpen} invoice={selectedInvoice} onClose={() => setModalOpen(false)} />
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563eb', textAlign: 'center', marginBottom: 18 }}>Invoices</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
        <thead>
          <tr style={{ background: '#f7f9fb' }}>
            <th style={{ textAlign: 'left', padding: '6px 4px', fontWeight: 700, color: '#1746a0', whiteSpace: 'nowrap' }}>Invoice #</th>
            <th style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 700, color: '#1746a0', whiteSpace: 'nowrap' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '6px 4px', fontWeight: 700, color: '#1746a0', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>Description</th>
            <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 700, color: '#1746a0', whiteSpace: 'nowrap' }}>Amount</th>
            <th style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 700, color: '#1746a0', whiteSpace: 'nowrap' }}>Status</th>
            <th style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 700, whiteSpace: 'nowrap' }}></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr
              key={inv.id}
              style={{ borderBottom: '1px solid #e3e8f0', cursor: 'pointer', background: selectedInvoice && selectedInvoice.id === inv.id ? '#e3f0fc' : 'inherit', height: 44 }}
              onClick={() => handleRowClick(inv)}
            >
              <td style={{ padding: '6px 4px', fontWeight: 500, whiteSpace: 'nowrap' }}>{inv.id}</td>
              <td style={{ textAlign: 'center', padding: '6px 4px', whiteSpace: 'nowrap' }}>{inv.date}</td>
              <td style={{ padding: '6px 4px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.description}</td>
              <td style={{ textAlign: 'right', padding: '6px 4px', whiteSpace: 'nowrap' }}>${inv.amount.toFixed(2)}</td>
              <td style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 600, color: inv.status === 'Paid' ? 'green' : '#d97706', whiteSpace: 'nowrap' }}>{inv.status}</td>
              <td style={{ textAlign: 'center', padding: '6px 4px', whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                {inv.status === 'Unpaid' ? (
                  <button
                    onClick={() => handleFollowUp(inv.id)}
                    disabled={followingUp === inv.id}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 700, fontSize: '1rem', cursor: followingUp === inv.id ? 'not-allowed' : 'pointer', opacity: followingUp === inv.id ? 0.7 : 1 }}
                  >
                    {followingUp === inv.id ? 'Processing...' : 'Pay Now'}
                  </button>
                ) : inv.status === 'Paid' ? (
                  <span style={{ color: 'green', fontWeight: 700 }}>✓</span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {invoices.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>No invoices to show.</div>}
    </div>
  );
}
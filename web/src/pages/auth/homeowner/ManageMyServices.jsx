import React, { useState, useEffect } from 'react';
import servicesCatalog from '../../common/../../data/serviceCatalog.json';

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
const CATEGORIES_PER_PAGE = 3;

// Simulate loading/saving from backend or localStorage
function loadSelections() {
  const saved = window.localStorage.getItem('homeownerServices');
  return saved ? JSON.parse(saved) : {};
}
function saveSelections(selections) {
  window.localStorage.setItem('homeownerServices', JSON.stringify(selections));
}

export default function ManageMyServices() {
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [freqFilter, setFreqFilter] = useState('');
  const [page, setPage] = useState(1);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    const loaded = loadSelections();
    if (Object.keys(loaded).length > 0) {
      setSelections(loaded);
      setSubmitted(true);
    }
  }, []);

  const handleCheck = (service, checked) => {
    setSelections(prev => {
      const next = { ...prev };
      if (checked) {
        next[service] = next[service] || '';
      } else {
        delete next[service];
      }
      return next;
    });
  };

  const handleFreq = (service, freq) => {
    setSelections(prev => ({ ...prev, [service]: freq }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveSelections(selections);
    setSubmitted(true);
    setEditing(false);
  };

  const handleEdit = () => setEditing(true);

  // Filtering
  const filteredCatalog = servicesCatalog
    .map(cat => ({
      ...cat,
      services: cat.services.filter(service => {
        const matchesSearch = service.toLowerCase().includes(search.toLowerCase());
        const matchesFreq = !freqFilter || selections[service] === freqFilter;
        return matchesSearch && matchesFreq;
      })
    }))
    .filter(cat => cat.services.length > 0);

  // Pagination
  const totalPages = Math.ceil(filteredCatalog.length / CATEGORIES_PER_PAGE) || 1;
  const pagedCatalog = filteredCatalog.slice((page - 1) * CATEGORIES_PER_PAGE, page * CATEGORIES_PER_PAGE);

  // Category dropdowns
  const toggleCategory = (category) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 10px #2563eb22', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#2563eb', margin: 0 }}>Manage My Services</h1>
        {(!submitted || editing) && (
          <button type="submit" form="manage-services-form" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 38px', fontWeight: 800, fontSize: '1.08rem', cursor: 'pointer', marginLeft: 16 }}>
            {submitted ? 'Save Changes' : 'Submit Services'}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ flex: 2, minWidth: 180, padding: '7px 12px', borderRadius: 7, border: '1.5px solid #e3e8f0', fontSize: '1rem' }}
        />
        <select
          value={freqFilter}
          onChange={e => { setFreqFilter(e.target.value); setPage(1); }}
          style={{ flex: 1, minWidth: 140, padding: '7px 12px', borderRadius: 7, border: '1.5px solid #e3e8f0', fontSize: '1rem' }}
        >
          <option value="">All Frequencies</option>
          {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <form id="manage-services-form" onSubmit={handleSubmit}>
        {pagedCatalog.map(({ category, services }) => (
          <div key={category} style={{ marginBottom: 24, borderBottom: '1px solid #e3e8f0', paddingBottom: 10 }}>
            <button
              type="button"
              onClick={() => toggleCategory(category)}
              style={{ background: 'none', border: 'none', color: '#1746a0', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>{openCategories[category] !== false ? '▼' : '▶'}</span> {category}
            </button>
            {openCategories[category] !== false && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {services.map(service => (
                  <li key={service} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <input
                      type="checkbox"
                      checked={!!selections[service]}
                      disabled={submitted && !editing}
                      onChange={e => handleCheck(service, e.target.checked)}
                      id={service}
                    />
                    <label htmlFor={service} style={{ flex: 1, fontWeight: 500, minWidth: 180 }}>{service}</label>
                    {selections[service] !== undefined && (
                      <select
                        value={selections[service] || ''}
                        onChange={e => handleFreq(service, e.target.value)}
                        disabled={submitted && !editing}
                        style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', minWidth: 120 }}
                        required
                      >
                        <option value="">Select frequency...</option>
                        {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '18px 0' }}>
          <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 18px', borderRadius: 7, border: '1.5px solid #e3e8f0', background: page === 1 ? '#f3f4f6' : '#2563eb', color: page === 1 ? '#888' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ alignSelf: 'center', fontWeight: 600, color: '#2563eb' }}>Page {page} of {totalPages}</span>
          <button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '6px 18px', borderRadius: 7, border: '1.5px solid #e3e8f0', background: page === totalPages ? '#f3f4f6' : '#2563eb', color: page === totalPages ? '#888' : '#fff', fontWeight: 700, fontSize: '1rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
        {submitted && !editing && (
          <button type="button" onClick={handleEdit} style={{ background: '#e5e7eb', color: '#1746a0', border: 'none', borderRadius: 7, padding: '8px 28px', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', marginLeft: 16 }}>
            Edit My Services
          </button>
        )}
        {submitted && !editing && <div style={{ color: 'green', marginTop: 16, fontWeight: 600 }}>Your services have been saved!</div>}
      </form>
    </div>
  );
} 
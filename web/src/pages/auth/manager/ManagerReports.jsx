import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/SharedStyles.css';


export default function Reports() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('month'); // month, quarter, year
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data for reports
  const reportData = {
    overview: {
      totalRevenue: 125000,
      activeContracts: 45,
      completionRate: 92,
      customerSatisfaction: 4.7,
      topServices: [
        { name: 'Plumbing', count: 28, revenue: 42000 },
        { name: 'Electrical', count: 22, revenue: 33000 },
        { name: 'HVAC', count: 18, revenue: 27000 },
      ],
      recentTrends: [
        { month: 'Jan', revenue: 35000, jobs: 15 },
        { month: 'Feb', revenue: 42000, jobs: 18 },
        { month: 'Mar', revenue: 48000, jobs: 22 },
      ]
    }
  };

  const reports = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'revenue', name: 'Revenue Analysis', icon: '💰' },
    { id: 'performance', name: 'Performance Metrics', icon: '📈' },
    { id: 'contractors', name: 'Contractor Performance', icon: '👷' },
    { id: 'services', name: 'Service Analysis', icon: '🔧' },
    { id: 'satisfaction', name: 'Customer Satisfaction', icon: '😊' }
  ];

  return (
    <div className="dashboard-tiles vertical" style={{ gap: '1.2rem', maxWidth: 1200, minHeight: 'auto', padding: '1.2rem' }}>
      {/* Header */}
      <div className="tile" style={{ padding: '1.5rem', background: '#fff', borderRadius: 12, boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
        <h1 style={{ fontSize: '1.7rem', margin: 0, fontWeight: 700, color: '#222' }}>Reports & Analytics</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>View and analyze your business performance</p>
      </div>

      {/* Report Selection and Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Report Type Selection */}
        <div className="tile" style={{ flex: 1, minWidth: 300, padding: '1.5rem', background: '#fff', borderRadius: 12, boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: '#1746a0' }}>Select Report</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {reports.map(report => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                style={{
                  padding: '0.75rem',
                  background: selectedReport === report.id ? '#1746a0' : '#f8fafc',
                  color: selectedReport === report.id ? '#fff' : '#1746a0',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <span>{report.icon}</span>
                <span>{report.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="tile" style={{ width: 200, padding: '1.5rem', background: '#fff', borderRadius: 12, boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: '#1746a0' }}>Date Range</h3>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              background: '#f8fafc',
              color: '#1746a0'
            }}
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Report Content */}
      <div className="tile" style={{ padding: '1.5rem', background: '#fff', borderRadius: 12, boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
        {selectedReport === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Total Revenue</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1746a0' }}>${reportData.overview.totalRevenue.toLocaleString()}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Active Contracts</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1746a0' }}>{reportData.overview.activeContracts}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Completion Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1746a0' }}>{reportData.overview.completionRate}%</div>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Customer Satisfaction</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1746a0' }}>{reportData.overview.customerSatisfaction}/5</div>
              </div>
            </div>

            {/* Top Services */}
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: '#1746a0' }}>Top Services</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {reportData.overview.topServices.map((service, index) => (
                  <div key={index} style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1746a0' }}>{service.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <span style={{ color: '#64748b' }}>{service.count} jobs</span>
                      <span style={{ color: '#1746a0', fontWeight: 500 }}>${service.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Trends */}
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: '#1746a0' }}>Recent Trends</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {reportData.overview.recentTrends.map((trend, index) => (
                  <div key={index} style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1746a0' }}>{trend.month}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Revenue:</span>
                        <span style={{ color: '#1746a0', fontWeight: 500 }}>${trend.revenue.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Jobs:</span>
                        <span style={{ color: '#1746a0', fontWeight: 500 }}>{trend.jobs}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
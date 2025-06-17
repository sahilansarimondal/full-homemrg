// src/pages/MockLoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/SharedStyles.css';

export default function MockLoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { role: 'homeowner', name: 'Holly Homeowner', email: 'homeowner@demo.com' },
    { role: 'contractor', name: 'Bob Contractor', email: 'contractor@demo.com' },
    { role: 'manager', name: 'Megan Manager', email: 'manager@demo.com' },
  ];

  const handleMockLogin = (role) => {
    const user = roles.find(r => r.role === role);
    setUser(user);
    
    // Navigate based on role
    if (role === 'homeowner') {
      navigate('/dashboard', { replace: true });
    } else if (role === 'contractor') {
      navigate('/dashboard/contractor', { replace: true });
    } else if (role === 'manager') {
      navigate('/dashboard/manager', { replace: true });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f4f6f8',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#1a1a1a'
        }}>
          Mock Login
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => handleMockLogin(r.role)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#1d4ed8',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Log in as {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

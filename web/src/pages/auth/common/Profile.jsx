import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/SharedStyles.css';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    specialties: []
  });

  useEffect(() => {
    if (user) {
      // Load user data from localStorage
      const userData = JSON.parse(localStorage.getItem(`hm_user_data_${user.email}`) || '{}');
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || '',
        specialties: userData.specialties || []
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialtyChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      specialties: value.split(',').map(s => s.trim()).filter(Boolean)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user data in localStorage
    localStorage.setItem(`hm_user_data_${user.email}`, JSON.stringify({
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
      specialties: formData.specialties
    }));

    // Update user in AuthContext
    setUser({
      ...user,
      name: formData.name
    });

    setIsEditing(false);
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1.5rem' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e3a8a' }}>Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              background: isEditing ? '#e5e7eb' : '#2563eb',
              color: isEditing ? '#374151' : '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  background: '#f3f4f6'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>

            {user.role === 'contractor' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Specialties (comma-separated)</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties.join(', ')}
                  onChange={handleSpecialtyChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Name</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280' }}>{formData.name}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Email</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280' }}>{formData.email}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Phone</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280' }}>{formData.phone || 'Not provided'}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Address</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280' }}>{formData.address || 'Not provided'}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Bio</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280' }}>{formData.bio || 'No bio provided'}</p>
            </div>

            {user.role === 'contractor' && formData.specialties.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Specialties</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#e0e7ff',
                        color: '#1e3a8a',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 9999,
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
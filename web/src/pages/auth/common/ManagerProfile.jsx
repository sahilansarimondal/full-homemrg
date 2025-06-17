import React from 'react';
import { useParams } from 'react-router-dom';
import users from '../../../data/users.json';

function ManagerProfile() {
  const { id } = useParams();
  const manager = users.contractors.find(m => m.id === id);

  if (!manager) {
    return <div>Manager not found</div>;
  }

  return (
    <div className="manager-profile">
      <div className="profile-header">
        <img src={manager.image} alt={manager.name} className="profile-image" />
        <div className="profile-info">
          <h1>{manager.name}</h1>
          <p className="title">{manager.title}</p>
          <p className="region">{manager.region}</p>
        </div>
      </div>
      <div className="profile-content">
        <section className="bio-section">
          <h2>About</h2>
          <p>{manager.bio}</p>
        </section>
        <section className="specialties-section">
          <h2>Specialties</h2>
          <div className="specialties-list">
            {manager.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">{specialty}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManagerProfile;

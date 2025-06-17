import React from 'react';
import { Link } from 'react-router-dom';

const ManagerCard = ({ manager, detailed }) => {
  return (
    <>
      <style>{`
        .manager-card {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.06);
          text-align: center;
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .manager-card:hover {
          transform: translateY(-5px);
        }
        
        .manager-card img {
          width: 100%;
          max-width: 160px;
          border-radius: 50%;
          margin-bottom: 1rem;
          object-fit: cover;
        }
        
        .manager-card h3 {
          margin: 0.5rem 0 0.25rem;
          font-size: 1.25rem;
          color: #1E3A8A;
        }
        
        .manager-card .title {
          font-weight: 600;
          font-size: 1rem;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        
        .manager-card .region {
          font-size: 0.95rem;
          color: #6B7280;
          margin-bottom: 1rem;
        }
        
        .manager-card .bio {
          font-size: 0.95rem;
          color: #444;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .manager-card .specialties {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .manager-card .specialty-tag {
          background-color: #EFF6FF;
          color: #1E40AF;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .manager-card .card-link {
          display: inline-block;
          margin-top: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          color: #1E3A8A;
          transition: color 0.2s ease;
        }
        
        .manager-card .card-link:hover {
          color: #FCA5A5;
        }

        .manager-card-detailed {
          background-color: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.06);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .manager-card-detailed img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.5rem;
        }
      `}</style>
      <div className={detailed ? "manager-card-detailed" : "manager-card"}>
        <img
          src={manager.image}
          alt={manager.name}
        />
        <h3>{manager.name}</h3>
        <p className="title">{manager.title}</p>
        <p className="region">{manager.region || manager.location}</p>
        <p className="bio">{manager.bio || manager.about}</p>
        {manager.specialties && manager.specialties.length > 0 && (
          <div className="specialties">
            {manager.specialties.map((tag, idx) => (
              <span key={idx} className="specialty-tag">{tag}</span>
            ))}
          </div>
        )}
        {detailed ? (
          <Link to="/managers" className="card-link">← Back to Managers</Link>
        ) : (
          <Link
            to={`/managers/${manager.slug}`}
            className="card-link"
          >
            View Profile →
          </Link>
        )}
      </div>
    </>
  );
};

export default ManagerCard;

import React from 'react';
import '../../styles/SharedStyles.css';
import openPositions from '../../data/openPositions.json';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const featureTiles = [
  {
    img: '/images/Common/make_an_impact.jpg',
    title: 'Make an Impact',
    desc: "See your work make a daily difference in people's lives."
  },
  {
    img: '/images/Common/career_growth.jpg',
    title: 'Career Growth',
    desc: 'Training, mentorship, and advancement opportunities.'
  },
  {
    img: '/images/Common/flexible_scheduling.jpg',
    title: 'Flexible Scheduling',
    desc: 'Work on your terms while supporting others.'
  }
];

const CareersPage = () => {
  return (
    <>
      <style>{`
        .careers-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: #1e3a8a;
          border-radius: 2.2rem;
          box-shadow: 0 8px 32px 0 rgba(30, 58, 138, 0.10);
        }
        .growth-section {
          text-align: center;
          padding: 2rem 1rem 1.5rem 1rem;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(30, 58, 138, 0.08);
        }
        .growth-section h1 {
          font-size: 2.2rem;
          margin-bottom: 1rem;
          color: #1e3a8a;
        }
        .growth-section p {
          color: #334155;
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 0;
        }
        .feature-tiles-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem auto 2rem auto;
          max-width: 1000px;
          padding: 0 1rem;
        }
        .feature-tile {
          background: #f8fafc;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(30,58,138,0.06);
          padding: 1.2rem 1rem 1.5rem 1rem;
          text-align: center;
          max-width: 260px;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .feature-tile img {
          width: 100%;
          max-width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        .feature-tile h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #1e3a8a;
        }
        .feature-tile p {
          color: #444;
          font-size: 0.97rem;
        }
        .open-positions {
          background: #fff;
          padding: 2rem 1rem 2.5rem 1rem;
          text-align: center;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(30, 58, 138, 0.08);
          max-width: 1000px;
          margin: 2rem auto 0 auto;
        }
        .open-positions h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #1e3a8a;
        }
        .positions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }
        .job-card {
          background-color: #f8fafc;
          border: 2px solid #38bdf8;
          padding: 2rem;
          border-radius: 10px;
          width: 300px;
          text-align: left;
          box-shadow: 0 2px 8px rgba(30, 58, 138, 0.07);
          transition: box-shadow 0.18s, border-color 0.18s;
        }
        .job-card:hover {
          border-color: #0ea5e9;
          box-shadow: 0 8px 32px rgba(30,58,138,0.18);
        }
        .job-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #1e3a8a;
        }
        .job-card .location {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }
        .job-card .description {
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
          color: #444;
        }
        .view-button {
          display: inline-block;
          background-color: #1e3a8a;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.2s;
        }
        .view-button:hover {
          background: #143087;
        }
        @media (max-width: 900px) {
          .feature-tiles-row {
            flex-direction: column;
            gap: 1.5rem;
            max-width: 400px;
            align-items: center;
          }
          .feature-tile {
            max-width: 100%;
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .careers-page {
            padding: 1rem;
          }
          .growth-section, .open-positions {
            padding: 1.2rem 0.7rem;
          }
        }
      `}</style>
      <div className="careers-page">
        {/* Intro Section */}
        <section className="growth-section">
          <h1>Build a Career Helping Families Thrive</h1>
          <p>
            Join a team dedicated to helping people bring structure, calm, and confidence into their home lives.
            We're looking for empathetic, organized, and motivated individuals who want to make a difference.
          </p>
        </section>

        {/* Feature Tiles Section */}
        <section className="feature-tiles-row">
          {featureTiles.map((tile, idx) => (
            <div className="feature-tile" key={idx}>
              <img src={tile.img} alt={tile.title} />
              <h4>{tile.title}</h4>
              <p>{tile.desc}</p>
            </div>
          ))}
        </section>

        {/* Open Positions */}
        <section className="open-positions">
          <h2>Open Positions</h2>
          <div className="positions-grid">
            {openPositions.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p className="location">{job.location}</p>
                <p className="description">{job.shortDescription}</p>
                <Link to={`/careers/${job.id}`} className="view-button">
                  View Job
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
      
    </>
  );
};

export default CareersPage;

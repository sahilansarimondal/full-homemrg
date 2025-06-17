import React, { useState } from 'react';
import '../../styles/SharedStyles.css';
import ManagerCard from '../../components/ManagerCard';
import users from '../../data/users.json';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const slugify = (name) => name.toLowerCase().replace(/\s+/g, '-');
const ITEMS_PER_PAGE = 8;

const MeetOurManagers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLetter, setFilterLetter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  const managers = users.contractors; // Using contractors array as our managers

  const filtered = managers.filter((manager) => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = filterLetter
      ? manager.name[0].toUpperCase() === filterLetter
      : true;
    return matchesSearch && matchesLetter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentManagers = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .meet-our-coaches-page {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .coach-search-controls {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .coach-search-controls input {
          padding: 0.6rem 1rem;
          width: 300px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .alphabet-filter {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1rem;
          gap: 0.5rem;
        }

        .alphabet-filter button {
          padding: 0.4rem 0.75rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: white;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
        }

        .alphabet-filter button.active {
          background-color: #0077b6;
          color: white;
          border-color: #0077b6;
        }

        .coach-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.5rem 2.5rem;
          align-items: stretch;
          grid-auto-rows: 1fr;
          margin-bottom: 2.5rem;
        }

        .coach-profile-card {
          background: #fff;
          border-radius: 1.2rem;
          box-shadow: 0 4px 16px rgba(30,58,138,0.08);
          padding: 2rem 1.2rem 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 420px;
          max-width: 340px;
          margin: 0 auto;
          transition: box-shadow 0.18s, transform 0.18s;
          overflow: hidden;
        }

        .coach-profile-card:hover {
          box-shadow: 0 8px 32px rgba(30,58,138,0.13);
          transform: translateY(-4px) scale(1.03);
        }

        .coach-profile-card img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 1rem;
          background: #f3f4f6;
          box-shadow: 0 2px 8px rgba(30,58,138,0.07);
          flex-shrink: 0;
        }

        .coach-card-content {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          overflow: hidden;
        }

        .coach-profile-card h3 {
          font-size: 1.18rem;
          font-weight: 700;
          color: #1E3A8A;
          margin: 0.5rem 0 0.2rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .coach-region {
          font-style: italic;
          color: #666;
          margin-bottom: 0.3rem;
          font-size: 0.98rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .coach-about {
          font-size: 0.97rem;
          color: #374151;
          margin-bottom: 0.7rem;
          line-height: 1.4;
          max-height: 2.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .coach-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
          justify-content: center;
          width: 100%;
        }

        .tag {
          background: #e0f4ff;
          color: #0077b6;
          padding: 0.32rem 0.8rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 500;
          margin-bottom: 0.2rem;
          white-space: nowrap;
        }

        .view-button, .coach-profile-card a[href*="/managers/"] {
          display: inline-block;
          background-color: #1E3A8A;
          color: white;
          padding: 0.55rem 1.2rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: auto;
          align-self: center;
          font-size: 1rem;
          transition: background 0.18s, color 0.18s;
          box-shadow: 0 2px 8px rgba(30,58,138,0.07);
        }

        .view-button:hover, .coach-profile-card a[href*="/managers/"]:hover {
          background: #0b66ff;
          color: #fff;
        }

        @media (max-width: 900px) {
          .coach-profile-card {
            height: 340px;
            padding: 1.2rem 0.7rem 1rem 0.7rem;
            max-width: 100%;
          }
          .coach-profile-card img {
            height: 72px;
            width: 72px;
          }
        }

        @media (max-width: 600px) {
          .coach-list {
            gap: 1rem;
          }
          .coach-profile-card {
            height: 260px;
            padding: 0.7rem 0.2rem 0.7rem 0.2rem;
            max-width: 100%;
          }
          .coach-profile-card img {
            height: 56px;
            width: 56px;
          }
        }

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          margin-top: 2.5rem;
        }

        .pagination-controls button {
          padding: 0.6rem 1.3rem;
          font-size: 1.05rem;
          border: none;
          background-color: #1E3A8A;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.18s;
        }

        .pagination-controls button:disabled {
          background-color: #bfc5ce;
          color: #fff;
          cursor: not-allowed;
        }

        .pagination-controls span {
          font-size: 1.08rem;
          color: #1E3A8A;
          font-weight: 500;
        }
      `}</style>
      <div className="meet-our-coaches-page">
        <h2 className="page-title">Meet Our Managers</h2>

        <div className="coach-search-controls">
          <input
            type="text"
            placeholder="Search by name, region, or specialty..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <div className="alphabet-filter">
            {alphabet.map((letter) => (
              <button
                key={letter}
                className={filterLetter === letter ? 'active' : ''}
                onClick={() => { setFilterLetter(letter === filterLetter ? '' : letter); setCurrentPage(1); }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="coach-list">
          {currentManagers.length === 0 ? (
            <p>No managers found.</p>
          ) : (
            currentManagers.map((manager) => (
              <ManagerCard key={manager.id} manager={{
                ...manager,
                slug: manager.id // use id as slug for /managers/:id
              }} />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MeetOurManagers;
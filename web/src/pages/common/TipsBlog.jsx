import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SharedStyles.css';
import SearchBar from '../../components/SearchBar';
import FeaturedArticlesCarousel from '../../components/FeaturedArticlesCarousel';
import CTA from '../../components/CTA';
import blogCategories from '../../data/blogCategories.json';
import featuredArticles from '../../data/featuredArticles.json';

const getUnsplashUrl = (category) =>
  `https://source.unsplash.com/600x400/?${encodeURIComponent(category.split(' ')[0])},home`;

const TipsBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCategories = blogCategories.filter((category) => {
    return category.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <>
      <style>{`
        .tips-blog-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: #1e3a8a;
          border-radius: 2.2rem;
          box-shadow: 0 8px 32px 0 rgba(30, 58, 138, 0.10);
        }
        .tips-blog-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(30, 58, 138, 0.08);
          padding: 2.5rem 2.5rem 2.5rem 2.5rem;
          max-width: 900px;
          margin: 2rem auto;
        }
        .page-title {
          font-size: 2.5rem;
          color: #1E3A8A;
          font-weight: 800;
          text-align: center;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        .page-intro {
          text-align: center;
          color: #4B5563;
          font-size: 1.18rem;
          margin-bottom: 2.2rem;
        }
        .search-bar {
          max-width: 500px;
          margin: 0 auto 2rem auto;
        }
        .featured-articles-carousel {
          margin-bottom: 2.2rem;
          padding: 0;
          background: none;
          border-radius: 0;
          border: none;
        }
        .category-tiles-section h2 {
          color: #1E3A8A;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
          text-align: center;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .category-card {
          background: linear-gradient(120deg, #F8FAFC 60%, #E2E8F0 100%);
          border-radius: 1.5rem;
          box-shadow: 0 4px 16px rgba(30, 58, 138, 0.07);
          border: 1.5px solid #CBD5E1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          text-decoration: none;
          transition: box-shadow 0.18s, transform 0.18s;
          min-height: 340px;
          padding: 1.5rem;
        }
        .category-card:hover {
          box-shadow: 0 8px 32px rgba(30, 58, 138, 0.13);
          transform: translateY(-4px) scale(1.03);
          border-color: #1E3A8A;
        }
        .category-card-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
        }
        .category-title {
          color: #1E3A8A;
          font-size: 1.35rem;
          font-weight: 700;
          margin: 1.2rem 1rem 0.5rem 1rem;
          text-align: left;
        }
        .category-description {
          color: #4B5563;
          font-size: 1.08rem;
          margin: 0 1rem 1.2rem 1rem;
          text-align: left;
        }
        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          margin: 2rem 0 1.2rem 0;
        }
        .pagination-controls button {
          background: linear-gradient(90deg, #1E3A8A 60%, #3B82F6 100%);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          border: none;
          font-size: 1.08rem;
          padding: 0.7rem 1.7rem;
          box-shadow: 0 2px 8px rgba(30, 58, 138, 0.15);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .pagination-controls button:disabled {
          background: #CBD5E1;
          color: #fff;
          opacity: 0.7;
          cursor: not-allowed;
        }
        .cta-wrapper {
          margin-top: 3rem;
          background-color: #F8FAFC;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
          font-size: 1.1rem;
          border: 1px solid #E2E8F0;
        }
        @media (max-width: 900px) {
          .category-grid {
            gap: 1.2rem;
          }
          .category-card {
            min-height: 260px;
          }
        }
        @media (max-width: 768px) {
          .tips-blog-page {
            padding: 1rem;
          }
          .tips-blog-card {
            padding: 1.2rem 0.7rem;
          }
        }
      `}</style>
      <div className="tips-blog-page">
        <div className="tips-blog-card">
          <h1 className="page-title">Tips & Blog</h1>
          <p className="page-intro">
            Discover practical home hacks, lifestyle inspiration, and success stories from our community.
          </p>
          <div className="search-bar">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
        </div>
        <div className="tips-blog-card">
          <h2 style={{ color: '#1E3A8A', fontSize: '2rem', fontWeight: 800, marginBottom: '1.2rem', textAlign: 'center' }}>Featured Articles</h2>
          <FeaturedArticlesCarousel />
        </div>
        <div className="tips-blog-card">
          <div className="category-tiles-section">
            <h2>Explore Topics</h2>
            <div className="category-grid">
              {currentCategories.map((cat, idx) => (
                <Link to={`/tips-blog/${cat.slug}`} className="category-card" key={idx}>
                  <img
                    src={cat.image}
                    alt={cat.category}
                    className="category-card-img"
                  />
                  <h3 className="category-title">{cat.category}</h3>
                  <p className="category-description">{cat.description}</p>
                </Link>
              ))}
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="tips-blog-card">
          <div className="cta-wrapper">
            <CTA />
          </div>
        </div>
      </div>
    </>
  );
};

export default TipsBlog;

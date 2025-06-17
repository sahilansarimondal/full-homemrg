import React, { useState, useEffect } from 'react';
import featuredArticles from '../data/featuredArticles.json';

const FeaturedArticlesCarousel = () => {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % featuredArticles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setIndex(prev => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  const goNext = () => {
    setIndex(prev => (prev + 1) % featuredArticles.length);
  };

  const article = featuredArticles[index];

  return (
    <>
      <style>{`
        .featured-carousel.feminine-featured-carousel {
          background: linear-gradient(120deg, #F9E5EA 60%, #E6E6FA 100%);
          padding: 2.2rem 1.2rem 1.2rem 1.2rem;
          border-radius: 2.2rem;
          position: relative;
          text-align: center;
          box-shadow: 0 8px 32px 0 rgba(255, 111, 97, 0.10), 0 0 0 8px #FFDFAF33;
          border: 1.5px solid #FFDFAF66;
          margin: 1.2rem auto 0.7rem auto;
          max-width: 1100px;
        }

        .carousel-content {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .featured-article-img {
          width: 320px;
          border-radius: 2rem;
          box-shadow: 0 4px 24px rgba(255, 111, 97, 0.13), 0 2px 16px rgba(230, 230, 250, 0.13);
          border: 5px solid #fff;
          background: #fff;
        }

        .carousel-text {
          max-width: 420px;
          text-align: left;
          margin: 0 auto;
        }

        .carousel-text h3 {
          margin: 0 0 0.7rem 0;
          font-size: 1.7rem;
          color: #2D2A32;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .carousel-text p {
          color: #6B4F5A;
          font-size: 1.13rem;
          margin-bottom: 1.2rem;
        }

        .read-more-btn {
          display: inline-block;
          background: linear-gradient(90deg, #FF6F61 60%, #FFDFAF 100%);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          border: none;
          font-size: 1.08rem;
          padding: 0.85rem 2.2rem;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(255, 111, 97, 0.10);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .read-more-btn:hover {
          background: linear-gradient(90deg, #FFDFAF 60%, #FF6F61 100%);
          color: #2D2A32;
        }

        .carousel-controls {
          margin-top: 1.2rem;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .carousel-controls button {
          font-size: 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          color: #FF6F61;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          transition: background 0.18s, color 0.18s;
        }
        .carousel-controls button:hover {
          background: #FFDFAF;
          color: #2D2A32;
        }

        .featured-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(30, 41, 59, 0.65);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .featured-modal {
          background: #fff;
          border-radius: 1.5rem;
          max-width: 500px;
          width: 95vw;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          box-shadow: 0 8px 32px rgba(255, 111, 97, 0.18);
          position: relative;
          text-align: left;
          animation: fadeIn 0.2s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #FF6F61;
          cursor: pointer;
          z-index: 10;
        }

        .modal-image {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 1.2rem;
          margin-bottom: 1.2rem;
        }

        .modal-meta {
          color: #6b7280;
          font-size: 0.98rem;
          margin-bottom: 1rem;
        }

        .modal-content {
          font-size: 1.08rem;
          color: #1f2937;
          line-height: 1.6;
        }

        .modal-read-more {
          margin-top: 1.2rem;
          display: block;
          text-align: center;
        }

        @media (max-width: 900px) {
          .featured-carousel.feminine-featured-carousel {
            padding: 1.2rem 0.5rem 0.7rem 0.5rem;
            border-radius: 1.2rem;
          }
          .featured-article-img {
            max-width: 220px;
            border-radius: 1.2rem;
          }
          .carousel-content {
            gap: 1.2rem;
          }
        }

        @media (max-width: 600px) {
          .featured-carousel.feminine-featured-carousel {
            padding: 0.7rem 0.1rem 0.2rem 0.1rem;
            border-radius: 0.7rem;
          }
          .featured-article-img {
            max-width: 98vw;
            border-radius: 0.7rem;
          }
          .carousel-content {
            flex-direction: column;
            gap: 0.7rem;
          }
          .carousel-text {
            max-width: 98vw;
            text-align: center;
          }
        }
      `}</style>
      <div className="featured-carousel feminine-featured-carousel">
        <div className="carousel-content" onClick={() => setModalOpen(true)} style={{cursor: 'pointer'}}>
          <img src={article.image} alt={article.title} className="featured-article-img" />
          <div className="carousel-text">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <a
              href={article.url}
              className="read-more-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              Read More
            </a>
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={goPrev}>&lt;</button>
          <button onClick={goNext}>&gt;</button>
        </div>
        {modalOpen && (
          <div className="featured-modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="featured-modal" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setModalOpen(false)}>&times;</button>
              <img src={article.image} alt={article.title} className="modal-image" />
              <h2>{article.title}</h2>
              <p className="modal-meta">By {article.author} &middot; {article.date}</p>
              <div className="modal-content">{article.content}</div>
              <a
                href={article.url}
                className="read-more-btn modal-read-more"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Full Article
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedArticlesCarousel;

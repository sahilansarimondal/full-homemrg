import React from 'react';
import { useParams } from 'react-router-dom';
import blogCategories from '../../data/blogCategories.json'; // or .blogCategoriesFullUpdated.json
import { Link } from 'react-router-dom';

const BlogCategory = () => {
  const { slug } = useParams();
  const category = blogCategories.find(cat => cat.slug === slug);

  if (!category) {
    return <div className="tips-blog-page"><h2>Category not found</h2></div>;
  }

  return (
    <div className="tips-blog-page" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: 'none' }}>
      <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(30,58,138,0.10)', padding: '2.5rem 2rem', maxWidth: 800, width: '100%', margin: '2.5rem 0' }}>
        <Link to="/tips-blog" className="back-button" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, marginBottom: '1.2rem', display: 'inline-block' }}>
          ← Back to Categories
        </Link>
        {category.image && (
          <img src={category.image} alt={category.category} style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: '1rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(30,58,138,0.10)' }} />
        )}
        <h1 className="page-title" style={{ color: '#1e3a8a', fontWeight: 900, fontSize: '2rem', marginBottom: '0.7rem' }}>{category.category}</h1>
        <p className="page-intro" style={{ color: '#334155', fontSize: '1.15rem', marginBottom: '1.5rem' }}>{category.description}</p>
        <div className="category-topics">
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
            {category.topics.map((topic, i) => (
              <li key={i} className="topic-item" style={{ color: '#1e293b', fontSize: '1.08rem', background: '#f8fafc', borderRadius: '0.7rem', padding: '0.7rem 1.1rem', marginBottom: '0.7rem', boxShadow: '0 1px 4px rgba(30,58,138,0.04)' }}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;

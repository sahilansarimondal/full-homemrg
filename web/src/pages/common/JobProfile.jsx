import React from 'react';
import { useParams } from 'react-router-dom';
import openPositions from '../../data/openPositions.json';

const JobProfile = () => {
  const { jobId } = useParams();
  const job = openPositions.find((job) => job.id === jobId);

  if (!job) {
    return <div className="job-profile"><h2>Job not found.</h2></div>;
  }

  return (
    <>
      <style>{`
        .job-profile {
          font-family: 'Segoe UI', sans-serif;
          color: #111;
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .job-hero {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .job-hero img {
          width: 300px;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }

        .job-hero-text h1 {
          margin: 0;
          font-size: 2rem;
        }

        .location {
          font-style: italic;
          color: #555;
          margin: 0.5rem 0;
        }

        .short-desc {
          font-size: 1.1rem;
          color: #333;
        }

        .job-body section {
          margin-bottom: 3rem;
        }

        .job-description p {
          line-height: 1.6;
          color: #444;
        }

        .job-skills ul {
          list-style: disc;
          padding-left: 1.5rem;
        }

        .job-skills li {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .job-application h2 {
          margin-bottom: 1rem;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
        }

        .application-form input,
        .application-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .application-form button {
          background-color: #0077b6;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .application-form button:hover {
          background-color: #005f8e;
        }
      `}</style>
      <div className="job-profile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', background: 'none' }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(30,58,138,0.10)', padding: '2.5rem 2rem', maxWidth: 900, width: '100%', margin: '2.5rem 0' }}>
          <div className="job-hero">
            <img src={job.image} alt={job.title} />
            <div className="job-hero-text">
              <h1>{job.title}</h1>
              <p className="location">{job.location}</p>
              <p className="short-desc">{job.shortDescription}</p>
            </div>
          </div>

          <div className="job-body">
            <section className="job-description">
              <h2>Job Description</h2>
              <p>{job.longDescription}</p>
            </section>

            <section className="job-skills">
              <h2>Skills & Requirements</h2>
              <ul>
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            <section className="job-application">
              <h2>Apply Now</h2>
              <form className="application-form">
                <label>
                  Full Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email Address
                  <input type="email" name="email" required />
                </label>
                <label>
                  Phone Number
                  <input type="tel" name="phone" required />
                </label>
                <label>
                  Upload Resume
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
                </label>
                <label>
                  Cover Letter
                  <textarea name="coverLetter" rows="4"></textarea>
                </label>
                <button type="submit">Submit Application</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobProfile;

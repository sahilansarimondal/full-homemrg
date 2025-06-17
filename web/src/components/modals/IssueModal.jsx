import React, { useState } from 'react';
import { useIssues } from '../../hooks/useIssues';

export default function IssueModal({ issueId, onClose }) {
  const { createIssue } = useIssues();
  const [desc, setDesc] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    createIssue({ description: desc }).then(onClose);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Report Issue</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Describe the issue..."
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

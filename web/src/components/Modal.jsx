import React from 'react';
import '../styles/Modal.css';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

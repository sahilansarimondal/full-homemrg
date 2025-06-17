import React from 'react';
import { useModal } from '../ModalManager';

export default function NotificationModal({ notification, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{notification.title}</h2>
        <p>{notification.body}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
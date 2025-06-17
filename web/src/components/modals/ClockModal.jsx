import React, { useState, useEffect } from 'react';
import { useModal } from '../ModalManager';
import { useClock } from '../../hooks/useClock';

export default function ClockModal({ onClose }) {
  const { clockIn, clockOut, getLogs } = useClock();
  const [logs, setLogs] = useState([]);

  useEffect(() => { getLogs().then(setLogs); }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Time Clock</h2>
        <button onClick={() => clockIn().then(() => getLogs().then(setLogs))}>Clock In</button>
        <button onClick={() => clockOut().then(() => getLogs().then(setLogs))}>Clock Out</button>
        <ul>{logs.map(l => <li key={l.id}>{l.time} - {l.type}</li>)}</ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
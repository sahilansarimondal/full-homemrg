import React, { useState, useEffect } from 'react';
import { useModal } from '../ModalManager';
import { useSchedules } from '../../hooks/useSchedules';

export default function ScheduleModal({ entryId, onClose }) {
  const { getEntry, createEntry, updateEntry } = useSchedules();
  const isEdit = Boolean(entryId);
  const [form, setForm] = useState({ date: '', time: '' });

  useEffect(() => { if (isEdit) getEntry(entryId).then(setForm); }, [entryId]);

  const handleSubmit = e => {
    e.preventDefault();
    (isEdit ? updateEntry(entryId, form) : createEntry(form)).then(onClose);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? 'Edit Schedule' : 'New Schedule'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <input type="time" name="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
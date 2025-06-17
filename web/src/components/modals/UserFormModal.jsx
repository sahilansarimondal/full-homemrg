import React, { useState, useEffect } from 'react';
import { useModal } from '../ModalManager';
import { useUsers } from '../../hooks/useUsers';

export default function UserFormModal({ userId, onClose }) {
  const { getUser, createUser, updateUser } = useUsers();
  const isEdit = Boolean(userId);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => { if (isEdit) getUser(userId).then(setForm); }, [userId]);

  const handleSubmit = e => {
    e.preventDefault();
    (isEdit ? updateUser(userId, form) : createUser(form)).then(onClose);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? 'Edit Contractor' : 'Add Contractor'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
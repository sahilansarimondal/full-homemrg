import React, { useState, useEffect } from 'react';
import { useModal } from '../ModalManager';
import { useTasks } from '../../hooks/useTasks';

export default function TaskFormModal({ taskId, onClose }) {
  const { getTask, createTask, updateTask } = useTasks();
  const isEdit = Boolean(taskId);
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    if (isEdit) getTask(taskId).then(data => setForm(data));
  }, [taskId]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    (isEdit ? updateTask(taskId, form) : createTask(form)).then(onClose);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={handleChange} /></label>
          <label>Description<textarea name="description" value={form.description} onChange={handleChange} /></label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
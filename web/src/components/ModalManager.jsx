import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import TaskFormModal from './modals/TaskFormModal';
import IssueModal from './modals/IssueModal';
import MessageModal from './modals/MessageModal';
import InvoiceModal from './modals/InvoiceModal';
import NotificationModal from './modals/NotificationModal';
import ScheduleModal from './modals/ScheduleModal';
import ClockModal from './modals/ClockModal';
import UserFormModal from './modals/UserFormModal';

const modalMap = {
  TaskFormModal,
  IssueModal,
  MessageModal,
  InvoiceModal,
  NotificationModal,
  ScheduleModal,
  ClockModal,
  UserFormModal,
};

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ name: null, props: {} });
  const openModal = (name, props = {}) => setModal({ name, props });
  const closeModal = () => setModal({ name: null, props: {} });

  const ModalComponent = modal.name ? modalMap[modal.name] : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {ModalComponent &&
        ReactDOM.createPortal(
          <ModalComponent {...modal.props} onClose={closeModal} />, document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
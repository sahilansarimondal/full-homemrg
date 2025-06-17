import React, { useState, useEffect } from 'react';
import { useModal } from '../ModalManager';
import { useInvoices } from '../../hooks/useInvoices';

export default function InvoiceModal({ invoiceId, onClose }) {
  const { getInvoice, payInvoice } = useInvoices();
  const [inv, setInv] = useState(null);

  useEffect(() => { getInvoice(invoiceId).then(setInv); }, [invoiceId]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Invoice #{invoiceId}</h2>
        <p>Amount: {inv?.amount}</p>
        <button onClick={() => payInvoice(invoiceId).then(onClose)}>Pay Now</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
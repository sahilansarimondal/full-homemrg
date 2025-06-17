import { useState, useEffect } from 'react';
export function useInvoices() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => { fetch('/api/invoices',{credentials:'include'}).then(r=>r.json()).then(setInvoices); }, []);
  const getInvoice = id => fetch(`/api/invoices/${id}`,{credentials:'include'}).then(r=>r.json());
  const payInvoice = id => fetch(`/api/invoices/${id}/pay`,{method:'POST',credentials:'include'});
  return { invoices, getInvoice, payInvoice };
}
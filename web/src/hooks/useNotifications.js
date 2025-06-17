import { useState } from 'react';
export function useNotifications() {
  // Static demo notifications
  const [notifications] = useState([
    {
      id: 1,
      title: 'Task Due Soon',
      message: 'Your HVAC filter replacement is due in 3 days.',
      timestamp: '2025-05-10T14:00:00Z',
      type: 'reminder'
    },
    {
      id: 2,
      title: 'Invoice Paid',
      message: 'Your invoice for April has been paid successfully.',
      timestamp: '2025-05-09T10:30:00Z',
      type: 'info'
    },
    {
      id: 3,
      title: 'New Issue Reported',
      message: 'A new maintenance issue has been reported for your property.',
      timestamp: '2025-05-08T16:45:00Z',
      type: 'alert'
    }
  ]);
  return { notifications };
}
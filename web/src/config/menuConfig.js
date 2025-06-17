export const menuConfig = {
    homeowner: [
      { label: 'Dashboard',     path: '/dashboard',               icon: '🏠' },
      { label: 'Manage My Services',   path: '/dashboard/tasks',         icon: '📝' },
      { label: 'Inbox',         path: '/dashboard/inbox',         icon: '📨' },
      { label: 'Report Issue',  path: '/dashboard/issues',        icon: '⚠️', optional: true },
      { label: 'Invoices',      path: '/dashboard/invoices',      icon: '💳', optional: true },
    ],
    contractor: [
      { label: 'Dashboard',     path: '/dashboard',               icon: '👷' },
      { label: 'Tasks', path: '/dashboard/tasks', icon: '🛠️' },
      { label: 'Clock In/Out',  path: '/dashboard/clock',         icon: '⏱️' },
      { label: 'Inbox',         path: '/dashboard/inbox',         icon: '📨' },
      { label: 'Report Issue',  path: '/dashboard/issues',        icon: '⚠️', optional: true },
    ],
    manager: [
      { label: 'Dashboard',     path: '/dashboard',               icon: '🧑‍💼' },
      { label: 'Manage Tasks',  path: '/dashboard/tasks',         icon: '📋' },
      { label: 'Schedules',     path: '/dashboard/schedules',     icon: '📆' },
      { label: 'Time Logs',     path: '/dashboard/clock',         icon: '⏲️' },
      { label: 'Users',         path: '/dashboard/users',         icon: '👥' },
      { label: 'Inbox',         path: '/dashboard/inbox',         icon: '📨' },
      { label: 'Invoices',      path: '/dashboard/invoices',      icon: '🧾', optional: true },
    ],
  };
import { useState } from 'react';
export function useClock() {
  const getLogs = () => fetch('/api/clock',{credentials:'include'}).then(r=>r.json());
  const clockIn = () => fetch('/api/clock/in',{method:'POST',credentials:'include'});
  const clockOut = () => fetch('/api/clock/out',{method:'POST',credentials:'include'});
  return { getLogs, clockIn, clockOut };
}
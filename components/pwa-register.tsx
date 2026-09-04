'use client';

import { useEffect } from 'react';
import { famaPath } from '@/lib/paths';

export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator)
      void navigator.serviceWorker.register(famaPath('/sw.js'), {
        scope: famaPath('/'),
      });
  }, []);
  return null;
}

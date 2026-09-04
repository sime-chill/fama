'use client';

import { useEffect } from 'react';
import { atlasPath } from '@/lib/paths';

export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator)
      void navigator.serviceWorker.register(atlasPath('/sw.js'), {
        scope: atlasPath('/'),
      });
  }, []);
  return null;
}

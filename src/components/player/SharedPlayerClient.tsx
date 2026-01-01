'use client';

import dynamic from 'next/dynamic';

const SharedPlayer = dynamic(() => import('@/components/player/SharedPlayer'), {
  ssr: false,
});

export default SharedPlayer;

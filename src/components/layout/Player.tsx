'use client';

import { useAppContext } from '@/components/AppContext';

const Player = () => {
  const { player } = useAppContext();
  if (!player?.props?.url) return;
  return player;
};

export default Player;

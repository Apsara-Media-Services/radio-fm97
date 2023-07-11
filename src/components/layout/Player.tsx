'use client';

import { useAppContext } from '@/components/AppContext';
import WaveSurferPlayer from '@components/wavesurfer/WaveSurferPlayer';

const Player = () => {
  const { control } = useAppContext();
  if (!control.open || !control.lists.length) return;
  return <WaveSurferPlayer control={control} />;
};

export default Player;

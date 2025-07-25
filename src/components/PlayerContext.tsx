'use client';

import usePlayer from '@/hooks/use-player';
import { createContext, useContext } from 'react';

export type PlayerContextType = ReturnType<typeof usePlayer>;

const defaultValues: PlayerContextType = {} as PlayerContextType;
const PlayerContext = createContext<PlayerContextType>(defaultValues);

export default PlayerContext;

export function useSharedPlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const usePlayerHook = usePlayer();
  return (
    <PlayerContext.Provider value={usePlayerHook}>
      {children}
    </PlayerContext.Provider>
  );
}

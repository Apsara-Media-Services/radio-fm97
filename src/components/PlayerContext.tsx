'use client';

import usePlayer from '@/hooks/use-player';
import { AppContextType } from '@/types/app';
import { createContext, useContext } from 'react';

const defaultValues: AppContextType = {};
const PlayerContext = createContext<AppContextType>(defaultValues);


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

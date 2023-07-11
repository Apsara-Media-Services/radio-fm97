'use client';

import { AppContextType } from '@/types/app';
import { IComponentProps } from '@/types/component';
import { createContext, useContext, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const defaultValues: AppContextType = {};
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  const [player, setPlayer] = useState<WaveSurfer>({} as WaveSurfer);
  const [control, setControl] = useState({
    speed: 1,
    volume: 0.025,
    muted: false,
    isPlaying: false,
    lists: [],
    open: false,
  } as any);
  return (
    <>
      <AppContext.Provider value={{ player, setPlayer, control, setControl }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

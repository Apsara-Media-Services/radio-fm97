'use client';

import { AppContextType } from '@/types/app';
import { IComponentProps } from '@/types/component';
import { createContext, useContext, useState } from 'react';
import { ReactPlayerProps } from 'react-player';

// import WaveSurfer from 'wavesurfer.js';

const defaultValues: AppContextType = {};
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  // const [Player, setPlayer] = useState<WaveSurfer>({} as WaveSurfer);
  // const [Player, setPlayer] = useState<ReactPlayerProps>(
  //   {} as ReactPlayerProps
  // );
  const [Player, setPlayer] = useState({});
  const [control, setControl] = useState({
    speed: 1,
    volume: 0.025,
    muted: false,
  } as any);
  return (
    <>
      <AppContext.Provider value={{ Player, setPlayer }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

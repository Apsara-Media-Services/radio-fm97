'use client';

import { AppContextType } from '@/types/app';
import { IComponentProps } from '@/types/component';
import type Plyr from 'plyr';
import { createContext, useContext, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const defaultValues: AppContextType = {};
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  const [player, setPlayer] = useState<Plyr>({} as Plyr);
  // const [player, setPlayer] = useState<WaveSurfer>({} as WaveSurfer);

  return (
    <>
      <AppContext.Provider value={{ player, setPlayer }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

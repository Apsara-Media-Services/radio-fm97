'use client';

import { PlayerProvider } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import { HeroUIProvider } from '@heroui/react';
import { createContext, useContext } from 'react';

export type AppContextType = {
  [key: string]: any;
};

const defaultValues: AppContextType = {} as AppContextType;
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  return (
    <>
      <AppContext.Provider value={{}}>
        <PlayerProvider>
          <HeroUIProvider>{children}</HeroUIProvider>
        </PlayerProvider>
      </AppContext.Provider>
    </>
  );
}

'use client';

import { PlayerProvider } from '@/components/PlayerContext';
import { AppContextType } from '@/types/app';
import { IComponentProps } from '@/types/component';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { createContext, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const defaultValues: AppContextType = {};
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  const [Player, setPlayer] = useState({});
  return (
    <>
      <AppContext.Provider value={{ Player, setPlayer }}>
        <PlayerProvider>
          <HeroUIProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
            <ToastContainer aria-label={''} />
            <NextNProgress color="#cf0a10" options={{ showSpinner: false }} />
          </HeroUIProvider>
        </PlayerProvider>
      </AppContext.Provider>
    </>
  );
}

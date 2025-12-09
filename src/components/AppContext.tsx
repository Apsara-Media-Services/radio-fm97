'use client';

import { PlayerProvider } from '@/components/PlayerContext';
import useProgram from '@/hooks/use-program';
import { IComponentProps } from '@/types/component';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { createContext, useContext } from 'react';
import { ToastContainer } from 'react-toastify';

export type AppContextType = ReturnType<typeof useProgram>;

const defaultValues: AppContextType = {} as AppContextType;
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  const useProgramHook = useProgram();
  return (
    <>
      <AppContext.Provider value={{ ...useProgramHook }}>
        <PlayerProvider>
          <HeroUIProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
            <ToastContainer aria-label={''} />
          </HeroUIProvider>
        </PlayerProvider>
      </AppContext.Provider>
    </>
  );
}

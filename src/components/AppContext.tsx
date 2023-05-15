'use client';

import { AppContextType } from '@/types/app';
import { IComponentProps } from '@/types/component';
import { createContext, useContext } from 'react';

const defaultValues: AppContextType = {};
const AppContext = createContext<AppContextType>(defaultValues);

export default AppContext;

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: IComponentProps) {
  return (
    <>
      <AppContext.Provider value={{}}>{children}</AppContext.Provider>
    </>
  );
}

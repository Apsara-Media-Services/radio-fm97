'use client';

import { useTheme } from '@/components/libs/NextTheme';
import { Slide, toast } from '@/components/libs/ReactToastify';
import NoSSR from '@components/NoSSR';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import capitalize from 'lodash/capitalize';

const ThemeSwitcher = () => {
  const themes = ['light', 'dark', 'system'];
  const { systemTheme, theme, setTheme } = useTheme();
  console.warn(systemTheme, theme);
  const onSetTheme = () => {
    const index = themes.indexOf(theme as string);
    const nextIndex = index < themes.length - 1 ? index + 1 : 0;
    const nextTheme =
      themes[nextIndex] === 'system' ? systemTheme : themes[nextIndex];

    setTheme(themes[nextIndex]);
    toast.info(`${capitalize(themes[nextIndex])} mode is enabled!`, {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      theme: nextTheme === 'dark' ? 'light' : 'dark',
      icon: false,
      delay: 100,
      closeButton: false,
      draggable: false,
      transition: Slide,
      bodyClassName: 'text-center',
    });
  };

  return (
    <NoSSR>
      <button
        type="button"
        className="p-3 sm:p-4 fixed bottom-4 right-4 bg-gray-50 hover:bg-white dark:bg-zinc-800 dark:hover:bg-black rounded-full border shadow focus:outline-none"
        onClick={() => onSetTheme()}
      >
        {theme === 'light' && <SunIcon className="h-5 w-5" />}
        {theme === 'dark' && <MoonIcon className="h-5 w-5" />}
        {theme === 'system' && <ComputerDesktopIcon className="h-5 w-5" />}
      </button>
    </NoSSR>
  );
};

export default ThemeSwitcher;

'use client';

import { IComponentProps } from '@/types/component';
import { Menu, MenuButton } from '@headlessui/react';
import {
  Brightness6Rounded,
  LightModeRounded,
  NightsStayRounded,
} from '@mui/icons-material';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeaderMenuThemeSwitcher = ({ className }: IComponentProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = () => {
    const themes = ['light', 'dark', 'system'];
    const index = themes.indexOf(theme as string);
    const nextIndex = index < themes.length - 1 ? index + 1 : 0;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme as string);
  };

  return (
    <Menu
      as="div"
      className={classNames('relative inline-block', className as string)}
    >
      <MenuButton
        className="flex focus:outline-none"
        onClick={handleThemeChange}
      >
        <span className="text-zinc-900 dark:text-zinc-400 hover:text-ams-primary dark:hover:text-white">
          {theme === 'light' && <NightsStayRounded />}
          {theme === 'dark' && <LightModeRounded />}
          {theme === 'system' && <Brightness6Rounded />}
        </span>
      </MenuButton>
    </Menu>
  );
};

export default HeaderMenuThemeSwitcher;

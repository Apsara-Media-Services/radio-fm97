'use client';

import { IComponentProps } from '@/types/component';
import { Menu } from '@headlessui/react';
import { LightModeRounded, NightsStayRounded } from '@mui/icons-material';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

const HeaderMenuThemeSwitcher = ({ className }: IComponentProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const t = resolvedTheme == 'light' ? 'dark' : 'light';
    setTheme(t);
  };

  return (
    <Menu as="div" className={classNames('relative inline-block', className)}>
      <Menu.Button className="flex" onClick={handleThemeChange}>
        <span className="text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white">
          {resolvedTheme === 'light' ? (
            <NightsStayRounded />
          ) : (
            <LightModeRounded />
          )}
        </span>
      </Menu.Button>
    </Menu>
  );
};

export default HeaderMenuThemeSwitcher;

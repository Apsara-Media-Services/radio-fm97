'use client';

import { IComponentProps } from '@/types/component';
import { Menu, MenuButton } from '@headlessui/react';
import { LightModeRounded, NightsStayRounded } from '@mui/icons-material';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeaderMenuThemeSwitcher = ({ className }: IComponentProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  const handleThemeChange = () => {
    const t = resolvedTheme == 'light' ? 'dark' : 'light';
    setTheme(t);
  };

  return (
    <Menu as="div" className={classNames('relative inline-block', className as string)}>
      <MenuButton className="flex" onClick={handleThemeChange}>
        <span className="text-zinc-900 dark:text-zinc-400 hover:text-ams-primary dark:hover:text-white">
          {resolvedTheme === 'light' ? (
            <NightsStayRounded />
          ) : (
            <LightModeRounded />
          )}
        </span>
      </MenuButton>
    </Menu>
  );
};

export default HeaderMenuThemeSwitcher;

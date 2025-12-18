'use client';

import ClientOnly from '@/components/ClientOnly';
import { IComponentProps } from '@/types/component';
import { Menu, MenuButton } from '@headlessui/react';
import {
  Brightness6Rounded,
  LightModeRounded,
  NightsStayRounded,
} from '@mui/icons-material';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

const HeaderMenuThemeSwitcher = ({ className }: IComponentProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const themes = ['light', 'dark', 'system'];
    const index = themes.indexOf(theme as string);
    const nextIndex = index < themes.length - 1 ? index + 1 : 0;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme as string);
  };

  return (
    <ClientOnly>
      <Menu
        as="div"
        className={classNames('relative inline-block', className as string)}
      >
        <MenuButton
          className="flex focus:outline-none cursor-pointer"
          onClick={handleThemeChange}
        >
          <span className="text-menu text-hover">
            {theme === 'light' && <NightsStayRounded />}
            {theme === 'dark' && <LightModeRounded />}
            {theme === 'system' && <Brightness6Rounded />}
          </span>
        </MenuButton>
      </Menu>
    </ClientOnly>
  );
};

export default HeaderMenuThemeSwitcher;

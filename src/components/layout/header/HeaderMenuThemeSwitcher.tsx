'use client';

import { IComponentProps } from '@/types/component';
import { Menu, Transition } from '@headlessui/react';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';

const HeaderMenuThemeSwitcher = ({ className }: IComponentProps) => {
  const { theme, setTheme } = useTheme();
  const themes: any = {
    light: { icon: SunIcon, key: 'light', label: 'Light' },
    dark: { icon: MoonIcon, key: 'dark', label: 'Dark' },
    system: {
      icon: ComputerDesktopIcon,
      key: 'system',
      label: 'System',
    },
  };
  const activeTheme = theme ? themes[theme] : themes.light;

  return (
    <Menu as="div" className={classNames('relative inline-block', className)}>
      {({ close }) => (
        <>
          <Menu.Button className="flex">
            <activeTheme.icon
              className="h-7 w-7 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-[46px] md:top-[54px] origin-top-right z-10 min-w-max overflow-auto bg-white dark:bg-black shadow-lg dark:shadow-sm dark:shadow-zinc-400/70 ">
              <div className="py-2">
                {Object.values(themes).map((_theme: any) => (
                  <button
                    key={_theme.key}
                    type="button"
                    className={classNames(
                      'flex items-center py-1 px-3 hover:bg-ams-light hover:dark:bg-zinc-800 hover:dark:text-white w-32',
                      activeTheme.key === _theme.key
                        ? 'text-ams-red dark:text-white'
                        : 'dark:text-zinc-400'
                    )}
                    onClick={async () => {
                      close();
                      setTimeout(() => setTheme(_theme.key), 200);
                    }}
                  >
                    <_theme.icon className="h-5 w-5 mr-3" />
                    <div>{_theme.label}</div>
                  </button>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default HeaderMenuThemeSwitcher;

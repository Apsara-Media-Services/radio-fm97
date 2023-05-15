'use client';

import HeaderMenuContent from '@/components/layout/header/HeaderMenuContent';
import HeaderMenuThemeSwitcher from '@/components/layout/header/HeaderMenuThemeSwitcher';
import { IComponentProps } from '@/types/component';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Fragment } from 'react';

const HeaderMenu = ({ className }: IComponentProps) => {
  return (
    <div
      className={classNames('flex items-center justify-end gap-5', className)}
    >
      <HeaderMenuThemeSwitcher />
      <Menu as="div" className="relative hidden md:inline-block">
        {({ open }) => (
          <>
            <Menu.Button className="flex">
              {open ? (
                <XMarkIcon
                  className="h-7 w-7 text-ams-red dark:text-white"
                  aria-hidden="true"
                />
              ) : (
                <Bars3Icon
                  className="h-7 w-7 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white"
                  aria-hidden="true"
                />
              )}
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
              <Menu.Items className="absolute right-0 top-[54px] origin-top-right z-10 min-w-max overflow-auto bg-white dark:bg-black shadow-lg dark:shadow-sm dark:shadow-zinc-400/70 ">
                <HeaderMenuContent className="p-5 grid gap-8" />
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default HeaderMenu;

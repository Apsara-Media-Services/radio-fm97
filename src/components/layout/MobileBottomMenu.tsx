'use client';

import HeaderMenuContent from '@/components/layout/header/HeaderMenuContent';
import { IComponentProps } from '@/types/component';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import {
  CloseRounded,
  HomeRounded,
  MenuRounded,
  PodcastsRounded,
} from '@mui/icons-material';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const MobileBottomMenu = ({ className }: IComponentProps) => {
  const pathname = usePathname();
  const active = {
    home: pathname === '/',
    live: pathname.startsWith('/live'),
  };

  return (
    <div
      className={classNames(
        'bg-white dark:bg-slate-950 border-t ams-border block md:hidden',
        className
      )}
    >
      <div className="flex justify-between items-center relative">
        <Link href={'/'} className="text-menu text-hover p-3 w-28 text-center">
          <div className={classNames(active.home ? 'text-accent' : '')}>
            <HomeRounded />
            <div className="text-sm">ទំព័រដើម</div>
          </div>
        </Link>
        <Link
          href={'/live'}
          className="group py-3 text-menu text-hover p-3 w-28 text-center"
        >
          <div className={classNames(active.live ? 'text-accent' : '')}>
            <PodcastsRounded />
            <div className="text-sm">ផ្សាយផ្ទាល់</div>
          </div>
        </Link>
        <Menu as="div">
          {({ open }) => {
            return (
              <>
                {open ? (
                  <MenuButton className="w-28 p-3 text-accent focus:outline-none">
                    <CloseRounded />
                    <div className="text-sm">មីនុយ</div>
                  </MenuButton>
                ) : (
                  <MenuButton className="w-28 p-3 text-menu text-hover focus:outline-none">
                    <MenuRounded />
                    <div className="text-sm">មីនុយ</div>
                  </MenuButton>
                )}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute left-0 bottom-[70px] h-[calc(100vh-135px)] origin-bottom-center z-10 w-full overflow-auto bg-white dark:bg-slate-950 focus:outline-none">
                    <HeaderMenuContent className="p-5 grid gap-8" />
                  </MenuItems>
                </Transition>
              </>
            );
          }}
        </Menu>
      </div>
    </div>
  );
};

export default MobileBottomMenu;

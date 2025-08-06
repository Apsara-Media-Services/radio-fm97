'use client';

import { useAppContext } from '@/components/AppContext';
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
import { cloneDeep, isEmpty, isNil } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const MobileBottomMenu = ({ className }: IComponentProps) => {
  const pathname = usePathname();
  const active = {
    home: pathname === '/',
    live: pathname.startsWith('/live'),
  };
  const { player, setPlayer } = useAppContext();

  return (
    <div
      className={classNames(
        'bg-ams-light dark:bg-zinc-800 shadow-[0_-3px_6px_0px_rgba(0,0,0,0.16)] block md:hidden',
        className
      )}
    >
      <div className="flex justify-between items-center relative">
        <Link
          href={'/'}
          className="text-zinc-900 dark:text-zinc-400 hover:text-ams-primary dark:hover:text-white p-3 w-28 text-center"
        >
          <div
            className={classNames(
              active.home ? 'text-ams-primary dark:text-white' : ''
            )}
          >
            <HomeRounded />
            <div className="text-sm">ទំព័រដើម</div>
          </div>
        </Link>
        <Link
          href={'/'}
          className="group py-3 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white p-3 w-28 text-center"
          onClick={() => {
            if (isNil(player) || isEmpty(player)) return;
            if (active.live) player.playing ? player.pause() : player.play();
            setPlayer(cloneDeep(player));
          }}
        >
          <div
            className={classNames(
              active.live ? 'text-ams-red dark:text-white' : ''
            )}
          >
            <div className="relative">
              <PodcastsRounded />
              <div
                className={classNames(
                  'text-white text-[10px] absolute bottom-[-6px] w-full'
                )}
              >
                <span className={classNames('mx-auto px-0.5 bg-ams-red')}>
                  LIVE
                </span>
              </div>
            </div>
            <div className="text-sm">ផ្សាយផ្ទាល់</div>
          </div>
        </Link>
        <Menu as="div">
          {({ open }) => {
            return (
              <>
                {open ? (
                  <MenuButton className="w-28 p-3 text-ams-primary dark:text-white focus:outline-none">
                    <CloseRounded />
                    <div className="text-sm">មីនុយ</div>
                  </MenuButton>
                ) : (
                  <MenuButton className="w-28 p-3 text-zinc-900 dark:text-zinc-400 hover:text-ams-primary dark:hover:text-white focus:outline-none">
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
                  <MenuItems className="absolute left-0 bottom-[69px] h-[calc(100vh-133px)] origin-bottom-center z-10 w-full overflow-auto bg-white dark:bg-black shadow-lg dark:shadow-sm dark:shadow-zinc-400/70 focus:outline-none">
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

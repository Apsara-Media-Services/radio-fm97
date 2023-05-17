'use client';

import { useAppContext } from '@/components/AppContext';
import HeaderMenuContent from '@/components/layout/header/HeaderMenuContent';
import { IComponentProps } from '@/types/component';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
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
        'bg-ams-light dark:bg-zinc-800 sticky bottom-0 z-10 shadow-[0_-3px_6px_0px_rgba(0,0,0,0.16)] block md:hidden',
        className
      )}
    >
      <div className="flex justify-between items-center relative">
        <Link
          href={'/'}
          className="text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white p-3 w-28 text-center"
        >
          <div
            className={classNames(
              active.home ? 'text-ams-red dark:text-white' : ''
            )}
          >
            <HomeIcon className="h-7 w-7 mx-auto" />
            <div className="text-sm">ទំព័រដើម</div>
          </div>
        </Link>
        <Link
          href={'/live'}
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
              {player?.playing ? (
                <PauseCircleIcon className="h-7 w-7 mx-auto" />
              ) : (
                <PlayCircleIcon className="h-7 w-7 mx-auto" />
              )}
              <div
                className={classNames(
                  'text-white text-[10px] absolute bottom-[-6px] w-full'
                )}
              >
                <span className={classNames('mx-auto px-0.5 bg-ams-red')}>
                  Live
                </span>
              </div>
            </div>
            <div className="text-sm">ផ្សាយផ្ទាល់</div>
          </div>
        </Link>
        <Menu as="div" className="">
          {({ open }) => {
            if (typeof document !== 'undefined') {
              document.body.classList.toggle('overflow-y-hidden', open);
            }

            return (
              <>
                {open ? (
                  <Menu.Button className="w-28 p-3 text-ams-red dark:text-white">
                    <XMarkIcon className="h-7 w-7 mx-auto" aria-hidden="true" />
                    <div className="text-sm">មីនុយ</div>
                  </Menu.Button>
                ) : (
                  <Menu.Button className="w-28 p-3 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white">
                    <Bars3Icon className="h-7 w-7 mx-auto" aria-hidden="true" />
                    <div className="text-sm">មីនុយ</div>
                  </Menu.Button>
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
                  <Menu.Items className="absolute w-full h-[calc(100vh-136px)] left-0 bottom-[72px] z-10 origin-bottom-top min-w-max overflow-auto bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <HeaderMenuContent className="p-5 grid gap-8" />
                  </Menu.Items>
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

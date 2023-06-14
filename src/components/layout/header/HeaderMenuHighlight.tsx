'use client';

import { useAppContext } from '@/components/AppContext';
import { IComponentProps } from '@/types/component';
import {
  HomeIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { cloneDeep, isEmpty, isNil } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderMenuHighlight = ({ className }: IComponentProps) => {
  const pathname = usePathname();
  const active = {
    home: pathname === '/',
    live: pathname.startsWith('/live'),
  };

  const { player, setPlayer } = useAppContext();

  return (
    <div
      className={classNames(
        'hidden md:flex justify-center text-center md:text-md',
        className
      )}
    >
      <Link
        href={'/'}
        className="py-3 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white px-2 border-x border-zinc-400 w-28"
      >
        <div
          className={classNames(
            active.home ? 'text-ams-red dark:text-white' : ''
          )}
        >
          <HomeIcon className="h-8 w-8 mx-auto" />
          <div>ទំព័រដើម</div>
        </div>
      </Link>
      <Link
        href={'/live'}
        className="group py-3 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white px-2 border-r border-zinc-400 w-28"
        onClick={() => {
          if (isNil(player) || isEmpty(player)) return;
          if (active.live) player.isPlaying() ? player.pause() : player.play();
          setPlayer(cloneDeep(player));
        }}
      >
        <div
          className={classNames(
            active.live ? 'text-ams-red dark:text-white' : ''
          )}
        >
          <div className="relative">
            {!isEmpty(player) && player.isPlaying() ? (
              <PauseCircleIcon className="h-8 w-8 mx-auto" />
            ) : (
              <PlayCircleIcon className="h-8 w-8 mx-auto" />
            )}
            <div
              className={classNames(
                'text-white text-xs absolute bottom-[-6px] w-full'
              )}
            >
              <span className={classNames('mx-auto px-0.5 bg-ams-red')}>
                Live
              </span>
            </div>
          </div>
          <div>ផ្សាយផ្ទាល់</div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderMenuHighlight;

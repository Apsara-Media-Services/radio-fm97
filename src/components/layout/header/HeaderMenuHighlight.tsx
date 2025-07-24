'use client';

import { IComponentProps } from '@/types/component';
import { PodcastsRounded } from '@mui/icons-material';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderMenuHighlight = ({ className }: IComponentProps) => {
  const pathname = usePathname();
  const active = {
    home: pathname === '/',
    live: pathname.startsWith('/live'),
    audio: pathname.startsWith('/audio') && !pathname.startsWith('/audio/daily'),
    daily: pathname.startsWith('/audio/daily'),
  };

  return (
    <div
      className={classNames(
        'hidden md:flex items-center text-center md:text-md gap-x-6',
        className
      )}
    >
      <Link
        href={'/audio'}
        className="py-2 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white"
      >
        <div
          className={classNames(
            active.audio ? 'text-ams-red dark:text-white' : ''
          )}
        >
          <div className="text-lg">កម្មវិធីផ្សាយ</div>
        </div>
      </Link>
      <Link
        href={'/audio/daily'}
        className="py-2 text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white"
      >
        <div
          className={classNames(
            active.daily ? 'text-ams-red dark:text-white' : ''
          )}
        >
          <div className="text-lg">កម្មវិធីផ្សាយប្រចាំថ្ងៃ</div>
        </div>
      </Link>
      <Link
        href={'/'}
        className="text-zinc-900 dark:text-zinc-400 hover:text-ams-red dark:hover:text-white"
      >
        <div
          className={classNames(
            active.home ? 'text-ams-red dark:text-white' : ''
          )}
        >
          <div className="relative">
            <div
              className={classNames(
                'bg-ams-red text-xs text-white absolute bottom-[-10px]'
              )}
            >
              LIVE
            </div>
            <PodcastsRounded />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderMenuHighlight;

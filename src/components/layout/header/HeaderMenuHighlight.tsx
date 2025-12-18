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
    audio:
      pathname.startsWith('/audio') && !pathname.startsWith('/audio/daily'),
    news: pathname.startsWith('/news'),
  };

  return (
    <div
      className={classNames(
        'hidden md:flex items-center text-center md:text-md gap-x-6 text-menu text-lg',
        className
      )}
    >
      <Link
        href={'/live'}
        className="hover:text-ams-red dark:hover:text-ams-red-dark"
      >
        <div
          className={classNames(
            active.live || active.home ? 'text-accent' : ''
          )}
        >
          <div className="relative -mt-2">
            <div
              className={classNames(
                'bg-ams-red dark:bg-ams-red-dark text-xs text-white absolute -bottom-2.5 px-1 left-1/2 -translate-x-1/2 rounded-sm'
              )}
            >
              LIVE
            </div>
            <PodcastsRounded />
          </div>
        </div>
      </Link>
      <Link href={'/audio'} className="py-2 text-hover">
        <div className={classNames(active.audio ? 'text-accent' : '')}>
          កម្មវិធីផ្សាយ
        </div>
      </Link>
      <Link href={'/news'} className="py-2 text-hover">
        <div className={classNames(active.news ? 'text-accent' : '')}>
          ព័ត៌មាន
        </div>
      </Link>
    </div>
  );
};

export default HeaderMenuHighlight;

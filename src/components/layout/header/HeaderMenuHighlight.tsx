'use client';

import app from '@/configs/app';
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
        className=" text-ams-primary dark:text-ams-primary-dark mx-1"
      >
        <div className="relative -mt-2">
          <div
            className={classNames(
              'bg-ams-primary dark:bg-ams-primary-dark text-xs text-white absolute -bottom-2.5 px-1 left-1/2 -translate-x-1/2 rounded-sm'
            )}
          >
            {`${app.tag}`}
          </div>
          <PodcastsRounded />
        </div>
      </Link>
      {app.tag === 'FM97' && (
        <Link
          href={'https://fm99.ams.com.kh/live'}
          target="_blank"
          className="text-fm99 dark:text-fm99-dark mx-1"
        >
          <div className="relative -mt-2">
            <div
              className={classNames(
                'bg-fm99 dark:bg-fm99-dark text-xs text-white absolute -bottom-2.5 px-1 left-1/2 -translate-x-1/2 rounded-sm'
              )}
            >
              FM99
            </div>
            <PodcastsRounded />
          </div>
        </Link>
      )}
      {app.tag === 'FM99' && (
        <Link
          href={'https://fm97.ams.com.kh/live'}
          target="_blank"
          className="text-fm97 dark:text-fm97-dark mx-1"
        >
          <div className="relative -mt-2">
            <div
              className={classNames(
                'bg-fm97 dark:bg-fm97-dark text-xs text-white absolute -bottom-2.5 px-1 left-1/2 -translate-x-1/2 rounded-sm'
              )}
            >
              FM97
            </div>
            <PodcastsRounded />
          </div>
        </Link>
      )}
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

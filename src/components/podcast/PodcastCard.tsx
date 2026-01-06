'use client';

import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { Card, CardFooter, CardHeader, Image } from '@heroui/react';
import { AccessTimeRounded, CircleRounded } from '@mui/icons-material';
import classNames from 'classnames';
import NextImage from 'next/image';
import { useRouter } from 'nextjs-toploader/app';

interface IProps extends IComponentProps {
  title?: string;
  tag?: string;
  imageUrl?: string;
  to?: string;
  isLive?: boolean;
  isPlayed?: boolean;
  isNext?: boolean;
  isReplayed?: boolean;
}

const PodcastCard = (props: IProps) => {
  const router = useRouter();
  const {
    className,
    title,
    tag,
    imageUrl,
    to,
    isLive,
    isPlayed,
    isNext,
    isReplayed,
  } = props;

  return (
    <Card
      isPressable={!!to}
      onPress={() => (to ? router.push(to) : {})}
      className={classNames(className, 'dark')}
    >
      <div className="relative aspect-3/2">
        <Image
          fill
          as={NextImage}
          isZoomed
          removeWrapper
          sizes="(max-width: 768px) 100vw, 50vw"
          className={classNames(
            'z-0 object-cover opacity-100',
            isPlayed ? 'brightness-50' : ''
          )}
          src={imageUrl || app.logo}
          fallbackSrc={app.logo}
          alt={title}
        />
      </div>
      <CardHeader className="absolute z-auto top-1 flex-col items-start! ">
        {tag && (
          <p className="text-title uppercase font-semibold mb-1">{tag}</p>
        )}
        <h3 className="text-title font-medium text-large bg-ams-primary dark:bg-ams-primary-dark rounded-small px-2">
          {title}
        </h3>
        {isReplayed && (
          <div className="absolute top-4 -right-10 rotate-45 bg-gradient-title text-white text-sm font-semibold px-12 py-1">
            Replay
          </div>
        )}
      </CardHeader>
      {isLive && (
        <CardFooter className="justify-between bg-black/50 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
          <p className="text-body py-1">Live Now</p>
          <CircleRounded className="text-ams-red animate-pulse" />
        </CardFooter>
      )}
      {isNext && (
        <CardFooter className="justify-between bg-black/50 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
          <p className="text-body py-1">Up Next</p>
          <AccessTimeRounded className="text-ams-red" />
        </CardFooter>
      )}
    </Card>
  );
};

export default PodcastCard;

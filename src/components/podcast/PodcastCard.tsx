'use client';

import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { Card, CardFooter, CardHeader, Image } from '@heroui/react';
import { AccessTimeRounded, CircleRounded } from '@mui/icons-material';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

interface IProps extends IComponentProps {
  title?: string;
  tag?: string;
  imageUrl?: string;
  to?: string;
  isLive?: boolean;
  isPlayed?: boolean;
  isNext?: boolean;
}

const PodcastCard = (props: IProps) => {
  const router = useRouter();
  const { className, title, tag, imageUrl, to, isLive, isPlayed, isNext } =
    props;

  return (
    <Card
      isPressable
      onPress={() => (to ? router.push(to) : {})}
      className={className}
    >
      <Image
        isZoomed
        removeWrapper
        className={classNames(
          'z-0 w-full h-full object-cover opacity-100',
          isPlayed ? 'brightness-50' : ''
        )}
        src={imageUrl || app.logo}
        fallbackSrc={app.logo}
        width={400}
        alt={title}
      />
      <CardHeader className="absolute z-auto top-1 flex-col items-start!">
        {tag && (
          <p className="text-sm text-white/60 uppercase font-bold">{tag}</p>
        )}
        <h4 className="text-white font-medium text-large bg-ams-primary/90 px-2">
          {title}
        </h4>
      </CardHeader>
      {isLive && (
        <CardFooter className="justify-between bg-black/50 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
          <p className="text-white/80 py-1">Live Now</p>
          <CircleRounded className="text-ams-red animate-pulse" />
        </CardFooter>
      )}
      {isNext && (
        <CardFooter className="justify-between bg-black/50 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
          <p className="text-white/80 py-1">Up Next</p>
          <AccessTimeRounded className="text-ams-red" />
        </CardFooter>
      )}
    </Card>
  );
};

export default PodcastCard;

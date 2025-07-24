'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, Image } from "@heroui/react";
import app from '@/configs/app';
import { IComponentProps } from '@/types/component';

interface IProps extends IComponentProps {
  title: string;
  tag?: string;
  imageUrl?: string;
  to?: string;
}

const PodcastCard = (props: IProps) => {
  const router = useRouter();
  const { className, title, tag, imageUrl, to } = props;

  return (
    <Card
      isPressable
      onPress={() => to ? router.push(to) : {}}
      className={className}
    >
      <Image
        isZoomed
        removeWrapper
        className="z-0 w-full h-full object-cover opacity-100"
        src={imageUrl || app.appLogo}
        fallbackSrc={app.appLogo}
        width={400}
        alt={title}
      />
      <CardHeader className="absolute z-auto top-1 flex-col !items-start">
        { tag && (
          <p className="text-sm text-white/60 uppercase font-bold">
            {tag}
          </p>
        )}
        <h4 className="text-white font-medium text-large bg-ams-red/90 px-2">
          {title}
        </h4>
      </CardHeader>
    </Card>
  );
};

export default PodcastCard;

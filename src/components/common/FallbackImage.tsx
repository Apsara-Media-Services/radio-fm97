'use client';

import { IFallbackImageComponentProps } from '@/types/component';
import { useState } from 'react';
import Image from 'next/image';
import app from '@/configs/app';

const FallbackImage = (props: IFallbackImageComponentProps) => {
  const {
    src,
    fallbackSrc = app.logo,
    className = 'object-cover',
    alt,
    ...attributes
  } = props;

  const [imgSrc, setImgSrc] = useState(src);
  const [imgClassName] = useState(className);

  if (!src) return <></>;

  return (
    <Image
      {...attributes}
      alt={alt || app.name}
      src={imgSrc}
      className={imgClassName}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default FallbackImage;

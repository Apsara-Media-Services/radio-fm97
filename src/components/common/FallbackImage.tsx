'use client';

import { APP_NAME_ALT, LOGO } from '@/constants/app';
import { IFallbackImageComponentProps } from '@/types/component';
import { useState } from 'react';
import Image from 'next/image';

const FallbackImage = (props: IFallbackImageComponentProps) => {
  const {
    src,
    fallbackSrc = LOGO,
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
      alt={alt || APP_NAME_ALT}
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

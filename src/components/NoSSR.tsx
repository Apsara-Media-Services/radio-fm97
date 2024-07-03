'use client';

import { INoSSRComponentProps } from '@/types/component';
import { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

const useEnhancedEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? useLayoutEffect
    : useEffect;

const NoSSR = ({
  children,
  defer = false,
  fallback = null,
}: INoSSRComponentProps) => {
  const [isMounted, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);

  useEffect(() => {
    if (defer) setMountedState(true);
  }, [defer]);

  return isMounted ? children : fallback;
};

NoSSR.propTypes = {
  children: PropTypes.node.isRequired,
  defer: PropTypes.bool,
  fallback: PropTypes.node,
};

export default NoSSR;

'use client';

import { IComponentProps } from '@/types/component';
import { useEffect, useState } from 'react';

const ClientOnly = ({ children, ...delegated }: IComponentProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return <></>;

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;

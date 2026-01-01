'use client';

import { IComponentProps } from '@/types/component';
import { useEffect, useState } from 'react';

const ClientOnly = ({ children }: IComponentProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return <></>;

  return <>{children}</>;
};

export default ClientOnly;

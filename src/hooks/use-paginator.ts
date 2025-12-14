'use client';

import { IPaginator } from '@/types/fetch';
import { useState } from 'react';

const usePaginator = <T>() => {
  const [items, setItems] = useState<T[]>([]);
  const [paginator, setPaginator] = useState<IPaginator>({} as IPaginator);

  return {
    items,
    setItems,
    paginator,
    setPaginator,
  };
};

export default usePaginator;

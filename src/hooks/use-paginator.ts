'use client';

import ApiBaseService from '@/services/ApiBaseService';
import { IFetchQueryParams, IPaginator } from '@/types/fetch';
import { useState } from 'react';

interface IUsePaginatorParams<T> {
  service: ApiBaseService<T>;
  query?: Omit<IFetchQueryParams, 'page' | 'per_page'>;
  items?: T[];
  paginator?: IPaginator;
}

const usePaginator = <T>(params: IUsePaginatorParams<T>) => {
  const {
    service,
    query: initialQuery = {},
    items: initialItems = [],
    paginator: initialPaginator = {} as IPaginator,
  } = params;

  const [items, setItems] = useState<T[]>(initialItems);
  const [paginator, setPaginator] = useState<IPaginator>(initialPaginator);
  const [query, setQuery] =
    useState<Omit<IFetchQueryParams, 'page' | 'per_page'>>(initialQuery);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    setLoading(true);
    const {
      data,
      pagination,
      query: _query,
    } = await service.all({
      page: paginator.page + 1,
      per_page: paginator.per_page,
      ...query,
    });
    setItems((prev) => [...prev, ...data]);
    setPaginator(pagination);
    setQuery(_query || {});
    setLoading(false);
  };

  return {
    items,
    paginator,
    query,
    loading,
    setItems,
    setPaginator,
    setLoading,
    loadMore,
  };
};

export default usePaginator;

import { IObject } from '@/types/app';

export interface IFetchBody {
  query?: string;
  variables?: {
    first?: number;
    after?: string;
    relationshipFirst?: number;
    relationshipAfter?: string;
    where?: IObject;
    [key: string]: any;
  };
  next?: {
    revalidate: string | number;
  };
  [key: string]: any;
}

export interface IFetchQueryParams {
  _embed?: boolean;
  acf_format?: string;
  search?: string;
  slug?: string;
  after?: string;
  before?: string;
  include?: string;
  exclude?: string;
  categories?: string;
  categories_exclude?: string;
  programs?: string;
  tags?: string;
  page?: number;
  per_page?: number;
  parent?: number;
  order?: 'asc' | 'desc';
  orderby?:
    | 'date'
    | 'relevance'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'modified';
  [key: string]: any;
}

export interface IFetchResponse<T> {
  data: T;
  errors?: {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
    extensions?: IObject;
  }[];
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total_pages: number;
    total: number;
  };
  query?: Omit<IFetchQueryParams, 'page' | 'per_page'>;
}

export interface IPaginator {
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
}

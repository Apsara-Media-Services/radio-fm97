import BaseDto from '@/services/dto/BaseDto';
import { IFetchQueryParams, IPaginatedResponse } from '@/types/fetch';
import { first } from 'lodash';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { notFound } from 'next/navigation';
import pluralize from 'pluralize';

const revalidate = process.env.NEXT_PUBLIC_APP_REVALIDATE || 60;
const baseUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/`;

export default class ApiBaseService<T = unknown> {
  key: string;
  query: IFetchQueryParams = {};

  constructor(key: string, query?: IFetchQueryParams) {
    this.key = key;
    this.query = {
      _embed: true,
      acf_format: 'standard',
      ...query,
    };
  }

  async all(query: IFetchQueryParams = {}): Promise<IPaginatedResponse<T>> {
    const params: IFetchQueryParams = {
      page: 1,
      per_page: 10,
      ...query,
    };
    const response = await this.request<T[]>('GET', '', query);
    const data: T[] = await response.json();

    return {
      page: params.page || 1,
      per_page: params.per_page || 10,
      total_pages: Number(response.headers.get('X-WP-TotalPages')) || 1,
      total: Number(response.headers.get('X-WP-Total')) || data.length,
      data: BaseDto.normalize<T>(data),
    };
  }

  async find(id: number | string, query: IFetchQueryParams = {}): Promise<T> {
    const response = await this.request<T>('GET', id, query);
    const data = await response.json();
    return BaseDto.normalize<T>(data);
  }

  async findBySlug(slug: string, query: IFetchQueryParams = {}): Promise<T> {
    const params = {
      ...query,
      slug,
    };
    const response = await this.request<T[]>('GET', '', params);
    const items: T[] = await response.json();
    const data = first(items);

    if (!data) {
      return notFound();
    }

    return BaseDto.normalize<T>(data);
  }

  request = async <D>(
    method: HTTP_METHOD,
    path?: number | string | null,
    query?: IFetchQueryParams
  ) => {
    const resource = pluralize(this.key);
    const endpoint =
      path !== null && path !== undefined ? `${resource}/${path}` : resource;

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      next: { revalidate: Number(revalidate) },
    };
    const params: IFetchQueryParams = {
      ...this.query,
      ...query,
    };
    const url = `${baseUrl}${endpoint}?${this.parseQueryParams(params)}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      const {
        code,
        message,
        data: { status },
      } = await response.json();

      switch (status) {
        case 404:
          return notFound();

        default:
          throw {
            name: 'FetchError',
            code,
            status,
            message,
          };
          break;
      }
    }

    return response;
  };

  parseQueryParams = (params: IFetchQueryParams) => {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryString.append(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    return queryString.toString();
  };
}

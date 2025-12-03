import { IObject } from '@/types/app';
import { get, has, head, map } from 'lodash';
import pluralize from 'pluralize';

export default class BaseService {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  async submit<T = any>(body: IObject): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`;
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    };
    try {
      const res = await fetch(url, init);
      const { data, errors } = await res.json();

      if (errors?.length) {
        throw new Error(
          get(head(errors), 'message') || 'Unknown GraphQL error'
        );
      }

      if (has(data, pluralize(this.key))) {
        return map(
          get(data, `${pluralize(this.key)}.edges`),
          ({ node }) => node
        ) as T;
      }

      return get(data, this.key) as T;
    } catch (err) {
      throw err;
    }
  }
}

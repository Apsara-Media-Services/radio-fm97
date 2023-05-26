import { IObject } from '@/types/app';
import { get, has, head, isArray, map } from 'lodash';
import pluralize from 'pluralize';

export default class BaseService {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  submit<T = any>(body: IObject): Promise<T> {
    const url = `${process.env.WORDPRESS_API_URL}/graphql`;
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then((res) => res.json())
        .then(({ data, errors }: any) => {
          if (errors) {
            return reject(get(head(errors), 'message'));
          }

          if (has(data, pluralize(this.key))) {
            return resolve(
              map(
                get(data, `${pluralize(this.key)}.edges`),
                ({ node }) => node
              ) as T
            );
          }
          return resolve(get(data, `${this.key}`));
        })
        .catch((err) => reject(err));
    });
  }
}

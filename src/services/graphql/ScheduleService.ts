import { QUERY_ALL_SCHEDULES } from '@/gql/queries/schedule';
import { IObject } from '@/types/app';
import { get, head } from 'lodash';

export default class ScheduleService {
  submit<T = any>(body: IObject): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`;
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    };
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then((res) => res.json())
        .then(({ data, errors }: any) => {
          if (errors) {
            return reject(get(head(errors), 'message'));
          }

          return resolve(get(data, `getSchedule`));
        })
        .catch((err) => reject(err));
    });
  }

  all() {
    return this.submit({
      query: QUERY_ALL_SCHEDULES,
    });
  }
}

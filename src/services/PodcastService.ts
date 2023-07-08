import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';
import {
  QUERY_ALL_PODCASTS,
  QUERY_POSTS_BY_PODCAST_ID_TYPE,
} from '@gql/queries/podcast';

export default class PodcastService extends BaseService {
  constructor() {
    super('podcast');
  }

  getPodcasts(param: IFetchBody = {}) {
    return this.submit<any[]>({
      query: QUERY_ALL_PODCASTS,
      ...param,
    });
  }

  getPodcastPosts(slug: string, param: any = {}) {
    return this.submit<any>({
      query: QUERY_POSTS_BY_PODCAST_ID_TYPE,
      ...param,
      variables: {
        ...param.variables,
        idType: 'SLUG',
        id: slug,
      },
    });
  }
}

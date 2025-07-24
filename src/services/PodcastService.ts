import { Podcast } from '@/gql/graphql';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';
import {
  QUERY_ALL_PODCASTS,
  QUERY_PODCAST_BY_ID_TYPE,
  QUERY_PODCAST_BY_ID_TYPE_WITH_POSTS,
  QUERY_POSTS_BY_PODCAST_ID_TYPE,
} from '@gql/queries/podcast';

export default class PodcastService extends BaseService {
  constructor() {
    super('podcast');
  }

  all(param: IFetchBody = {}) {
    return this.submit<Podcast[]>({
      query: QUERY_ALL_PODCASTS,
      ...param,
    });
  }

  find(id: string | number, param: IFetchBody = {}) {
    return this.submit<Podcast>({
      query: QUERY_PODCAST_BY_ID_TYPE,
      ...param,
      variables: {
        idType: 'SLUG',
        id,
        ...param.variables,
      },
    });
  }

  findWithPosts(id: string | number, param: IFetchBody = {}) {
    return this.find(id, {
      query: QUERY_PODCAST_BY_ID_TYPE_WITH_POSTS,
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

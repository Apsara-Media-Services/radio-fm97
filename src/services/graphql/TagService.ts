import { Tag } from '@/gql/graphql';
import {
  QUERY_ALL_TAGS,
  QUERY_TAG_BY_ID_TYPE_WITH_POSTS,
} from '@/gql/queries/tag';
import BaseService from '@/services/graphql/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class TagService extends BaseService {
  constructor() {
    super('tag');
  }

  all(param: IFetchBody = {}) {
    return this.submit<Tag[]>({
      query: QUERY_ALL_TAGS,
      ...param,
    });
  }

  findBySlugWithPosts(slug: string, param: IFetchBody = {}) {
    return this.submit<Tag>({
      query: QUERY_TAG_BY_ID_TYPE_WITH_POSTS,
      ...param,
      variables: {
        ...param.variables,
        idType: 'SLUG',
        id: slug,
      },
    });
  }
}

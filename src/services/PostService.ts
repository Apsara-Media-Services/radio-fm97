import { QUERY_ALL_POSTS, QUERY_POST_BY_ID } from '@/gql/queries/post';
import BaseService from '@/services/BaseService';
import { IObject } from '@/types/app';
import { IFetchBody } from '@/types/fetch';

export default class PostService extends BaseService {
  constructor() {
    super('post');
  }

  all(param: IFetchBody = {}) {
    return this.submit({
      query: QUERY_ALL_POSTS,
      ...param,
    });
  }

  getByCategorySlug(slug: string | string[], param: IFetchBody = {}) {
    return this.submit({
      query: QUERY_ALL_POSTS,
      ...param,
      variables: {
        ...param.variables,
        where: {
          orderby: [{ field: 'DATE', order: 'DESC' }],
          categoryName: slug,
        },
      },
    });
  }

  find(id: string | number) {
    return this.submit({
      query: QUERY_POST_BY_ID,
      variables: { id },
    });
  }
}

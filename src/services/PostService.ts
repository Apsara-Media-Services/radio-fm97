import { Post } from '@/gql/graphql';
import { QUERY_ALL_POSTS, QUERY_POST_BY_ID } from '@/gql/queries/post';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class PostService extends BaseService {
  constructor() {
    super('post');
  }

  all(param: IFetchBody = {}) {
    return this.submit<Post[]>({
      query: QUERY_ALL_POSTS,
      ...param,
    });
  }

  getByCategorySlug(slug: string | string[], param: IFetchBody = {}) {
    return this.submit<Post[]>({
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
    return this.submit<Post>({
      query: QUERY_POST_BY_ID,
      variables: { id },
    });
  }
}

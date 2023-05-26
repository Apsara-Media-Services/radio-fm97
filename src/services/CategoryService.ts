import { QUERY_ALL_CATEGORIES, QUERY_CATEGORY_WITH_POSTS_BY_SLUG } from '@/gql/queries/category';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class CategoryService extends BaseService {
  constructor() {
    super('category');
  }

  all(param: IFetchBody = {}) {
    return this.submit({
      query: QUERY_ALL_CATEGORIES,
      ...param,
    });
  }

  findBySlugWithPosts(slug: string) {
    return this.submit({
      query: QUERY_CATEGORY_WITH_POSTS_BY_SLUG,
      variables: { slug },
    });
  }
}

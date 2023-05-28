import { Category } from '@/gql/graphql';
import {
  QUERY_ALL_CATEGORIES,
  QUERY_CATEGORY_BY_ID_TYPE_WITH_POSTS,
} from '@/gql/queries/category';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class CategoryService extends BaseService {
  constructor() {
    super('category');
  }

  all(param: IFetchBody = {}) {
    return this.submit<Category[]>({
      query: QUERY_ALL_CATEGORIES,
      ...param,
    });
  }

  findBySlugWithPosts(slug: string, param: IFetchBody = {}) {
    return this.submit<Category>({
      query: QUERY_CATEGORY_BY_ID_TYPE_WITH_POSTS,
      ...param,
      variables: {
        ...param.variables,
        idType: 'SLUG',
        id: slug,
      },
    });
  }
}

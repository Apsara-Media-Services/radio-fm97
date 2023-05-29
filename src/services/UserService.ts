import { User } from '@/gql/graphql';
import {
  QUERY_ALL_USERS,
  QUERY_TEST,
  QUERY_USER_BY_ID_TYPE_WITH_POSTS,
} from '@/gql/queries/user';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class UserService extends BaseService {
  constructor() {
    super('user');
  }

  all(param: IFetchBody = {}) {
    return this.submit<User[]>({
      query: QUERY_ALL_USERS,
      ...param,
    });
  }

  findBySlugWithPosts(slug: string, param: IFetchBody = {}) {
    return this.submit<User>({
      query: QUERY_USER_BY_ID_TYPE_WITH_POSTS,
      ...param,
      variables: {
        ...param.variables,
        idType: 'SLUG',
        id: slug,
      },
    });
  }

  test() {
    return this.submit<User>({
      query: QUERY_TEST,
      variables: {
        id: 'dXNlcjox',
      },
    });
  }
}

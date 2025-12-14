import { User } from '@/gql/graphql';
import {
  QUERY_ALL_USERS,
  QUERY_ALL_USERS_WITH_POSTS,
} from '@/gql/queries/user';
import BaseService from '@/services/graphql/BaseService';
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

  allWithPosts(param: IFetchBody = {}) {
    return this.submit<User[]>({
      query: QUERY_ALL_USERS_WITH_POSTS,
      ...param,
    });
  }
}

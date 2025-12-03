import app from '@/configs/app';
import { Program } from '@/gql/graphql';
import {
  QUERY_ALL_PROGRAMS,
  QUERY_PROGRAM_BY_ID_TYPE_WITH_POSTS,
} from '@/gql/queries/program';
import BaseService from '@/services/BaseService';
import { IFetchBody } from '@/types/fetch';

export default class ProgramService extends BaseService {
  constructor() {
    super('program');
  }

  all(
    param: IFetchBody = {
      variables: {
        where: {
          parent: app.program.databaseId,
        },
        first: 100,
      },
    }
  ) {
    return this.submit<Program[]>({
      query: QUERY_ALL_PROGRAMS,
      ...param,
    });
  }

  findBySlugWithPosts(slug: string, param: IFetchBody = {}) {
    return this.submit<Program>({
      query: QUERY_PROGRAM_BY_ID_TYPE_WITH_POSTS,
      ...param,
      variables: {
        ...param.variables,
        idType: 'SLUG',
        id: slug,
      },
    });
  }
}

import { ITEM_PER_PAGE } from '@/constants/query';
import { POST_FIELDS, USER_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_USERS = `
  ${USER_FIELDS}
  query AllUsers($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToUserConnectionWhereArgs) {
    users(first: $first, where: $where) {
      edges {
        node {
          ...UserFields
        }
      }
    }
  }
`;

export const QUERY_USER_BY_ID_TYPE_WITH_POSTS = `
  query UserByIdTypeWithPosts {
    user(id: "chetra", idType: SLUG) {
      id
      name
      slug
    }
  }
`;

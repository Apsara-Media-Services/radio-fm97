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

export const QUERY_ALL_USERS_WITH_POSTS = `
  ${USER_FIELDS}
  ${POST_FIELDS}
  query AllUsersWithPosts($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToUserConnectionWhereArgs, $postFirst: Int = ${ITEM_PER_PAGE}, $postAfter: String) {
    users(first: $first, where: $where) {
      edges {
        node {
          ...UserFields
          posts(first: $postFirst, after: $postAfter) {
            edges {
              node {
                ...PostFields
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
          }
        }
      }
    }
  }
`;

import { ITEM_PER_PAGE } from '@/constants/query';
import { USER_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_USERS = `
  ${USER_FIELDS}
  query AllUsers($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToUserConnectionWhereArgs = { hasPassword: false }) {
    users(first: $first, where: $where) {
      edges {
        node {
          ...UserFields
        }
      }
    }
  }
`;

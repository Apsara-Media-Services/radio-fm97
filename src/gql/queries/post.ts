import { ITEM_PER_PAGE } from '@/constants/query';
import { POST_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_POSTS = `
  ${POST_FIELDS}
  query AllPosts($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToPostConnectionWhereArgs = { orderby: { field: DATE, order: DESC } }) {
    posts(first: $first, where: $where) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POST_BY_ID = `
  query PostBySlug($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostFields
    }
  }
`;

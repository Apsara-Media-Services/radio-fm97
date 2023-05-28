import { ITEM_PER_PAGE } from '@/constants/query';
import { POST_FIELDS, TAG_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_TAGS = `
  ${TAG_FIELDS}
  query AllTags($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToTagConnectionWhereArgs) {
    tags(first: $first, where: $where) {
      edges {
        node {
          ...TagFields
        }
      }
    }
  }
`;

export const QUERY_TAG_BY_ID_TYPE_WITH_POSTS = `
  ${TAG_FIELDS}
  ${POST_FIELDS}
  query TagByIdTypeWithPosts($id: ID!, $idType: TagIdType, $first: Int = ${ITEM_PER_PAGE}, $after: String) {
    tag(idType: $idType, id: $id) {
      ...TagFields
      posts(first: $first, after: $after) {
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
`;

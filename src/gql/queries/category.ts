import { ITEM_PER_PAGE } from '@/constants/query';
import { CATEGORY_FIELDS, POST_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_CATEGORIES = `
  ${CATEGORY_FIELDS}
  query AllCategories($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToCategoryConnectionWhereArgs) {
    categories(first: $first, where: $where) {
      edges {
        node {
          ...CategoryFields
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_BY_ID_TYPE_WITH_POSTS = `
  ${CATEGORY_FIELDS}
  ${POST_FIELDS}
  query CategoryByIdTypeWithPosts($id: ID!, $idType: CategoryIdType, $first: Int = ${ITEM_PER_PAGE}, $after: String) {
    category(idType: $idType, id: $id) {
      ...CategoryFields
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

export const QUERY_CATEGORY_WITH_POSTS_BY_SLUG = `
  ${CATEGORY_FIELDS}
  ${POST_FIELDS}
  query CategoryWithPostsBySlug(
    $slug: [String]!
    $first: Int! = ${ITEM_PER_PAGE}
  ) {
    category(
      where: { slug: $slug }
    ) {
      edges {
        node {
          ...CategoryFields
          posts(first: $first) {
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

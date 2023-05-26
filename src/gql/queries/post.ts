import { ITEM_PER_PAGE } from '@/constants/query';
import { CATEGORY_FIELDS, POST_FIELDS, USER_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_POSTS = `
  ${POST_FIELDS}
  ${CATEGORY_FIELDS}
  ${USER_FIELDS}
  query AllPosts($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToPostConnectionWhereArgs = { orderby: { field: DATE, order: DESC } }) {
    posts(first: $first, where: $where) {
      edges {
        node {
          ...PostFields
          featuredImage {
            node {
              id
              altText
              caption
              sourceUrl
              srcSet
              sizes
            }
          }
          author {
            node {
              ...UserFields
            }
          }
          categories {
            edges {
              node {
                ...CategoryFields
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_POST_BY_ID = `
  query PostBySlug($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostFields
      featuredImage {
        node {
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
          sourceUrl
        }
      }
      author {
        node {
          ...UserFields
        }
      }
      categories {
        edges {
          node {
            ...CategoryFields
          }
        }
      }
    }
  }
`;

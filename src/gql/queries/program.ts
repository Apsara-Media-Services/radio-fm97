import { ITEM_PER_PAGE } from '@/constants/query';
import {
  PAGE_INFO_FIELDS,
  POST_FIELDS,
  PROGRAM_FIELDS,
} from '@/gql/queries/fragments';

export const QUERY_ALL_PROGRAMS = `
  ${PROGRAM_FIELDS}
  ${PAGE_INFO_FIELDS}
  query AllPrograms($first: Int = ${ITEM_PER_PAGE}, $where: RootQueryToProgramConnectionWhereArgs) {
    programs(first: $first, where: $where) {
      edges {
        node {
          ...ProgramFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export const QUERY_PROGRAM_BY_ID_TYPE_WITH_POSTS = `
  ${PROGRAM_FIELDS}
  ${POST_FIELDS}
  ${PAGE_INFO_FIELDS}
  query ProgramByIdTypeWithPosts($id: ID!, $idType: ProgramIdType, $first: Int = ${ITEM_PER_PAGE}, $after: String) {
    program(idType: $idType, id: $id) {
      ...ProgramFields
      posts(first: $first, after: $after) {
        edges {
          node {
            ...PostFields
          }
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
`;

// export const QUERY_CATEGORY_WITH_POSTS_BY_SLUG = `
//   ${CATEGORY_FIELDS}
//   ${POST_FIELDS}
//   query CategoryWithPostsBySlug(
//     $slug: [String]!
//     $first: Int! = ${ITEM_PER_PAGE}
//   ) {
//     program(
//       where: { slug: $slug }
//     ) {
//       edges {
//         node {
//           ...CategoryFields
//           posts(first: $first) {
//             edges {
//               node {
//                 ...PostFields
//               }
//             }
//             pageInfo {
//               hasNextPage
//               hasPreviousPage
//               endCursor
//               startCursor
//             }
//           }
//         }
//       }
//     }
//   }
// `;

import { ITEM_PER_PAGE } from '@/constants/query';
import { PODCAST_FIELDS, POST_FIELDS } from '@/gql/queries/fragments';

export const QUERY_ALL_PODCASTS = `
  ${PODCAST_FIELDS}
  query AllPodCasts($first: Int = ${ITEM_PER_PAGE}) {
    podcasts(first: $first) {
      edges {
        node {
          ...PodCastFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_PODCAST_ID_TYPE = `
  ${PODCAST_FIELDS}
  ${POST_FIELDS}
  query PostsByPodcastIdType($id: ID!, $idType: PodcastIdType, $first: Int = ${ITEM_PER_PAGE}, $after: String) {
    podcast(idType: $idType, id: $id) {
      ...PodCastFields
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

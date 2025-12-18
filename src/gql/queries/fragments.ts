export const MEDIA_ITEM_FIELDS = `
  fragment MediaItemFields on MediaItem {
    id
    sourceUrl
    mediaDetails {
      sizes {
        sourceUrl
        name
      }
    }
  }
`;

export const POST_FIELDS = `
  fragment PostFields on Post {
    enclosure
    id
    databaseId
    slug
    title
    date
    content
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        mediaDetails {
          sizes {
            sourceUrl
            name
          }
        }
      }
    }
    author {
      node {
        id
        name
        slug
        firstName
        lastName
        avatar {
          height
          url
          width
        }
      }
    }
    categories {
      nodes {
        id
        databaseId
        name
        slug
        uri
        description
      }
    }
    programs {
      nodes {
        id
        databaseId
        name
        slug
        uri
        description
      }
    }
  }
`;

export const CATEGORY_FIELDS = `
  fragment CategoryFields on Category {
    id
    databaseId
    name
    slug
    uri
    description
  }
`;

export const PROGRAM_FIELDS = `
  fragment ProgramFields on Program {
    id
    databaseId
    name
    slug
    uri
    description
    radio {
      thumbnail {
        node {
          id
            sourceUrl
            mediaDetails {
              sizes {
                sourceUrl
                name
              }
            }
        }
      }
      schedules {
        day
        startTime
        endTime
      }
    }
  }
`;

export const USER_FIELDS = `
  fragment UserFields on User {
    id
    databaseId
    name
    slug
    firstName
    lastName
    description
    avatar {
      height
      url
      width
    }
  }
`;

export const TAG_FIELDS = `
  fragment TagFields on Tag {
    id
    databaseId
    name
    slug
    description
  }
`;

export const PODCAST_FIELDS = `
  fragment PodCastFields on Podcast {
    id
    databaseId
    coverImage
    name
    slug
    description
    count
  }
`;

export const PAGE_INFO_FIELDS = `
  fragment PageInfoFields on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

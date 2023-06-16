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
      edges {
        node {
          id
          databaseId
          name
          slug
          uri
          description
        }
      }
    }
    podcasts {
      edges {
        node {
          id
          databaseId
          name
          slug
          uri
          description
        }
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
  fragment PodCastFields on Tag {
    id
    databaseId
    name
    slug
    description
    count
  }
`;

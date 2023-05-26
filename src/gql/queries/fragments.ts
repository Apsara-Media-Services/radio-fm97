export const POST_FIELDS = `
  fragment PostFields on Post {
    id
    databaseId
    slug
    title
    date
    content
    excerpt
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
`;

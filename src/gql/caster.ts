import { Category, MediaItem, Program, Tag, User } from '@/gql/graphql';
import { Post } from '@/gql/graphql';
import { map, split } from 'lodash';

export class Caster {
  static post(post = {} as Post) {
    const categories: Category[] = map(
      post?.categories?.edges,
      ({ node }) => node
    );
    const programs: Program[] = map(post?.programs?.edges, ({ node }) => node);

    const author = post?.author?.node || ({} as User);

    const featuredImage = post?.featuredImage?.node || ({} as MediaItem);

    return {
      programs,
      author,
      categories,
      featuredImage,
    };
  }

  static category(category = {} as Category) {
    const posts: Post[] = map(category?.posts?.edges, ({ node }) => node);

    return {
      posts,
    };
  }

  static program(program = {} as Program) {
    const posts: Post[] = map(program?.posts?.edges, ({ node }) => {
      const url = split(node.enclosure, '\n', 1);
      return { ...node, audioUrl: url[0] };
    });

    return {
      posts,
    };
  }

  static user(user = {} as User) {
    const posts: Post[] = map(user?.posts?.edges, ({ node }) => node);

    return {
      posts,
    };
  }

  static tag(tag = {} as Tag) {
    const posts: Post[] = map(tag?.posts?.edges, ({ node }) => node);

    return {
      posts,
    };
  }
}

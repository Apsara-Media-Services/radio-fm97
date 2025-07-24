import { Category, MediaItem, Podcast, Tag, User } from '@/gql/graphql';
import { Post } from '@/gql/graphql';
import { map, split } from 'lodash';

export class Caster {
  static post(post = {} as Post) {
    const categories: Category[] = map(
      post?.categories?.edges,
      ({ node }) => node
    );
    const podcasts: Podcast[] = map(post?.podcasts?.edges, ({ node }) => node);

    const author = post?.author?.node || ({} as User);

    const featuredImage = post?.featuredImage?.node || ({} as MediaItem);

    return {
      podcasts,
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

  static podcast(podcast = {} as Podcast) {
    const posts: Post[] = map(podcast?.posts?.edges, ({ node }) => {
      const url = split(node.enclosure, '\n', 1);
      return { ...node, url: url[0] };
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

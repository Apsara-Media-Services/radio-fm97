'use client';

import AuthorCard from '@/components/page/author/AuthorCard';
import PostItem from '@/components/post/PostItem';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Post, User } from '@/gql/graphql';
import { UserService } from '@/services';
import { IComponentProps } from '@/types/component';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const userService = new UserService();

const InfiniteScrollPosts = ({ user: _user, slug }: IComponentProps) => {
  const [user, setUser] = useState<User>(_user);
  const [posts, setPosts] = useState<Post[]>(Caster.user(user).posts);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    setLoading(true);
    const _user = await userService.findBySlugWithPosts(slug as string, {
      variables: { first: 12, after: user.posts?.pageInfo.endCursor as string },
    });
    const { posts: _posts } = Caster.user(_user);

    setUser(_user);
    setPosts([...posts, ..._posts]);
    setLoading(false);
  };

  return (
    <>
      <SkeletonPostItem />
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={user?.posts?.pageInfo?.hasNextPage}
      >
        <section className="grid md:grid-cols-3 gap-5 sm:gap-7 mb-5">
          <AuthorCard user={user} />
          {posts.map((post) => (
            <PostItem
              key={`post-${post.databaseId}`}
              post={post}
              config={{
                showCategoryTag: true,
                showAuthor: false,
              }}
            />
          ))}
        </section>
      </InfiniteScroll>
      {loading && (
        <section className="grid md:grid-cols-3 gap-5 sm:gap-7 mb-5">
          <SkeletonPostItem />
          <SkeletonPostItem />
          <SkeletonPostItem />
        </section>
      )} */}
    </>
  );
};

export default InfiniteScrollPosts;

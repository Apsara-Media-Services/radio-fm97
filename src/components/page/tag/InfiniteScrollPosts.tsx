'use client';

import { SectionHeader } from '@/components/common';
import PostItem from '@/components/post/PostItem';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Post, Tag } from '@/gql/graphql';
import { TagService } from '@/services';
import { IComponentProps } from '@/types/component';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const tagService = new TagService();

const InfiniteScrollPosts = ({ tag: _tag, slug }: IComponentProps) => {
  const [tag, setTag] = useState<Tag>(_tag);
  const [posts, setPosts] = useState<Post[]>(Caster.tag(tag).posts);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    setLoading(true);
    const _tag = await tagService.findBySlugWithPosts(slug as string, {
      variables: { first: 12, after: tag.posts?.pageInfo.endCursor as string },
    });
    const { posts: _posts } = Caster.tag(_tag);

    setTag(_tag);
    setPosts([...posts, ..._posts]);
    setLoading(false);
  };

  return (
    <>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={tag?.name as string}
          className="text-xl font-semibold"
        />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={tag?.posts?.pageInfo?.hasNextPage}
      >
        <section className="grid md:grid-cols-3 gap-5 sm:gap-7 mb-5">
          {posts.map((post) => (
            <PostItem
              key={`post-${post.databaseId}`}
              post={post}
              config={{
                showCategoryTag: true,
                showAuthor: true,
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
      )}
    </>
  );
};

export default InfiniteScrollPosts;

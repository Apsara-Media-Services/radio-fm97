'use client';

import { SectionHeader } from '@/components/common';
import PostItem from '@/components/post/PostItem';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Category, Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { CategoryService } from '@/services';
import { IComponentProps } from '@/types/component';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const categoryService = new CategoryService();

const InfiniteScrollPosts = ({
  category: _category,
  slug,
}: IComponentProps) => {
  const [category, setCategory] = useState<Category>(_category);
  const [posts, setPosts] = useState<Post[]>(Caster.category(category).posts);
  const [loading, setLoading] = useState<boolean>(false);
  const { $breakpoints } = useBreakpoint();
  const itemsPerRow = $breakpoints.lgAndUp ? 3 : $breakpoints.mdAndUp ? 2 : 1;

  const loadMore = async () => {
    setLoading(true);
    const _category = await categoryService.findBySlugWithPosts(
      slug as string,
      {
        variables: {
          first: 12,
          after: category.posts?.pageInfo.endCursor as string,
        },
      }
    );
    const { posts: _posts } = Caster.category(_category);

    setCategory(_category);
    setPosts([...posts, ..._posts]);
    setLoading(false);
  };

  return (
    <>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={category?.name as string}
          className="text-3xl font-semibold"
        />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={category?.posts?.pageInfo?.hasNextPage}
      >
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-5">
          {posts.map((post, index) => (
            <PostItem
              key={`post-${post.databaseId}`}
              post={post}
              config={{
                showLineSeparator:
                  index <
                  Math.ceil(posts.length / itemsPerRow) * itemsPerRow -
                    itemsPerRow,
              }}
            />
          ))}
        </section>
      </InfiniteScroll>
      {loading && (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-5">
          {[...Array(itemsPerRow)].map((key) => (
            <SkeletonPostItem key={key} />
          ))}
        </section>
      )}
    </>
  );
};

export default InfiniteScrollPosts;

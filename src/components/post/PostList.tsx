'use client';

import PostCard from '@/components/post/PostCard';
import usePaginator from '@/hooks/use-paginator';
import PostService from '@/services/PostService';
import { IPaginationComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import { Button } from '@heroui/react';

const postService = new PostService();

const PostList = (props: IPaginationComponentProps<WP_REST_API_ACF_Post>) => {
  const { className, pageable } = props;
  const { items, loading, paginator, loadMore } =
    usePaginator<WP_REST_API_ACF_Post>({
      service: postService,
      query: props.query,
      items: props.items,
      paginator: props.paginator,
    });

  if (!items.length) {
    return <></>;
  }

  return (
    <section className={className}>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((post, key) => {
          return <PostCard key={key} post={post} />;
        })}
      </div>
      {pageable && paginator.page < paginator.total_pages && (
        <div className="text-center mt-5">
          <Button
            variant="bordered"
            className="text-base text-accent border-ams-primary font-semibold px-7"
            isLoading={loading}
            onPress={loadMore}
          >
            មើលបន្ថែម
          </Button>
        </div>
      )}
    </section>
  );
};

export default PostList;

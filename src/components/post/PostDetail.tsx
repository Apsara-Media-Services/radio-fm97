import PodcastPlayButton from '@/components/podcast/PodcastPlayButton';
import PostAuthor from '@/components/post/PostAuthor';
import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { IPostComponentProps } from '@/types/components/post';
import { WP_REST_API_ACF_Program } from '@/types/wp';
import { getMediaUrl } from '@/utils/wp';
import { first } from 'lodash';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

const PostDetail = ({ post, className }: IPostComponentProps) => {
  return (
    <article className={className}>
      <div className="text-sm">
        <PostCategoryTag post={post} />
      </div>
      <h1 className="font-semibold text-2xl md:text-3xl my-3">
        {sanitizeHtml(post?.title?.rendered as string, { allowedTags: [] })}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 my-3">
        <PostDate post={post} />
        <span className="hidden md:block">•</span>
        <PostAuthor post={post} />
      </div>

      <PodcastPlayButton
        className="my-2"
        program={
          first(post.relation?.programs) ?? ({} as WP_REST_API_ACF_Program)
        }
        post={post}
      />

      <Image
        alt={post?.title?.rendered as string}
        src={getMediaUrl(post.relation?.featuredmedia, 'original')}
        className={'w-full my-3'}
        width={828}
        height={552}
      />
      <div
        className="md:text-lg"
        dangerouslySetInnerHTML={{
          __html: post?.content?.rendered as string,
        }}
      />
    </article>
  );
};

export default PostDetail;

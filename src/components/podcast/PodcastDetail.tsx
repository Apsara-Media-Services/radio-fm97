import PodcastPlayButton from '@/components/podcast/PodcastPlayButton';
import PostDate from '@/components/post/PostDate';
import PostProgramTag from '@/components/post/PostProgramTag';
import { IPostComponentProps } from '@/types/components/post';
import { WP_REST_API_ACF_Program } from '@/types/wp';
import sanitizeHtml from 'sanitize-html';

// interface IProps extends IPostComponentProps {
//   program
// }

const PodcastDetail = ({ post, className }: IPostComponentProps) => {
  return (
    <article className={className}>
      <div className="text-sm">
        <PostProgramTag post={post} />
      </div>
      <h1 className="font-semibold text-2xl md:text-3xl my-2">
        {sanitizeHtml(post?.title?.rendered as string, { allowedTags: [] })}
      </h1>
      <PostDate post={post} />
      <PodcastPlayButton
        className="my-5"
        program={post.relation?.program as WP_REST_API_ACF_Program}
        post={post}
      />
      <div
        className="md:text-lg mt-5"
        dangerouslySetInnerHTML={{
          __html: post?.content?.rendered as string,
        }}
      />
    </article>
  );
};

export default PodcastDetail;

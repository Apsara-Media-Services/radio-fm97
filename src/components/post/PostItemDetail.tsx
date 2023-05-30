import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { IPostComponentProps } from '@/types/components/post';
import sanitizeHtml from 'sanitize-html';

const PostItemDetail = ({ post, className }: IPostComponentProps) => {
  return (
    <article className={className}>
      <h3 className="entry-title text-xl sm:text-3xl">
        {sanitizeHtml(post?.title as string, { allowedTags: [] })}
      </h3>
      <div className="flex flex-wrap my-5 items-center justify-between">
        <div className="flex flex-wrap items-center">
          <span className="text-sm">
            <PostCategoryTag
              post={post}
              config={{ showCategoryTagMultiple: true }}
            />
          </span>
          <span className="text-sm flex items-center pl-3">
            <PostDate post={post} />
          </span>
        </div>
      </div>
      <div
        className="md:text-lg"
        dangerouslySetInnerHTML={{
          __html: post?.content as string,
        }}
      />
    </article>
  );
};

export default PostItemDetail;

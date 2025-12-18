import { PostCategoryTag, PostDate } from '@/components/post';
import { IPostComponentProps } from '@/types/components/post';
import { getMediaUrl, getPostAudio } from '@/utils/wp';
import { HeadphonesOutlined } from '@mui/icons-material';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = (props: IPostComponentProps) => {
  const { className, post } = props;

  const { url } = getPostAudio(post);

  return (
    <div
      className={classNames(
        className,
        'rounded-large overflow-hidden shadow dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]'
      )}
    >
      <div className="relative aspect-3/2">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={post.title.rendered as string}
          src={getMediaUrl(post.relation?.featuredmedia)}
          className="object-cover rounded-t-large rounded-b-none"
        />
      </div>
      <div className="p-4">
        <PostCategoryTag post={post} className="text-sm" />
        <Link
          href={post.id ? `/news/detail/${post.id}` : '#'}
          className="flex gap-x-2"
        >
          <h3 className="font-medium text-lg my-2 leading-tight text-title text-hover line-clamp-3">
            {url && (
              <HeadphonesOutlined
                className="text-ams-primary inline mr-2 -mt-1"
                style={{ fontSize: 20 }}
              />
            )}
            {post?.title?.rendered as string}
          </h3>
        </Link>
        <div className="flex items-center gap-x-2">
          <PostDate post={post} className="text-meta" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;

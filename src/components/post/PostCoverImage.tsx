import ImageWithFallback from '../common/FallbackImage';
import PostCategoryTag from '@/components/post/PostCategoryTag';
import { MediaItem, Post } from '@/gql/graphql';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';


const PostCoverImage = (props: IPostComponentProps) => {
  const { className, classes: _classes, post, config = {} } = props;

  if (isNil(post?.featuredImage) || isEmpty(post?.featuredImage)) return <></>;

  const classes = {
    wrapper: '',
    imageWrapper: 'aspect-video',
    image: classNames('object-cover shadow-sm', {
      'hover:shadow-medium transition-shadow duration-200':
        config.linkable && post?.link,
    }),
    category: {},
    ..._classes,
  };

  const { title, link } = post || ({} as Post);
  const { sourceUrl } = post?.featuredImage.node || ({} as MediaItem);

  const imageElement = (
    <ImageWithFallback
      fill
      alt={title as string}
      src={sourceUrl as string}
      className={classes.image}
    />
  );
  return (
    <div className={classNames('relative', className, classes.wrapper)}>
      {config.linkable && link ? (
        <Link href={link} className={`flex relative ${classes.imageWrapper}`}>
          {imageElement}
        </Link>
      ) : (
        <div className={classNames('relative', classes.imageWrapper)}>
          {imageElement}
        </div>
      )}

      {config.showCategoryTag && (
        <PostCategoryTag
          post={post}
          config={config}
          classes={classes.category}
        />
      )}
    </div>
  );
};

export default PostCoverImage;

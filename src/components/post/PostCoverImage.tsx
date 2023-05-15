import classNames from 'classnames';
import find from 'lodash/find';
import Link from 'next/link';
import ImageWithFallback from '../common/FallbackImage';
import { IPostComponentProps, IPostConfig } from '@/types/components/post';
import { isEmpty, isNil } from 'lodash';
import { PlayIcon } from '@heroicons/react/24/outline';
import { MediaItem, Post } from '@/gql/graphql';
import PostCategoryTag from '@/components/post/PostCategoryTag';

const PostCoverImage = (props: IPostComponentProps) => {
  const { className, classes: _classes, post, config: _config } = props;

  if (isNil(post?.featuredImage) || isEmpty(post?.featuredImage)) return <></>;

  const config = {
    imageQuality: 70,
    imageSize: 'td_485x360',
    imageIsVideo: false,
    ..._config,
  } as IPostConfig;

  const classes = {
    wrapper: '',
    imageWrapper: 'aspect-video',
    image: classNames('object-cover shadow-sm', {
      'hover:shadow-medium transition-shadow duration-200':
        config.linkable && post?.link,
    }),
    category: null,
    ..._classes,
  };

  const { link } = post || ({} as Post);
  const featuredImage = post?.featuredImage.node;
  let { title, sourceUrl, mediaDetails } = featuredImage || ({} as MediaItem);

  if (mediaDetails) {
    const imageSource = find(mediaDetails.sizes, ['name', config.imageQuality]);
    if (imageSource) {
      sourceUrl = imageSource.sourceUrl;
    }
  }

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

      {config.imageIsVideo && link && (
        <Link href={link} className="flex">
          <div className="flex w-full h-full items-center justify-center absolute top-0">
            <PlayIcon className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
        </Link>
      )}

      {config.showCategoryTag && (
        <PostCategoryTag post={post} config={config} classes={classes} />
      )}
    </div>
  );
};

export default PostCoverImage;

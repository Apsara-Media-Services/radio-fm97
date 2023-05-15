import PostAuthor from '@/components/post/PostAuthor';
import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostCoverImage from '@/components/post/PostCoverImage';
import PostDate from '@/components/post/PostDate';
import PostExcerpt from '@/components/post/PostExcerpt';
import PostTitle from '@/components/post/PostTitle';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { find, isEmpty, isNil, merge } from 'lodash';

const PostItem = (props: IPostComponentProps) => {
  const { className, classes: _classes = {}, config: _config, post } = props;

  if (isNil(post) || isEmpty(post)) return <></>;

  const config = {
    listView: false,
    showImage: true,
    showTitle: true,
    showExcerpt: true,
    showMeta: true,
    showAuthor: true,
    showAuthorAvatar: false,
    showAuthorName: true,
    showDate: true,
    showCategoryTag: false,
    showCategoryTagOnImage: false,
    showCategoryTagMultiple: false,
    showLineSeparator: false,
    titleLineClamp: 2,
    excerptLineClamp: 3,
    imageSize: 'td_485x360',
    ..._config,
  };
  const { databaseId, postFormats = [] } = post || {};

  const classes = merge(
    {
      wrapper: config.listView
        ? 'sm:flex hover:text-rose-600 dark:hover:text-zinc-300'
        : 'hover:text-rose-600 dark:hover:text-zinc-300',
      innerWrapper: {
        first: config.listView && config.showImage ? 'sm:w-1/3' : '',
        second:
          config.listView && config.showImage
            ? 'sm:flex-1 sm:pl-4'
            : '',
      },
      image: {
        wrapper: `shadow ${
          config.listView && config.showImage ? 'mb-3 sm:mb-0 ' : 'mb-3'
        }`,
        imageWrapper:
          'pb-[56%] aspect-video bg-gradient-to-r from-gray-100 to-white dark:from-gray-700 dark:to-gray-800',
        category: {
          wrapper: 'absolute bottom-0',
          name: 'text-[11px] text-white bg-rose-900 hover:bg-rose-700 px-1 mr-1',
        },
      },
      title: {
        wrapper: '',
        title: 'text-lg xl:leading-relaxed dark:text-neutral-50',
      },
      excerpt: {
        wrapper: 'mt-3',
        excerpt: 'text-base text-gray-500 dark:text-white',
      },
      meta: {
        wrapper: 'flex items-center text-sm mt-3',
        author: {
          wrapper: 'flex items-center',
          avatar: 'w-12 h-12 relative mr-4',
          name: 'font-medium text-black dark:text-white',
        },
        date: {
          wrapper: '',
          date: 'text-gray-500 dark:text-white',
        },
        category: {
          wrapper: 'mr-3',
          name: 'text-[11px] text-white bg-rose-900 hover:bg-rose-700 p-1 mr-1 dark:bg-gray-700',
        },
      },
      lineSeparator: 'border-b pb-4',
    },
    _classes
  );

  if (!config.showLineSeparator) {
    classes.lineSeparator = '';
  }

  post.link = `/detail/${databaseId}`;
  const isVideo = !!find(postFormats, ['slug', 'post-format-video']);

  return (
    <div
      className={classNames(
        `post-${databaseId}`,
        className,
        classes.lineSeparator
      )}
    >
      <div className={`${classes.wrapper}`}>
        {config.showImage && (
          <div className={`${classes.innerWrapper.first}`}>
            <PostCoverImage
              post={post}
              classes={classes.image}
              config={{
                imageIsVideo: isVideo,
                showCategoryTag: config.showCategoryTagOnImage,
                showCategoryTagMultiple: config.showCategoryTagMultiple,
                imageSize: config.imageSize,
              }}
            />
          </div>
        )}

        <div className={`${classes.innerWrapper.second}`}>
          {config.showTitle && (
            <PostTitle
              post={post}
              config={{
                line: config.titleLineClamp,
              }}
              classes={classes.title}
            />
          )}

          {config.showMeta && (
            <div className={classes.meta.wrapper}>
              {config.showCategoryTag && (
                <PostCategoryTag
                  post={post}
                  config={{
                    showCategoryTagMultiple: config.showCategoryTagMultiple,
                  }}
                  classes={classes.meta.category}
                />
              )}

              {config.showAuthor && (
                <>
                  <PostAuthor
                    post={post}
                    classes={classes.meta.author}
                    config={{
                      showAuthorAvatar: config.showAuthorAvatar,
                      showAuthorName: config.showAuthorName,
                    }}
                  />
                  <div className={classNames('mx-2', classes.meta.date.date)}>
                    -
                  </div>
                </>
              )}

              {config.showDate && (
                <PostDate post={post} classes={classes.meta.date} />
              )}
            </div>
          )}

          {config.showExcerpt && (
            <PostExcerpt
              post={post}
              config={{
                line: config.excerptLineClamp,
              }}
              classes={classes.excerpt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;

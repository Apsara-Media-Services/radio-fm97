import LineClamp from '@/components/common/LineClamp';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const PostTitle = (props: IPostComponentProps) => {
  const { className, classes: _classes, post, config } = props;

  if (isNil(post?.title) || isEmpty(post?.title)) return <></>;

  const classes = {
    wrapper: '',
    title: '',
    ..._classes,
  };

  return (
    <div className={classNames(className, classes?.wrapper)}>
      <h3 className={classes?.title}>
        {config?.linkable && post?.link ? (
          <Link href={post?.link}>
            <LineClamp content={post?.title} line={config?.line} />
          </Link>
        ) : (
          <LineClamp content={post?.title} line={config?.line} />
        )}
      </h3>
    </div>
  );
};

export default PostTitle;

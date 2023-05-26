import LineClamp from '@/components/common/LineClamp';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';

const PostExcerpt = (props: IPostComponentProps) => {
  const { className, classes, post, config } = props;

  if (isNil(post?.excerpt) || isEmpty(post?.excerpt)) return <></>;

  return (
    <div className={classNames(className, classes?.wrapper)}>
      <div className={classes?.excerpt}>
        <LineClamp content={post?.excerpt} line={config?.line} />
      </div>
    </div>
  );
};

export default PostExcerpt;

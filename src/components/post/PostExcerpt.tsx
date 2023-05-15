import { IPostComponentProps } from '@/types/components/post';
import { isEmpty, isNil } from 'lodash';
import classNames from 'classnames';
import LineClamp from '@/components/common/LineClamp';

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

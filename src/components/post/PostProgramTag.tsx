import { IComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

interface IProps extends IComponentProps {
  post: WP_REST_API_ACF_Post;
}

const PostProgramTag = (props: IProps) => {
  const { className, post } = props;
  const { program } = post.relation || {};

  if (isNil(program) || isEmpty(program)) return <></>;

  return (
    <div className={classNames('flex items-center space-x-1', className)}>
      <div
        className="py-1 px-3 text-white bg-ams-primary/80 dark:bg-ams-primary-dark/80 hover:bg-ams-primary hover:dark:bg-ams-primary-dark max-w-32 sm:max-w-none truncate rounded-small"
        key={program.id}
      >
        <Link href={`/audio/${program.slug}`}>{program.name}</Link>
      </div>
    </div>
  );
};

export default PostProgramTag;

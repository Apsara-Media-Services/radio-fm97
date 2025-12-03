import { Caster } from '@/gql/caster';
import { Program } from '@/gql/graphql';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const PostPodcastTag = (props: IPostComponentProps) => {
  const { className, classes: _classes = {}, config, post } = props;
  const { programs } = Caster.post(post);

  if (isNil(post?.programs) || isEmpty(post?.programs)) return <></>;

  const classes = {
    wrapper: '',
    innerWrapper: 'flex items-center space-x-1',
    name: 'py-1 px-2 text-white bg-rose-800 hover:bg-ams-red max-w-[8rem] sm:max-w-none truncate',
    ..._classes,
  };

  return (
    <div className={classNames(className, classes.wrapper)}>
      <div className={classes.innerWrapper}>
        {config?.showCategoryTagMultiple && programs.length ? (
          programs.map((program: Program) => (
            <div className={classes.name} key={program?.databaseId}>
              <Link
                href={program.uri?.replace('/podcasts', '/audio') as string}
              >
                {program.name}
              </Link>
            </div>
          ))
        ) : (
          <Link
            href={programs[0].uri?.replace('/podcasts', '/audio') as string}
          >
            <div className={classes.name}>{programs[0].name}</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostPodcastTag;

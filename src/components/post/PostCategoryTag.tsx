import { Caster } from '@/gql/caster';
import { Category } from '@/gql/graphql';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const PostCategoryTag = (props: IPostComponentProps) => {
  const { className, classes: _classes = {}, config, post } = props;
  const { categories } = Caster.post(post);

  if (isNil(post?.categories) || isEmpty(post?.categories)) return <></>;

  const classes = {
    wrapper: '',
    innerWrapper: 'flex items-center space-x-1',
    name: 'py-1 px-2 text-white bg-rose-800 hover:bg-ams-red max-w-[8rem] sm:max-w-none truncate',
    ..._classes,
  };

  return (
    <div className={classNames(className, classes.wrapper)}>
      <div className={classes.innerWrapper}>
        {config?.showCategoryTagMultiple && categories.length ? (
          categories.map((category: Category) => (
            <div className={classes.name} key={category?.databaseId}>
              <Link href={category.uri as string}>{category.name}</Link>
            </div>
          ))
        ) : (
          <Link href={categories[0].uri as string}>
            <div className={classes.name}>{categories[0].name}</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCategoryTag;

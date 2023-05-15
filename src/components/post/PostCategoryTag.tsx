import { get, isEmpty, isNil, map } from 'lodash';
import Link from 'next/link';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { Category } from '@/gql/graphql';

const PostCategoryTag = (props: IPostComponentProps) => {
  const { className, classes: _classes = {}, config, post } = props;
  const categories = post?.categories?.nodes || ([] as Category[]);

  if (isNil(post?.categories) || isEmpty(post?.categories)) return <></>;

  const classes = {
    wrapper: '',
    innerWrapper: 'flex items-center space-x-2',
    name: 'py-1 px-2 text-white bg-rose-900 hover:bg-rose-700 max-w-[8rem] sm:max-w-none truncate',
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

import { isEmpty, isNil } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { User } from '@/gql/graphql';

const PostAuthor = (props: IPostComponentProps) => {
  const { className, classes: _classes, config: _config, post } = props;
  const author = post?.author?.node || ({} as User);

  if (isNil(author) || isEmpty(author)) return <></>;

  const config = {
    showAuthorAvatar: true,
    showAuthorName: true,
    ..._config,
  };
  const classes = {
    wrapper: '',
    avatar: '',
    name: '',
    ..._classes,
  };
  const { name: _name, firstName, lastName, slug, avatar } = author;
  const name = _name || [firstName, lastName].filter(Boolean).join(' ');

  return (
    <div className={classNames(className, classes.wrapper)}>
      {config.showAuthorAvatar && (
        <div className={classes.avatar}>
          <Image
            fill
            src={avatar?.url as string}
            className="rounded-full"
            alt={name}
          />
        </div>
      )}
      {config.showAuthorName &&
        (slug ? (
          <Link href={`/author/${slug}`}>
            <div className={classes.name}>{name}</div>
          </Link>
        ) : (
          <div className={classes.name}>{name}</div>
        ))}
    </div>
  );
};

export default PostAuthor;

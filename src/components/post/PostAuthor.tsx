import FallbackImage from '@/components/common/FallbackImage';
import { Caster } from '@/gql/caster';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const PostAuthor = (props: IPostComponentProps) => {
  const { className, classes: _classes, config: _config, post } = props;
  const { author } = Caster.post(post);

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
          <FallbackImage
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

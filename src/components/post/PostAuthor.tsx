import FallbackImage from '@/components/common/FallbackImage';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const PostAuthor = (props: IPostComponentProps) => {
  const { className, classes: _classes, config: _config, post } = props;
  const { author } = post.relation || {};

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
      <div className={classes.name}>
        អត្ថបទដោយ៖ <span className="font-medium">{name}</span>
      </div>
      {/* <Link href={`/author/${slug}`}>
        <div className={classes.name}>អត្ថបទដោយ៖ {name}</div>
      </Link> */}
    </div>
  );
};

export default PostAuthor;

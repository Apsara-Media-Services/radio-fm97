import LineClamp from '@/components/common/LineClamp';
import { IPodcastComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';

const Title = (props: IPodcastComponentProps) => {
  const { className, classes: _classes, term } = props;

  if (isNil(term?.name) || isEmpty(term?.name)) return <></>;

  const classes = {
    wrapper: '',
    title: '',
    ..._classes,
  };
  // console.warn(term);

  return (
    <div className={classNames(className, classes?.wrapper)}>
      <h3 className={classes?.title}>
        <Link href={term?.link}>
          <LineClamp content={term?.name} />
        </Link>
      </h3>
    </div>
  );
};

export default Title;

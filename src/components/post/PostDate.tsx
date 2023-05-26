import ClientOnly from '@/components/ClientOnly';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { differenceInWeeks, format, formatDistance, parseISO } from 'date-fns';
import { km } from 'date-fns/locale';
import { isEmpty, isNil } from 'lodash';

const PostDate = (props: IPostComponentProps) => {
  const { className, classes: _classes, post } = props;

  if (isNil(post?.date) || isEmpty(post?.date)) return <></>;

  const classes = {
    wrapper: '',
    date: '',
    ..._classes,
  };

  const date = parseISO(post?.date as string);
  const diff = differenceInWeeks(new Date(), date);
  let displayDate = format(date, 'd LLLL yyyy', { locale: km });
  if (diff < 1) {
    displayDate = formatDistance(date, new Date(), {
      addSuffix: true,
      includeSeconds: true,
      locale: km,
    });
  }

  return (
    <ClientOnly>
      <div className={classNames(className, classes.wrapper)}>
        {<div className={classes.date}>{`${displayDate}`}</div>}
      </div>
    </ClientOnly>
  );
};

export default PostDate;

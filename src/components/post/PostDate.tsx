// import ClientOnly from '@/components/ClientOnly';
import dayjs from '@/libs/dayjs';
import { IPostComponentProps } from '@/types/components/post';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';

const PostDate = (props: IPostComponentProps) => {
  const { className, classes: _classes, post } = props;

  if (isNil(post?.date) || isEmpty(post?.date)) return <></>;

  const diff = dayjs().diff(post.date, 'day');
  let date = dayjs(post.date).format('DD/MM/YYYY');

  if (diff < 1) {
    const relativeDate = dayjs(post.date).locale('km').fromNow();
    date = `${date} ~ ${relativeDate}`;
  }

  return (
    <div className={classNames(className)}>
      ចុះផ្សាយនៅថ្ងៃ៖​​ <span className="font-medium">{date}</span>
    </div>
    // <ClientOnly>
    //   <div className={classNames(className)}>ចុះផ្សាយនៅថ្ងៃ៖​​ {date}</div>
    // </ClientOnly>
  );
};

export default PostDate;

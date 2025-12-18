import { SectionHeader } from '@/components/common';
import PostCard from '@/components/post/PostCard';
import { IPostSectionComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';

const HomeLatestNews = (props: IPostSectionComponentProps) => {
  const { className, title, posts } = props;

  if (isNil(posts) || isEmpty(posts)) return <></>;

  return (
    <section className={classNames(['latest-news', className])}>
      <SectionHeader
        type="primary"
        title={title}
        className="text-2xl md:text-3xl font-semibold mb-5 text-title"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default HomeLatestNews;

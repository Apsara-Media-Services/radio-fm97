'use client';

import { SectionHeader } from '@/components/common';
import PostItem from '@/components/post/PostItem';
import { Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { IPostSectionComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';

const HomeLatestNews = (props: IPostSectionComponentProps) => {
  const { className, title, link, posts } = props;
  const { $breakpoints } = useBreakpoint();

  if (isNil(posts) || isEmpty(posts)) return <></>;

  const firstPost = posts[0] || ({} as Post);
  const secondPost = posts.slice(1, 5) || ({} as Post);
  const thirdPost = posts.slice(5) || ({} as Post);

  return (
    <section className={classNames(['latest-news', className])}>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={title}
          link={link}
          className="text-3xl font-semibold"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-3 xl:gap-5 mb-3 xl:mb-5">
        <PostItem
          key={firstPost.id}
          post={firstPost}
          config={{
            showExcerpt: $breakpoints.mdAndDown,
            showLineSeparator: true,
          }}
          classes={{
            lineSeparator: 'pb-3 border-b lg:border-none',
            image: {
              imageWrapper:
                'aspect-video w-full pb-[56%] lg:pb-[82%] xl:pb-[77%]',
            },
          }}
        />
        <div className="block-latest grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-5">
          {secondPost.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              config={{
                showExcerpt: $breakpoints.mdAndDown,
                showLineSeparator: true,
                showImage: $breakpoints.smAndUp,
              }}
              classes={{
                lineSeparator: `border-none`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="block-latest grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-5">
        {thirdPost.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            config={{
              showExcerpt: $breakpoints.mdAndDown,
              showLineSeparator: true,
              showImage: $breakpoints.smAndUp,
            }}
            classes={{
              lineSeparator: `border-none`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeLatestNews;

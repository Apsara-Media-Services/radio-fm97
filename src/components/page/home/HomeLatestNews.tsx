'use client';

import { SectionHeader } from '@/components/common';
import PostItem from '@/components/post/PostItem';
import { Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { IPostSectionComponentProps } from '@/types/component';
import classNames from 'classnames';
import { head, isEmpty, isNil, take } from 'lodash';

const HomeLatestNews = (props: IPostSectionComponentProps) => {
  const { className, title, link, posts } = props;
  const { $breakpoints } = useBreakpoint();

  if (isNil(posts) || isEmpty(posts)) return <></>;

  const heroPost = head(posts) || ({} as Post);
  const otherPosts = take(
    posts.filter((post) => post.id !== heroPost.id),
    4
  );

  return (
    <section className={classNames(['latest-news', className])}>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={title}
          link={link}
          className="text-xl font-semibold"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-3 xl:gap-5 mb-3 xl:mb-5">
        <PostItem
          key={heroPost.id}
          post={heroPost}
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
          {otherPosts.map((post, index) => (
            <PostItem
              key={post.id}
              post={post}
              config={{
                showExcerpt: $breakpoints.mdAndDown,
                showLineSeparator: true,
                showImage: $breakpoints.smAndUp,
              }}
              classes={{
                lineSeparator: `border-b pb-3 xl:pb-3 ${
                  index > 1 ? 'md:border-none' : ''
                } ${index > 2 ? 'border-none' : ''}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLatestNews;

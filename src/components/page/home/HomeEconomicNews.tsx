'use client';

import { SectionHeader } from '@/components/common';
import PostItem from '@/components/post/PostItem';
import { ADS } from '@/constants/app';
import { Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { IPostSectionComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil, slice, take } from 'lodash';
import Image from 'next/image';

const HomeEconomicNews = (props: IPostSectionComponentProps) => {
  const { className, title, link, posts: _posts } = props;
  const posts = take(_posts, 7);
  const { $breakpoints } = useBreakpoint();

  if (isNil(posts) || isEmpty(posts)) return <></>;

  const postProps = (post: Post, index: number) => {
    return {
      post,
      config: {
        showExcerpt: true,
        showLineSeparator: true,
        showImage: $breakpoints.smAndUp || index === 0,
        excerptLineClamp: $breakpoints.xlAndUp || $breakpoints.mdOnly ? 4 : 3,
      },
      classes: {
        lineSeparator: classNames(
          'pb-3 xl:pb-5 border-b',
          $breakpoints.lgAndUp && index >= 3
            ? 'border-none'
            : $breakpoints.smAndUp && index >= 5
            ? 'border-none'
            : $breakpoints.xsOnly && index >= 6
            ? 'border-none'
            : ''
        ),
      },
    };
  };

  return (
    <section className={classNames(['connect-to-oversea', className])}>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={title}
          link={link}
          className="text-xl font-semibold"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-5">
        {take(posts, 2).map((post, index) => (
          <PostItem key={post.id} {...postProps(post, index)} />
        ))}

        {$breakpoints.mdAndUp ? (
          <div className="relative">
            <Image
              fill
              src={ADS.POCARI_SWEAAT}
              alt="Pocari Sweat"
              sizes="100vw"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-xs">
            <Image
              src={ADS.POCARI_SWEAAT}
              alt="Pocari Sweat"
              sizes="100vw"
              width={0}
              height={0}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {slice(posts, 2).map((post, index) => (
          <PostItem key={post.id} {...postProps(post, index + 2)} />
        ))}
      </div>
    </section>
  );
};

export default HomeEconomicNews;

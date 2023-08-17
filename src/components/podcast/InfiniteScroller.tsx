'use client';

import { Container } from '@/components/common';
import { SectionHeader } from '@/components/common';
import Hero from '@/components/podcast/Hero';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Podcast } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { PodcastService } from '@/services';
import { IComponentProps } from '@/types/component';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const podcastService = new PodcastService();

const InfiniteScroller = ({ podcast: _podcast, slug }: IComponentProps) => {
  const [podcast, setPodcast] = useState<Podcast>(_podcast) as any;
  const [posts, setPosts] = useState(Caster.podcast(podcast).posts) as any;
  const [loading, setLoading] = useState<boolean>(false);
  const { $breakpoints } = useBreakpoint();
  const itemsPerRow = $breakpoints.lgAndUp ? 3 : $breakpoints.mdAndUp ? 2 : 1;
  const [active, setActive] = useState(0);
  const activeListItem = posts[active];

  const handleSkip = (i: any) => {
    const length = posts.length;
    let dest = 0;
    const input = active + i;
    if (length > input) {
      if (input > -1) {
        dest = input;
      } else {
        dest = length - 1;
      }
    }
    setActive(dest);
  };

  const loadMore = async () => {
    setLoading(true);
    const _podcast = await podcastService.getPodcastPosts(slug as string, {
      variables: {
        first: 12,
        after: podcast.posts?.pageInfo.endCursor as string,
      },
    });
    const { posts: _posts } = Caster.podcast(_podcast);
    setPodcast(_podcast);
    setPosts((pre: any) => [...pre, ..._posts]);
    setLoading(false);
  };

  const handleSelectPlaying = (i: any) => {
    setActive(i);
  };

  return (
    <>
      <Hero
        handleSkip={(e: number) => handleSkip(e)}
        activeListItem={activeListItem}
        coverImage={podcast?.coverImage}
        name={podcast?.name}
      />
      <Container className="py-5">
        <div className="my-2 sm:my-5">
          <SectionHeader
            type="primary"
            title={podcast?.name as string}
            className="text-3xl font-semibold"
          />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={podcast?.posts?.pageInfo?.hasNextPage}
        >
          <section className="">
            <ul
              role="list"
              className="p-0 divide-y dark:divide-slate-500 divide-slate-200"
            >
              {posts.map((item: any, key: number) => (
                <li key={key} className="flex first:pt-0 last:pb-0 py-4">
                  {item?.featuredImage?.node?.sourceUrl && (
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={item?.featuredImage?.node?.sourceUrl}
                      width={100}
                      height={100}
                      alt=""
                    />
                  )}
                  <div className="ml-3 overflow-hidden">
                    <p className="text-md font-medium dark:text-slate-200 text-slate-600">
                      <button
                        onClick={() => handleSelectPlaying(key)}
                        className={
                          key == active
                            ? 'font-semibold dark:text-white text-slate-900 text-lg text-left'
                            : 'text-left'
                        }
                      >
                        {item.title}
                      </button>
                    </p>
                    <p className="text-sm dark:text-slate-300 text-slate-500 truncate">
                      {format(new Date(item.date), 'dd/MMMM/yyyy')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </InfiniteScroll>
      </Container>
      {loading && (
        <section className="">
          {[...Array(itemsPerRow)].map((key) => (
            <SkeletonPostItem key={key} />
          ))}
        </section>
      )}
    </>
  );
};

export default InfiniteScroller;

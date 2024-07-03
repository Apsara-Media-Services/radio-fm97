'use client';

import { Container } from '@/components/common';
import { SectionHeader } from '@/components/common';
import Hero from '@/components/podcast/Hero';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Podcast, Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { PodcastService } from '@/services';
import { IComponentProps } from '@/types/component';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { Button, Image } from '@nextui-org/react';
import { format } from 'date-fns';
import { find } from 'lodash';
// import Image from 'next/image';
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
  const [playing, setPlaying] = useState(false);

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
    if (i == active) {
      setPlaying((pre) => !pre);
    } else {
      setActive(i);
    }
  };

  const getSourceUrl = (post: Post) => {
    const image = post.featuredImage?.node;
    let sourceUrl = image?.sourceUrl;
    if (image?.mediaDetails) {
      const imageSource = find(image.mediaDetails.sizes, ['name', 'thumbnail']);
      if (imageSource && imageSource.sourceUrl) {
        sourceUrl = imageSource.sourceUrl;
      }
    }
    return sourceUrl;
  };

  return (
    <>
      <Hero
        handleSkip={(e: number) => handleSkip(e)}
        activeListItem={activeListItem}
        coverImage={podcast?.coverImage}
        name={podcast?.name}
        playing={playing}
        setPlaying={setPlaying}
      />
      <Container className="py-5">
        <div className="my-2 sm:my-6">
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
                  {getSourceUrl(item) && (
                    <Button
                      className="relative flex items-center justify-center inset-0 min-h-unit-20 min-w-unit-20 w-20 h-20 outline-none"
                      radius="full"
                      onClick={() => handleSelectPlaying(key)}
                    >
                      <Image
                        removeWrapper
                        className="w-20 h-20 object-cover rounded-full opacity-100 inset-0"
                        src={getSourceUrl(item) as string}
                        width={80}
                        height={80}
                        alt=""
                      />
                      {key == active && (
                        <>
                          <div className="bg-img bg-black/50 absolute inset-0 z-10" />
                          {playing ? (
                            <PauseRounded
                              style={{ fontSize: 40 }}
                              className="absolute z-10 text-gray-100"
                            />
                          ) : (
                            <PlayArrowRounded
                              style={{ fontSize: 40 }}
                              className="absolute z-10 text-gray-100"
                            />
                          )}
                        </>
                      )}
                      <div></div>
                    </Button>
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

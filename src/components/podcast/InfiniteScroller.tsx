'use client';

import { PostTitle } from '../post';
import { SectionHeader } from '@/components/common';
import Hero from '@/components/podcast/Hero';
import { SkeletonPostItem } from '@/components/skeleton';
import { Caster } from '@/gql/caster';
import { Category } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { PodcastService } from '@/services';
import { IComponentProps } from '@/types/component';
import { PlayArrowRounded } from '@mui/icons-material';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const podcastService = new PodcastService();

const InfiniteScroller = ({
  podcast: _podcast,
  slug,
  podcast: { coverImage, name },
}: IComponentProps) => {
  const [podcast, setPodcast] = useState<Category>(_podcast);
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

  // useEffect(() => {
  //   const control = {
  //     lists: posts,
  //     open: open,
  //     active: active,
  //     playing: playing,
  //   };
  // }, [active, open, playing, posts]);

  return (
    <>
      <Hero
        handleSkip={(e: number) => handleSkip(e)}
        activeListItem={activeListItem}
        coverImage={coverImage}
        name={name}
      />
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
          {posts.map((item: any, key: number) => (
            <div className="mb-3" key={key}>
              <button
                className="text-left"
                value={item}
                onClick={() => handleSelectPlaying(key)}
              >
                <span
                  className={
                    key == active ? 'font-semibold flex' : 'font-light flex'
                  }
                >
                  {/* {item.title} */}
                  <PlayArrowRounded />
                  <PostTitle
                    post={item}
                    config={{
                      line: 2,
                      linkable: true,
                    }}
                    // classes={classes.title}
                  />
                </span>
              </button>
            </div>
          ))}
        </section>
      </InfiniteScroll>
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

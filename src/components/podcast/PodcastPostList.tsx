'use client';

import { SectionHeader } from '@/components/common';
import { Post } from '@/gql/graphql';
import { PodcastService } from '@/services';
import { IComponentProps } from '@/types/component';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { Button, Image } from "@heroui/react";
import { find } from 'lodash';
import { useState } from 'react';
import app from '@/configs/app';
import dayjs from '@/libs/dayjs';
import { useSharedPlayer } from '@/components/PlayerContext';
import { Caster } from '@/gql/caster';

interface IProps extends IComponentProps {
}

const podcastService = new PodcastService();

const PodcastPostList = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { 
    state,
    podcast,
    setPodcast,
    podcastPosts: posts,
    setPodcastPosts,
    activePodcastPost,
    setActivePodcastPost,
    handlePlayPause,
  } = useSharedPlayer();

  const loadMore = async () => {
    setLoading(true);
    const _podcast = await podcastService.findWithPosts(podcast.slug as string, {
      variables: {
        after: podcast.posts?.pageInfo.endCursor as string,
      },
    });
    setPodcast(_podcast);
    setPodcastPosts((pre: Post[]) => [...pre, ...Caster.podcast(_podcast).posts]);
    setLoading(false);
  };

  const onClickPlay = (post: Post) => {
    const _playing = activePodcastPost?.id === post.id ? !state.playing : true;

    setActivePodcastPost(post);
    handlePlayPause(_playing);

    if (window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
    return sourceUrl || app.appLogo;
  };

  const isActivePost = (post: Post) => {
    return activePodcastPost?.id === post?.id;
  }

  return (
    <>
      <div className="my-2 sm:my-6">
        <SectionHeader
          type="primary"
          title={podcast?.name as string}
          className="text-3xl font-semibold"
        />
      </div>
      <section>
        <ul
          role="list"
          className="p-0 divide-y dark:divide-slate-500 divide-slate-200"
        >
          {posts.map((item, key: number) => (
            <li key={key} className="flex first:pt-0 last:pb-0 py-4">
              <Button
                className="relative flex items-center justify-center inset-0 min-h-unit-20 min-w-unit-20 w-20 h-20 outline-none px-0"
                radius="full"
                onPress={() => onClickPlay(item)}
              >
                <Image
                  removeWrapper   
                  className="object-cover rounded-full opacity-100 inset-0 w-full h-full"
                  src={getSourceUrl(item)}
                  fallbackSrc={app.appLogo}
                  alt={item.title as string}
                />
                {isActivePost(item) && (
                  <>
                    <div className="bg-img bg-black/50 absolute inset-0 z-10" />
                    {state.playing ? (
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
              </Button>
              <div className="ml-3 overflow-hidden">
                <h5 className="text-md font-medium dark:text-slate-200 text-slate-600 text-left cursor-pointer">
                  <div
                    onClick={() => onClickPlay ? onClickPlay(item) : {}}
                    className={
                      isActivePost(item)
                        ? 'font-semibold dark:text-white text-slate-900'
                        : ''
                    }
                  >
                    {item.title}
                  </div>
                </h5>
                <p className="text-sm dark:text-slate-300 text-slate-500 truncate">
                  { dayjs(item.date).format('DD/MMMM/YYYY') }
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      { podcast?.posts?.pageInfo.hasNextPage && (
        <div className="text-center mt-5">
        <Button 
          variant='bordered' 
          className='text-ams-primary border-ams-primary font-semibold px-7'
          isLoading={loading}
          onPress={loadMore}
        >
          មើលបន្ថែម
        </Button>
      </div>
      )}
    </>
  );
};

export default PodcastPostList;

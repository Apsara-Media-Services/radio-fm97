'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { SectionHeader } from '@/components/common';
import app from '@/configs/app';
import { Caster } from '@/gql/caster';
import { Post } from '@/gql/graphql';
import dayjs from '@/libs/dayjs';
import { ProgramService } from '@/services';
import { getMediaUrl } from '@/utils/wp';
import { Button, Image } from '@heroui/react';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { useState } from 'react';

const programService = new ProgramService();

const PodcastPostList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    state,
    program,
    setProgram,
    programPosts: posts,
    setProgramPosts,
    activeProgramPost,
    setActiveProgramPost,
    handlePlayPause,
  } = useSharedPlayer();

  const loadMore = async () => {
    setLoading(true);
    const _program = await programService.findBySlugWithPosts(
      program.slug as string,
      {
        variables: {
          after: program.posts?.pageInfo.endCursor as string,
        },
      }
    );
    setProgram(_program);
    setProgramPosts((pre: Post[]) => [
      ...pre,
      ...Caster.program(_program).posts,
    ]);
    setLoading(false);
  };

  const onClickPlay = (post: Post) => {
    const _playing = activeProgramPost?.id === post.id ? !state.playing : true;

    setActiveProgramPost(post);
    handlePlayPause(_playing);

    if (window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const isActivePost = (post: Post) => {
    return activeProgramPost?.id === post?.id;
  };

  return (
    <>
      <div className="my-5">
        <SectionHeader
          type="primary"
          title={program?.name as string}
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
                  src={getMediaUrl(
                    item.featuredImage?.node,
                    'thumbnail',
                    getMediaUrl(program.radio?.thumbnail?.node)
                  )}
                  fallbackSrc={app.logo}
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
                    onClick={() => (onClickPlay ? onClickPlay(item) : {})}
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
                  {dayjs.tz(item.date).format('DD/MMMM/YYYY')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {program?.posts?.pageInfo.hasNextPage && (
        <div className="text-center mt-5">
          <Button
            variant="bordered"
            className="text-ams-primary border-ams-primary font-semibold px-7"
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

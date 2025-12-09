import { useAppContext } from '@/components/AppContext';
import { useSharedPlayer } from '@/components/PlayerContext';
import { SectionHeader } from '@/components/common';
import LineClamp from '@/components/common/LineClamp';
import { Caster } from '@/gql/caster';
import { Post } from '@/gql/graphql';
import dayjs from '@/libs/dayjs';
import { ProgramService } from '@/services';
import { getMediaUrl } from '@/utils/wp';
import { Avatar, Button } from '@heroui/react';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { get } from 'lodash';
import { useState } from 'react';

const programService = new ProgramService();

const PodcastPostList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { program, posts, setPosts, setProgram } = useAppContext();
  const {
    load,
    state,
    post: playerPost,
    setProgram: setPlayerProgram,
    setPost: setPlayerPost,
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
    setPosts((pre: Post[]) => [...pre, ...Caster.program(_program).posts]);
    setLoading(false);
  };

  const onClickPlay = (post: Post) => {
    setPlayerProgram(program);
    setPlayerPost(post);

    if (isActivePost(post)) {
      const _playing = playerPost?.id === post.id ? !state.playing : true;
      handlePlayPause(_playing);
      return;
    }

    load(get(post, 'audioUrl', ''), { live: false, playing: true });
  };

  const isActivePost = (post: Post) => {
    return playerPost?.id === post?.id;
  };

  return (
    <>
      <div className="mt-5 mb-10">
        <SectionHeader
          type="primary"
          title="កម្មវិធីផ្សាយគ្រប់វគ្គ"
          className="text-xl md:text-3xl font-semibold"
        />
      </div>
      <section>
        <ul
          role="list"
          className="p-0 divide-y dark:divide-slate-500 divide-slate-200"
        >
          {posts.map((item, key: number) => (
            <li
              key={key}
              className="flex items-center first:pt-0 last:pb-0 py-3"
            >
              <div>
                <Button
                  className="relative flex items-center justify-center inset-0 min-h-unit-20 min-w-unit-20 w-20 h-20 outline-none px-0"
                  radius="full"
                  onPress={() => onClickPlay(item)}
                >
                  <Avatar
                    isBordered
                    src={getMediaUrl(
                      item.featuredImage?.node,
                      'thumbnail',
                      getMediaUrl(program.radio?.thumbnail?.node)
                    )}
                    className="w-18 h-18"
                  />
                  <div className="bg-img bg-black/30 absolute inset-0 z-10" />
                  {state.loading && isActivePost(item) && (
                    <div className="absolute inset-0 rounded-full border-3 border-ams-primary border-t-transparent animate-spin z-20"></div>
                  )}
                  <>
                    {state.playing && isActivePost(item) ? (
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
                </Button>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm dark:text-slate-400 text-slate-400 truncate">
                  {dayjs(item.date).format('DD/MMMM/YYYY')}
                </p>
                <h5 className="text-md font-medium dark:text-slate-200 text-slate-600 text-left cursor-pointer">
                  <div
                    onClick={() => (onClickPlay ? onClickPlay(item) : {})}
                    className={
                      isActivePost(item)
                        ? 'font-semibold dark:text-white text-slate-900'
                        : ''
                    }
                  >
                    <LineClamp content={item.title as string} line={1} />
                  </div>
                </h5>
                <p className="dark:text-slate-200 text-slate-600">
                  <LineClamp content={item.excerpt as string} line={3} />
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
            មើលវគ្គផ្សេងទៀត
          </Button>
        </div>
      )}
    </>
  );
};

export default PodcastPostList;

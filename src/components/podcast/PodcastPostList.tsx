'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { SectionHeader } from '@/components/common';
import LineClamp from '@/components/common/LineClamp';
import usePaginator from '@/hooks/use-paginator';
import dayjs from '@/libs/dayjs';
import PostService from '@/services/PostService';
import { IComponentProps } from '@/types/component';
import { IPaginator } from '@/types/fetch';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { secondToHHMMSS } from '@/utils/date';
import { getAcfMediaUrl, getMediaUrl, getPostAudio } from '@/utils/wp';
import { Avatar, Button } from '@heroui/react';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';
import { first } from 'lodash';
import { useEffect, useState } from 'react';

interface IProps extends IComponentProps {
  program: WP_REST_API_ACF_Program;
  posts: WP_REST_API_ACF_Post[];
  paginator: IPaginator;
}

const postService = new PostService();

const PodcastPostList = (props: IProps) => {
  const { program } = props;

  const { items, setItems, paginator, setPaginator } =
    usePaginator<WP_REST_API_ACF_Post>();
  const [loading, setLoading] = useState<boolean>(false);

  const { state, play, isActivePost } = useSharedPlayer();

  useEffect(() => {
    setItems(props.posts);
    setPaginator(props.paginator);
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const posts = await postService.all({
      programs: program.id.toString(),
      page: paginator.page + 1,
      per_page: paginator.per_page,
    });
    setItems((prev) => [...prev, ...posts.data]);
    setPaginator(posts);
    setLoading(false);
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
          {items.map((item, key: number) => (
            <li
              key={key}
              className="flex items-center first:pt-0 last:pb-0 py-3"
            >
              <div>
                <Button
                  className="relative flex items-center justify-center inset-0 min-h-unit-20 min-w-unit-20 w-20 h-20 outline-none px-0"
                  radius="full"
                  onPress={() => play(program, item)}
                >
                  <Avatar
                    isBordered
                    src={getMediaUrl(
                      first(item._embedded?.['wp:featuredmedia']),
                      'thumbnail',
                      getAcfMediaUrl(program.acf?.thumbnail)
                    )}
                    className="w-18 h-18"
                  />
                  <div className="bg-img bg-black/30 absolute inset-0 z-10" />
                  {state.loading && isActivePost(item) && (
                    <div className="absolute inset-0 rounded-full border-3 border-ams-primary border-t-transparent animate-spin z-20"></div>
                  )}
                  {getPostAudio(item).url && (
                    <>
                      <div className="absolute z-10 text-gray-100">
                        {state.playing && isActivePost(item) ? (
                          <PauseCircleFilledRounded style={{ fontSize: 30 }} />
                        ) : (
                          <PlayCircleFilledRounded style={{ fontSize: 30 }} />
                        )}
                      </div>
                      <div className="absolute z-10 bottom-2 text-gray-100 text-xs font-medium">
                        {secondToHHMMSS(getPostAudio(item).duration)}
                      </div>
                    </>
                  )}
                </Button>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm dark:text-slate-400 text-slate-400 truncate">
                  {dayjs(item.date).format('DD/MMMM/YYYY')}
                </p>
                <h5 className="text-md font-medium dark:text-slate-200 text-slate-600 text-left">
                  <div
                    className={
                      isActivePost(item)
                        ? 'font-semibold dark:text-white text-slate-900'
                        : ''
                    }
                  >
                    <LineClamp content={item.title.rendered} line={1} />
                  </div>
                </h5>
                <p className="dark:text-slate-200 text-slate-600">
                  <LineClamp content={item.excerpt.rendered} line={3} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {paginator.page < paginator.total_pages && (
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

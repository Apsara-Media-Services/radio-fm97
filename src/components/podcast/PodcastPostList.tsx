'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import usePaginator from '@/hooks/use-paginator';
import dayjs from '@/libs/dayjs';
import ProgramPostService from '@/services/ProgramPostService';
import { IPaginationComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { secondToHHMMSS } from '@/utils/date';
import { getAcfMediaUrl, getMediaUrl, getPostAudio } from '@/utils/wp';
import { Avatar, Button } from '@heroui/react';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';
import classNames from 'classnames';
import { first } from 'lodash';
import Link from 'next/link';

interface IProps extends IPaginationComponentProps<WP_REST_API_ACF_Post> {
  program: WP_REST_API_ACF_Program;
}

const programPostService = new ProgramPostService();

const PodcastPostList = (props: IProps) => {
  const { program } = props;

  const { items, loading, paginator, loadMore } =
    usePaginator<WP_REST_API_ACF_Post>({
      service: programPostService,
      query: props.query,
      items: props.items,
      paginator: props.paginator,
    });

  const { state, play, isActivePost } = useSharedPlayer();

  if (!items.length) {
    return <></>;
  }

  return (
    <>
      <section>
        <ul role="list" className="p-0 divide-y ams-divider">
          {items.map((item, key: number) => (
            <li
              key={key}
              className="flex items-center first:pt-0 last:pb-0 py-2"
            >
              <div>
                <Button
                  isIconOnly
                  className="relative w-17 h-17 outline-none px-0"
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
                    className="w-16 h-16"
                  />
                  <div className="bg-img bg-black/30 absolute inset-0 z-10" />
                  {state.loading && isActivePost(item) && (
                    <div className="absolute inset-0 rounded-full border-3 border-ams-primary border-t-transparent animate-spin z-20"></div>
                  )}
                  {getPostAudio(item).url && (
                    <>
                      <div className="absolute z-10 text-slate-200">
                        {state.playing && isActivePost(item) ? (
                          <PauseCircleFilledRounded style={{ fontSize: 30 }} />
                        ) : (
                          <PlayCircleFilledRounded style={{ fontSize: 30 }} />
                        )}
                      </div>
                      <div className="absolute z-10 bottom-1.5 text-slate-200 text-xs font-medium">
                        {secondToHHMMSS(getPostAudio(item).duration)}
                      </div>
                    </>
                  )}
                </Button>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-meta truncate text-sm">
                  {dayjs(item.date).format('DD/MM/YYYY')}
                </p>
                <Link href={`/audio/detail/${item.id}`}>
                  <h5
                    className={classNames(
                      'font-medium text-left line-clamp-1',
                      isActivePost(item)
                        ? 'text-accent'
                        : 'text-title text-hover'
                    )}
                  >
                    {item.title.rendered}
                  </h5>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {paginator.page < paginator.total_pages && (
        <div className="text-center mt-5">
          <Button
            variant="bordered"
            className="text-base text-accent border-ams-primary font-semibold px-7"
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

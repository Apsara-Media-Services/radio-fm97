'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { Container } from '@/components/common';
import PlayerProgress from '@/components/player/PlayerProgress';
import app from '@/configs/app';
import { Post, Program } from '@/gql/graphql';
import { IRadioLiveComponentProps } from '@/types/component';
import { dateTo12Hour } from '@/utils/date';
import { getMediaUrl } from '@/utils/wp';
import { Button, Image } from '@heroui/react';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const RadioLive = (props: IRadioLiveComponentProps) => {
  const { className, activeProgram, nextProgram, nextTomorrowProgram } = props;

  const { state, load, setProgram, setPost, handlePlayPause } =
    useSharedPlayer();

  const pathname = usePathname();

  const isLive = !!activeProgram || !!nextProgram;
  const hasActiveProgram = !!activeProgram;
  const hasNextProgram = !!nextProgram;
  const program = activeProgram ?? nextProgram ?? nextTomorrowProgram;

  function onPlayPause() {
    setProgram(program as Program);
    setPost({} as Post);
    if (state.live) {
      handlePlayPause();
      return;
    }
    load(app.liveUrl, { live: true, playing: true });
  }

  useEffect(() => {
    if (pathname.startsWith('/live')) {
      setProgram(program as Program);
      setPost({} as Post);
      if (!state.live || !state.playing) {
        load(app.liveUrl, { live: true, playing: true });
      }
    }
  }, [pathname]);

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-16/4 flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />
        <Image
          removeWrapper
          alt={program?.name ?? app.name}
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={getMediaUrl(program?.thumbnail)}
        />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-60">
              <Image
                removeWrapper
                alt={program?.name || app.name}
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={getMediaUrl(program?.thumbnail)}
              />
            </div>
            {program && (
              <>
                <div className="text-white w-full md:w-auto">
                  <div className="air-now text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-primary relative'
                      }
                    >
                      {app.tag}
                    </span>
                    <h5 className="mt-5 mb-3">{program.name}</h5>
                    <div className="flex gap-1 items-center">
                      <time>
                        {dateTo12Hour(program.startAt)} ~{' '}
                        {dateTo12Hour(program.endAt)}
                      </time>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {isLive && (
            <div className="mt-8">
              <PlayerProgress isLive={true} />

              <div className="text-center mt-3 md:mt-6">
                <Button
                  onPress={onPlayPause}
                  isIconOnly
                  className="w-auto h-auto data-hover:bg-gray-100/10 outline-none text-gray-100"
                  radius="full"
                  variant="light"
                  isDisabled={state.loading}
                >
                  {state.loading && (
                    <div className="absolute inset-0 rounded-full border-3 border-ams-primary border-t-transparent animate-spin"></div>
                  )}
                  {state.live && state.playing && (
                    <PauseCircleFilledRounded style={{ fontSize: 70 }} />
                  )}
                  {(!state.live || !state.playing) && (
                    <PlayCircleFilledRounded style={{ fontSize: 70 }} />
                  )}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>

      {isLive && (
        <Container className="my-8">
          <div className="flex flex-col md:flex-row justify-between gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
            <div className="current-program">
              <div className="air-now">
                <div className="text-ams-primary font-semibold">
                  {'កំពុងផ្សាយ'}
                </div>
                {hasActiveProgram && (
                  <>
                    <time className="font-normal">
                      {dateTo12Hour(activeProgram.startAt)} ~{' '}
                      {dateTo12Hour(activeProgram.endAt)}
                    </time>
                    <h5>{activeProgram.name}</h5>
                  </>
                )}
              </div>
            </div>
            <div className="border-t-2 md:border-r-2 border-gray-200" />

            <div className="up-next dark:border-white md:text-right">
              <div>
                <h5 className="text-ams-primary">{'កម្មវិធីបន្ទាប់'}</h5>
                {hasNextProgram && (
                  <>
                    <time className="font-normal">
                      {dateTo12Hour(nextProgram.startAt)} ~{' '}
                      {dateTo12Hour(nextProgram.endAt)}
                    </time>
                    <h5>{nextProgram.name}</h5>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default RadioLive;

'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { Container } from '@/components/common';
import PlayerProgress from '@/components/player/PlayerProgress';
import app from '@/configs/app';
import { IRadioLiveComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { dateTo12Hour } from '@/utils/date';
import { getAcfMediaUrl } from '@/utils/wp';
import { Button, Image } from '@heroui/react';
import {
  CircleRounded,
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';
import NextImage from 'next/image';
import Link from 'next/link';

const RadioLive = (props: IRadioLiveComponentProps) => {
  const { className, activeProgram, nextProgram, nextTomorrowProgram } = props;

  const { state, load, setProgram, setPost, handlePlayPause } =
    useSharedPlayer();

  const isLive = !!activeProgram || !!nextProgram;
  const hasActiveProgram = !!activeProgram;
  const hasNextProgram = !!nextProgram;
  const program = activeProgram ?? nextProgram ?? nextTomorrowProgram;

  function onPlayPause() {
    setProgram(program as WP_REST_API_ACF_Program);
    setPost({} as WP_REST_API_ACF_Post);
    if (state.live) {
      handlePlayPause();
      return;
    }
    load(app.liveUrl, { live: true, playing: true });
  }

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-16/4 flex items-center relative py-8 dark">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />
        <Image
          fill
          as={NextImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          removeWrapper
          alt={program?.name ?? app.name}
          className="z-0 object-cover opacity-100 absolute inset-0 rounded-none"
          src={getAcfMediaUrl(program?.thumbnail)}
        />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-60">
              <Image
                fill
                as={NextImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                removeWrapper
                alt={program?.name || app.name}
                className="object-cover opacity-100 rounded-full"
                src={getAcfMediaUrl(program?.thumbnail)}
              />
            </div>
            {program && (
              <>
                <div className="text-title w-full md:w-auto">
                  <div>
                    <p className="text-title animate-pulse">
                      <CircleRounded className="text-ams-red dark:text-ams-red-dark mr-1 mb-1" />
                      LIVE NOW
                    </p>
                    <h1 className="font-semibold before:absolute before:-bottom-3 before:h-1 before:w-16 before:bg-ams-primary relative text-2xl md:text-3xl mt-2 mb-5">
                      <Link href={`/audio/${program.slug}`}>
                        {program.name}
                      </Link>
                    </h1>
                    <div className="flex gap-1 items-center text-lg md:text-xl text-title">
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
                    <div className="absolute inset-0 rounded-full border-3 border-ams-primary dark:border-ams-primary-dark border-t-transparent animate-spin"></div>
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
        <div className="bg-white dark:bg-slate-950 py-5 md:py-10">
          <Container>
            <div className="flex flex-col md:flex-row justify-between gap-y-4 text-lg md:text-xl font-semibold">
              <div className="current-program">
                <div className="air-now">
                  <p className="text-accent font-semibold">{'កំពុងផ្សាយ'}</p>
                  {hasActiveProgram && (
                    <>
                      <time className="font-normal text-body">
                        {dateTo12Hour(activeProgram.startAt)} ~{' '}
                        {dateTo12Hour(activeProgram.endAt)}
                      </time>
                      <h3 className="text-title">{activeProgram.name}</h3>
                    </>
                  )}
                </div>
              </div>
              <div className="border-t-2 md:border-r-2 ams-border" />
              <div className="up-next dark:border-white md:text-right">
                <div>
                  <p className="text-accent">{'កម្មវិធីបន្ទាប់'}</p>
                  {hasNextProgram && (
                    <>
                      <time className="font-normal text-body">
                        {dateTo12Hour(nextProgram.startAt)} ~{' '}
                        {dateTo12Hour(nextProgram.endAt)}
                      </time>
                      <h3 className="text-title">{nextProgram.name}</h3>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default RadioLive;

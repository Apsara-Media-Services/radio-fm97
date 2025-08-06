'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { Container } from '@/components/common';
import PlayerPlayPause from '@/components/player/PlayerPlayPause';
import PlayerProgress from '@/components/player/PlayerProgress';
import PlayerVolume from '@/components/player/PlayerVolume';
import app from '@/configs/app';
import { timestampTo12Hour } from '@/utils/date';
import { Image } from '@heroui/react';
import { get, isEmpty } from 'lodash';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';

const RadioLive = (props: any) => {
  const { className, program, nextProgram, radioLiveUrl } = props;

  const { state, load } = useSharedPlayer();

  useEffect(() => {
    load(radioLiveUrl);
  }, [radioLiveUrl, load]);

  if (isEmpty(program) && isEmpty(nextProgram)) return <></>;

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt={program?.title}
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={get(program, 'cover.0.sizes.medium.url', app.logo) as string}
          fallbackSrc={app.logo}
        />

        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-60">
              <Image
                removeWrapper
                alt={program?.title}
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={
                  get(program, 'cover.0.sizes.medium.url', app.logo) as string
                }
                fallbackSrc={app.logo}
              />
            </div>
            <div className="text-white w-full md:w-auto">
              {!isEmpty(program) && (
                <>
                  <div className="air-now text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-primary relative'
                      }
                    >
                      {app.tag}
                    </span>
                    <h5 className="my-5">{program?.title}</h5>
                    <div className="flex gap-1 items-center">
                      <time>
                        {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                        {timestampTo12Hour(program?.endTimestamp)}
                      </time>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-8">
            <PlayerProgress isLive={true} />

            <div className="flex items-center justify-end gap-3 text-gray-100">
              <PlayerVolume />
              <div className="flex gap-1">
                <div className="border-2 h-5 w-5 rounded-full grid items-center justify-center border-ams-red animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <p className="text-small">Live</p>
              </div>
            </div>
            <PlayerPlayPause className="flex w-full justify-center items-center gap-2 text-gray-100" />
            {ReactPlayer.canPlay && ReactPlayer.canPlay(state.src || '') && (
              <ReactPlayer
                src={state.src}
                playing={state.playing}
                controls={state.controls}
                height={0}
                width={0}
                muted={state.muted}
                volume={state.volume}
              />
            )}
          </div>
        </Container>
      </div>

      <Container className="my-8">
        <div className="flex flex-col md:flex-row justify-between gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
          <div className="current-program">
            {!isEmpty(program) && (
              <div className="air-now">
                <div className="text-ams-primary font-semibold">
                  {'កំពុងផ្សាយ'}
                </div>
                <time className="font-normal">
                  {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                  {timestampTo12Hour(program?.endTimestamp)}
                </time>
                <h5>{program?.title}</h5>
              </div>
            )}
          </div>
          <div className="border-t-2 md:border-r-2 border-gray-200" />
          <div className="up-next dark:border-white md:text-right">
            {!isEmpty(nextProgram) && (
              <div>
                <h5 className="text-ams-primary">{'កម្មវិធីបន្ទាប់'}</h5>
                <time className="font-normal">
                  {timestampTo12Hour(nextProgram?.startTimestamp)} ~{' '}
                  {timestampTo12Hour(nextProgram?.endTimestamp)}
                </time>
                <h5>{nextProgram?.title}</h5>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RadioLive;

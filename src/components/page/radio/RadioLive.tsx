'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { Container } from '@/components/common';
import PlayerPlayPause from '@/components/player/PlayerPlayPause';
import PlayerProgress from '@/components/player/PlayerProgress';
import PlayerVolume from '@/components/player/PlayerVolume';
import app from '@/configs/app';
import { IRadioLiveComponentProps } from '@/types/component';
import { dateTo12Hour } from '@/utils/date';
import { getMediaUrl } from '@/utils/wp';
import { Image } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';

const RadioLive = (props: IRadioLiveComponentProps) => {
  const { className, activeProgram, nextProgram, nextTomorrowProgram } = props;

  const { state, load, handlePlayPause } = useSharedPlayer();
  const pathname = usePathname();

  const isLive = !!activeProgram || !!nextProgram;
  const hasActiveProgram = !!activeProgram;
  const hasNextProgram = !!nextProgram;
  const program = activeProgram ?? nextProgram ?? nextTomorrowProgram;

  useEffect(() => {
    load(app.liveUrl);
    handlePlayPause(pathname.startsWith('/live'));
  }, []);

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
                    <h5 className="my-5">{program.name}</h5>
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

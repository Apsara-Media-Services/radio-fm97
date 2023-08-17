'use client';

import { Container } from '@/components/common';
import FallbackImage from '@/components/common/FallbackImage';
import {
  AccessTimeRounded,
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
  VolumeUpRounded,
  VolumeOffRounded,
} from '@mui/icons-material';
import { Button, Image, Progress } from '@nextui-org/react';
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';
import Link from 'next/link';
import { useState } from 'react';
import ReactPlayer from 'react-player';
// import { ReactPlayerProps } from 'react-player/types/lib';
// import _ReactPlayer, { ReactPlayerProps } from 'react-player';
// const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const RadioLive = (props: any) => {
  const { className, program, nextProgram, radioLiveUrl } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  if (isEmpty(program) && isEmpty(nextProgram)) return <></>;

  const timestampTo12Hour = (timestamp: number | string) => {
    return moment(timestamp).format('hh:mm A');
  };

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={program?.cover[0].sizes.large.url}
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-20 z-20 items-center">
            <div className="relative rounded-full aspect-square shadow-lg h-60 mr-auto lg:mr-0 ml-auto">
              {/* <FallbackImage
                fill
                src={program?.cover[0].sizes.large.url}
                className="object-cover rounded-full overflow-hidden"
                alt={program?.title}
              /> */}
              <Image
                removeWrapper
                alt="Card background"
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={program?.cover[0].sizes.large.url}
              />
            </div>
            <div className="text-white">
              {!isEmpty(program) && (
                <>
                  <div className="air-now space-y-4 text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-red relative'
                      }
                    >
                      {'FM97'}
                    </span>
                    <h5>{program?.title}</h5>
                    <div className="flex gap-1 items-center my-1">
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
            <Progress
              minValue={0}
              maxValue={1}
              value={1}
              aria-label="Music progress"
              classNames={{
                indicator: 'bg-ams-red',
                track: 'bg-default-500/30',
              }}
              color="default"
              size="sm"
            />

            <div className="flex items-center justify-end gap-3 text-gray-100">
              <div className="flex items-center gap-0">
                <Button
                  onClick={() => setMuted((pre) => !pre)}
                  isIconOnly
                  className="data-[hover]:bg-gray-100/10 p-1"
                  radius="full"
                  variant="light"
                >
                  {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
                </Button>
              </div>
              <p className="text-small">Live</p>
            </div>

            <div className="flex w-full items-center justify-center gap-2 text-gray-100">
              <Button
                onClick={() => setIsPlaying((pre) => !pre)}
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-gray-100/10 p-1"
                radius="full"
                variant="light"
              >
                {isPlaying ? (
                  <PauseCircleFilledRounded style={{ fontSize: 70 }} />
                ) : (
                  <PlayCircleFilledRounded style={{ fontSize: 70 }} />
                )}
              </Button>
            </div>
            {ReactPlayer.canPlay(radioLiveUrl) && (
              <ReactPlayer
                className=""
                url={radioLiveUrl}
                playing={isPlaying}
                controls={false}
                height={0}
                width={0}
                muted={muted}
                config={{ file: { forceAudio: true } }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            )}
          </div>
        </Container>
      </div>

      <div className="program-options my-8">
        <div className="max-w-xl md:max-w-5xl xl:max-w-7xl container mx-auto px-3 sm:px-5 z-10">
          <div className="grid md:grid-cols-3 gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
            <div className="current-program">
              {!isEmpty(program) && (
                <>
                  <div className="air-now">
                    <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                      <div>
                        <span className="text-ams-red font-semibold">
                          {'កំពុងផ្សាយ'}
                        </span>{' '}
                        :
                      </div>
                      <time className="font-normal">
                        {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                        {timestampTo12Hour(program?.endTimestamp)}
                      </time>
                    </div>
                    <h5>{program?.title}</h5>
                  </div>
                </>
              )}
            </div>
            <div className="up-next border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white">
              {!isEmpty(nextProgram) && (
                <div>
                  <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                    <div>
                      <span className="text-ams-red">{' កម្មវិធីបន្ទាប់'}</span>{' '}
                      :
                    </div>{' '}
                    <time className="font-normal">
                      {timestampTo12Hour(nextProgram?.startTimestamp)} ~{' '}
                      {timestampTo12Hour(nextProgram?.endTimestamp)}
                    </time>
                  </div>
                  <h5>{nextProgram?.title}</h5>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="list-programs border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white flex gap-x-2 items-center hover:text-ams-red">
                <AccessTimeRounded style={{ fontSize: 30 }} />
                <Link href="#">
                  <h3 className="text-2xl md:text-lg lg:text-xl">
                    {' កម្មវិធីផ្សាយប្រចាំថ្ងៃ (ម៉ោងកម្ពុជា)'}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioLive;

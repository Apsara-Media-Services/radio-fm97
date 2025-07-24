'use client';

import ReactPlayer from 'react-player';
import { isEmpty } from 'lodash';
import { Container } from '@/components/common';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
} from "@heroui/react";
import app from '@/configs/app';
import { timestampTo12Hour } from '@/utils/date';
import { useSharedPlayer } from '@/components/PlayerContext';

const RadioLive = (props: any) => {
  const { className, program, nextProgram, radioLiveUrl } = props;

  const { 
    playing,
    muted,
    volume,
    VolumeIcon,
    volumePopup,
    setVolumePopup,
    handlePlaying,
    handleMute,
    handleVolume,
  } = useSharedPlayer();

  if (isEmpty(program) && isEmpty(nextProgram)) return <></>;

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt={program?.title}
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={(program?.cover[0].sizes?.medium?.url || app.appLogo) as string}
          fallbackSrc={app.appLogo}
        />

        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-60">
              <Image
                removeWrapper
                alt={program?.title}
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={(program?.cover[0].sizes?.medium?.url || app.appLogo) as string}
                fallbackSrc={app.appLogo}
              />
            </div>
            <div className="text-white w-full md:w-auto">
              {!isEmpty(program) && (
                <>
                  <div className="air-now text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-red relative'
                      }
                    >
                      { app.appTag }
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
                <div
                  onMouseLeave={() => setVolumePopup(false)}
                  onMouseOver={() => setVolumePopup(true)}
                >
                  <Popover
                    isOpen={volumePopup}
                    placement="left"
                    offset={1}
                    showArrow
                  >
                    <PopoverTrigger>
                      <Button
                        onClick={handleMute}
                        isIconOnly
                        className="data-[hover]:bg-gray-100/10 p-1"
                        radius="full"
                        variant="light"
                      >
                        <VolumeIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-100/10 p-2 hidden md:block rounded-full">
                      <div className="relative w-20">
                        <Progress
                          minValue={0}
                          maxValue={1}
                          value={volume}
                          aria-label="Music progress"
                          classNames={{
                            indicator: 'bg-ams-red',
                            track: 'bg-default-500/30',
                          }}
                          color="default"
                          size="sm"
                        />

                        <input
                          className="w-full absolute top-[-6px] opacity-0"
                          type="range"
                          min={0}
                          max={1}
                          step={0.001}
                          value={volume}
                          onChange={(e) => handleVolume(e.target.value)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="border-2 h-5 w-5 rounded-full grid items-center justify-center border-ams-red animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <p className="text-small">Live</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-2 text-gray-100">
              <div />
              <Button
                onPress={() => handlePlaying()}
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-gray-100/10 p-1 outline-none"
                radius="full"
                variant="light"
              >
                {playing ? (
                  <PauseCircleFilledRounded sx={{ fontSize: 70 }} />
                ) : (
                  <PlayCircleFilledRounded sx={{ fontSize: 70 }} />
                )}
              </Button>
              <div />
            </div>
            {ReactPlayer.canPlay && ReactPlayer.canPlay(radioLiveUrl) && (
              <ReactPlayer
                src={radioLiveUrl}
                playing={playing}
                controls={false}
                height={0}
                width={0}
                muted={muted}
                volume={volume}
                config={{hls: {}}}
              />
            )}
          </div>
        </Container>
      </div>
      
      <Container className='my-8'>
        <div className="flex flex-col md:flex-row justify-between gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
          <div className="current-program">
            {!isEmpty(program) && (
              <div className="air-now">
                <div className="text-ams-red font-semibold">
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
          <div className='border-t-2 md:border-r-2 border-gray-200' />
          <div className="up-next dark:border-white md:text-right">
            {!isEmpty(nextProgram) && (
              <div>
                <h5 className="text-ams-red">{'កម្មវិធីបន្ទាប់'}</h5>
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
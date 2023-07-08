'use client';

import { useAppContext } from '@/components/AppContext';
import FallbackImage from '@/components/common/FallbackImage';
import { ClockIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
// import { default as _ReactPlayer } from 'react-player';
// import { ReactPlayerProps } from 'react-player/types/lib';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const RadioLive = (props: any) => {
  const { className, program, nextProgram, radioLiveUrl } = props;

  // const { setPlayer } = useAppContext();

  // useEffect(() => {
  //   const source = radioLiveUrl as string;
  //   const plyr = new Plyr('#plyr');

  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource(source);
  //     hls.attachMedia(get(plyr, 'media') as any);
  //     window.hls = hls;
  //   } else {
  //     plyr.source = {
  //       type: 'audio',
  //       sources: [
  //         {
  //           src: source,
  //           type: 'audio/m3u8',
  //         },
  //       ],
  //     };
  //   }

  //   plyr.on('play', (event: any) => setPlayer(cloneDeep(event.detail.plyr)));
  //   plyr.on('pause', (event: any) => setPlayer(cloneDeep(event.detail.plyr)));
  //   plyr.play();
  // }, [radioLiveUrl, setPlayer]);
  // Create your own media element

  const [isPlaying, setIsPlaying] = useState(true);

  const { setPlayer } = useAppContext();

  const handleEvent = (e: any) => {
    // console.warn(e);
  };

  // useEffect(() => {}, [setPlayer]);

  if (isEmpty(program) && isEmpty(nextProgram)) return <></>;

  const timestampTo12Hour = (timestamp: number | string) => {
    return moment(timestamp).format('hh:mm A');
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
        <div className="aspect-video relative rounded-md shadow-lg">
          <FallbackImage
            fill
            src={program?.cover[0].url}
            className="object-cover"
            alt={program?.title}
          />
        </div>
        <div>
          {!isEmpty(program) && (
            <>
              <div className="air-now">
                <div className={'text-white text-sm'}>
                  <span className={'px-1 bg-ams-red'}>{'កំពុងផ្សាយ'}</span>
                </div>

                <div className="text-xl md:text-2xl my-1 font-semibold">
                  {program?.title}
                </div>
                <div className="flex gap-1 items-center my-1 text-sm md:text-base">
                  <ClockIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <time>
                    {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                    {timestampTo12Hour(program?.endTimestamp)}
                  </time>
                </div>
                <div className="md:text-lg">{program?.description}</div>

                <ReactPlayer
                  className="my-4"
                  url={radioLiveUrl}
                  playing={isPlaying}
                  controls={true}
                  height={50}
                  width={'100%'}
                  config={{ file: { forceAudio: true } }}
                  onReady={handleEvent}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            </>
          )}
          {!isEmpty(nextProgram) && (
            <div className="up-next">
              <div className="flex gap-1 items-center my-1 text-sm md:text-base">
                <span>{' កម្មវិធីបន្ទាប់'}</span>
              </div>

              <div className="text-lg md:text-xl my-1">
                {nextProgram?.title}
              </div>
              <div className="flex gap-1 items-center my-1 text-sm md:text-base">
                <ClockIcon className="md:h-4 md:w-4 h-5 w-5" />
                <time>
                  {timestampTo12Hour(nextProgram?.startTimestamp)} ~{' '}
                  {timestampTo12Hour(nextProgram?.endTimestamp)}
                </time>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioLive;

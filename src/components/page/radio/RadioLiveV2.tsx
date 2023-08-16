'use client';

import { Container } from '@/components/common';
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

const RadioLiveV2 = (props: any) => {
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
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />
        <div className={`bg-[url('http://localhost:3000/_next/image?url=https%3A%2F%2Fasset.ams.com.kh%2Fradiomedia%2Fwp-content%2Fuploads%2F2023%2F06%2F08101212%2Ffashion_time_1_cf6287fb89.webp&w=1920&q=75')] w-full h-full bg-center bg-cover bg-no-repeat absolute inset-0`} />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-20 z-20">
            <div className="relative rounded-full aspect-square shadow-lg h-60 mr-auto lg:mr-0 ml-auto">
              <FallbackImage
                fill
                src={program?.cover[0].url}
                className="object-cover rounded-full overflow-hidden"
                alt={program?.title}
              />
            </div>
            <div className='text-white'>
              {!isEmpty(program) && (
                <>
                  <div className="air-now space-y-4 text-xl md:text-2xl font-semibold">
                    <span className={'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-red relative'}>{'FM97'}</span>
                    <h5>
                      {program?.title}
                    </h5>
                    <div className="flex gap-1 items-center my-1">
                      {/* <ClockIcon className="h-4 w-4 md:h-5 md:w-5" /> */}
                      <time>
                        {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                        {timestampTo12Hour(program?.endTimestamp)}
                      </time>
                    </div>
                    {/* <div className="md:text-lg">{program?.description}</div> */}
                  </div>
                </>
              )}
              {/* {!isEmpty(nextProgram) && (
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
              )} */}
            </div>
          </div>
          <div className="mt-8">
            {_ReactPlayer.canPlay(radioLiveUrl) && (
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
            )}
          </div>
        </Container>
      </div>
      <div className="program-options">
        <Container>
          
        </Container>
      </div>
    </div>
  );
};

export default RadioLiveV2;

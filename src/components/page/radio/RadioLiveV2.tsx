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
import Link from 'next/link';

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
      <div className="program-options my-8">
        <div className='max-w-xl md:max-w-5xl xl:max-w-7xl container mx-auto px-3 sm:px-5 z-10'>
          <div className="grid md:grid-cols-3 gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
            <div className="current-program">
            {!isEmpty(program) && (
                <>
                  <div className="air-now">
                    <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                      {/* <ClockIcon className="h-4 w-4 md:h-5 md:w-5" /> */}
                      <div>
                        <span className="text-ams-red font-semibold">{'កំពុងផ្សាយ'}</span> :
                      </div>
                      <time className='font-normal'>
                        {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                        {timestampTo12Hour(program?.endTimestamp)}
                      </time>
                    </div>
                    <h5>
                      {program?.title}
                    </h5>
                  </div>
                </>
              )}
            </div>
            <div className="up-next border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white">
            {!isEmpty(nextProgram) && (
                <div>
                  <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                    <div>
                    <span className="text-ams-red">{' កម្មវិធីបន្ទាប់'}</span> :
                    </div>  <time className='font-normal'>
                      {timestampTo12Hour(nextProgram?.startTimestamp)} ~{' '}
                      {timestampTo12Hour(nextProgram?.endTimestamp)}
                    </time>
                  </div>
                  <h5>
                    {nextProgram?.title}
                  </h5>
                </div>
              )}
            </div>
            <div className="list-programs border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white flex gap-x-2 items-center hover:text-ams-red">
            <svg className='dark:fill-white' width="28" height="29" viewBox="0 0 28 29" fill="current" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_10_58)">
              <path d="M14.0002 0.5C6.26817 0.5 6.10352e-05 6.76811 6.10352e-05 14.5001C6.10352e-05 22.2322 6.26817 28.5003 14.0002 28.5003C21.7322 28.5003 28.0003 22.2322 28.0003 14.5001C28.0003 6.76811 21.7322 0.5 14.0002 0.5ZM14.0002 26.5993C7.31792 26.5993 1.90077 21.1821 1.90077 14.4999C1.90077 7.81757 7.31792 2.40071 14.0002 2.40071C20.6825 2.40071 26.0996 7.81786 26.0996 14.5001C26.0996 21.1824 20.6825 26.5996 14.0002 26.5996V26.5993Z"/>
              <path d="M14.1388 15.2105C13.6734 15.2105 13.2945 14.8313 13.2945 14.365V6.90794C13.2945 6.52413 13.6027 6.2042 13.9816 6.19446C13.9879 6.19446 13.9939 6.19446 14.0002 6.19446C14.1887 6.19446 14.3657 6.26778 14.4992 6.40126C14.6324 6.53444 14.706 6.71174 14.706 6.90021V13.5828L18.9588 11.9241L18.9611 11.9232C19.0358 11.8963 19.114 11.8826 19.1931 11.8826C19.4804 11.8826 19.7393 12.0642 19.837 12.3345C19.8639 12.409 19.8776 12.4872 19.8776 12.5668C19.8776 12.8533 19.6972 13.1113 19.428 13.2096L14.4468 15.1527C14.3474 15.1913 14.244 15.2111 14.1391 15.2111L14.1388 15.2105Z"/>
              </g>
              <defs>
              <clipPath id="clip0_10_58">
              <rect width="28" height="28" fill="white" transform="translate(6.10352e-05 0.5)"/>
              </clipPath>
              </defs>
              </svg>
                <Link href="#">
                 {' កម្មវិធីផ្សាយប្រចាំថ្ងៃ (ម៉ោងកម្ពុជា)'}
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioLiveV2;

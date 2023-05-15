'use client';

import FallbackImage from '@/components/common/FallbackImage';
import LineSeparator from '@/components/common/LineSeparator';
import { ClockIcon } from '@heroicons/react/20/solid';
import Hls from 'hls.js';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect } from 'react';

const RadioLive = (props: any) => {
  const { className, program, nextProgram, radioLiveUrl, radioApiBaseUrl } =
    props;

  const timestampTo12Hour = (timestamp: number | string) => {
    return moment(timestamp).format('hh:mm A');
  };

  useEffect(() => {
    const source = radioLiveUrl as string;
    const audio = document.getElementById('plyr') as any;
    new Plyr(audio, {
      captions: { active: true, update: true, language: 'en' },
    });
    if (!Hls.isSupported()) {
      audio.src = source;
    } else {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(audio);
      window.hls = hls;
    }
  });

  if (isEmpty(program) && isEmpty(nextProgram)) return <></>;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
        <div className="aspect-video relative rounded-md shadow-lg">
          <FallbackImage
            fill
            src={`${radioApiBaseUrl}${program.program?.thumbnail?.url || ''} `}
            className="object-cover"
            alt={program.program?.title}
          />
        </div>
        <div>
          {!isEmpty(program) && (
            <>
              <div className="air-now">
                <span className="bg-ams-red text-white px-3 py-2 rounded-lg inline-block text-sm">
                  {program.isNext ? 'កម្មវិធីបន្ទាប់' : 'កំពុងផ្សាយ'}
                </span>
                <div className="text-xl md:text-2xl mt-3 font-semibold">
                  {program.program?.title}
                </div>
                <div className="flex gap-1 items-center my-1 text-sm md:text-base">
                  <ClockIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <time>
                    {timestampTo12Hour(program?.startTimestamp)} ~{' '}
                    {timestampTo12Hour(program?.endTimestamp)}
                  </time>
                </div>
                <div className="md:text-lg">{program.program?.description}</div>
                <div className="mt-2 border">
                  <audio id="plyr" controls playsInline></audio>
                </div>
              </div>
              <LineSeparator weight="border-b" className="my-4" />
            </>
          )}
          {!isEmpty(nextProgram) && (
            <div className="up-next">
              <span className="bg-ams-red text-white px-3 py-2 rounded-lg inline-block text-sm">
                កម្មវិធីបន្ទាប់
              </span>
              <div className="text-lg md:text-xl mt-3">
                {nextProgram.program?.title}
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

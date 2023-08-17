'use client';

import { SectionHeader } from '@/components/common';
import { useRouter } from 'next/navigation';
import { isEmpty, isNil } from 'lodash';
import moment from 'moment-timezone';
import { Card, CardHeader, Image } from '@nextui-org/react';

const RadioSchedule = (props: any) => {
  const router = useRouter();
  const { className, title, programs } = props;

  if (isNil(programs) || isEmpty(programs)) return <></>;

  const timestampTo12Hour = (timestamp: number | string) => {
    return moment(timestamp).format('hh:mm A');
  };

  return (
    <div className={className}>
      <SectionHeader
        type="secondary"
        title={title}
        className="text-2xl font-semibold mb-5"
        lineColor="bg-zinc-300 dark:bg-zinc-50"
      />
      <div className="mb-3 xl:mb-5">
        <div className="gap-2 grid grid-cols-12 grid-rows-2">
          {programs.map((item: any, key: any) => {
            return (
              <Card
                key={key}
                isPressable
                onPress={() => router.push(`audio/${item?.categories[0]}`)}
                className="col-span-12 sm:col-span-4 h-[300px]"
              >
                <Image
                  isZoomed
                  removeWrapper
                  className="z-0 w-full h-full object-cover opacity-100"
                  src={item?.cover[0].sizes.large.url as string}
                  width={400}
                  alt={item?.title as string}
                />
                <CardHeader className="absolute z-auto top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    <time className="text-sm md:text-base block pt-3">
                      {timestampTo12Hour(item?.startTimestamp)} ~{' '}
                      {timestampTo12Hour(item?.endTimestamp)}
                    </time>
                  </p>
                  <h4 className="text-white font-medium text-large bg-ams-red/90 px-2">
                    {item?.title}
                  </h4>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioSchedule;

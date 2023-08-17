'use client';

import { SectionHeader } from '@/components/common';
import { IPodcastComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import { Card, CardHeader, Image } from '@nextui-org/react';

import { useRouter } from 'next/navigation';

const Terms = (props: IPodcastComponentProps) => {
  const router = useRouter();
  const { className, terms, title } = props;
  if (isNil(terms) || isEmpty(terms)) return <></>;

  return (
    <section className={classNames(['latest-news', className])}>
      <div className="my-2 sm:my-5">
        <SectionHeader
          type="primary"
          title={title}
          className="text-3xl font-semibold"
        />
      </div>
      <div className="mb-3 xl:mb-5">
        <div className="gap-2 grid grid-cols-12 grid-rows-2">
          {terms.map((term, key) => {
            return (
              <Card
                key={key}
                isPressable
                onPress={() => router.push(`audio/${term?.slug}`)}
                className="col-span-12 sm:col-span-4 h-[300px]"
              >
                <Image
                  isZoomed
                  removeWrapper
                  className="z-0 w-full h-full object-cover opacity-100"
                  src={term?.coverImage as string}
                  width={400}
                  alt={term?.name as string}
                />
                <CardHeader className="absolute z-auto top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    AMS FM97 podcast
                  </p>
                  <h4 className="text-white font-medium text-large bg-ams-red/90 px-2">
                    {term?.name}
                  </h4>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Terms;

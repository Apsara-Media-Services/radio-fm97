'use client';

import { SectionHeader } from '@/components/common';
import Title from '@/components/podcast/Title';
import { IPodcastComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
// import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from '@nextui-org/react';
// import { useRouter } from 'next/router';

const Terms = (props: IPodcastComponentProps) => {
  const { className, terms, title } = props;
  // const router = useRouter();
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
                // onPress={() =>
                //   router.push(`audio/${term?.slug}`)
                // }
                className="col-span-12 sm:col-span-4 h-[300px]"
              >
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    What to watch
                  </p>
                  <h4 className="text-white font-medium text-large">
                    Stream the Acme event
                  </h4>
                </CardHeader>

                <Image
                  removeWrapper
                  className="z-0 w-full h-full object-cover opacity-90"
                  src={term?.coverImage as string}
                  width={400}
                  height={300}
                  alt={term?.name as string}
                />
                <Link href={`audio/${term?.slug}`}></Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Terms;

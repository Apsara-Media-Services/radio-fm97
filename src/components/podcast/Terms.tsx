'use client';

import { SectionHeader } from '@/components/common';
import Title from '@/components/podcast/Title';
import { IPodcastComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

const Terms = (props: IPodcastComponentProps) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-5">
          {terms.map((term, key) => {
            term.link = `audio/${term?.slug}`;
            return (
              <div key={key}>
                <div className="mb-1">
                  <Link href={term?.link}>
                    <Image
                      className="w-full"
                      src={term?.coverImage as string}
                      width={400}
                      height={300}
                      alt={term?.name as string}
                    />
                  </Link>
                </div>
                <Title term={term} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Terms;

import { SectionHeader } from '@/components/common';
import PodcastCard from '@/components/podcast/PodcastCard';
import app from '@/configs/app';
import { IPodcastComponentProps } from '@/types/component';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash';

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
      <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {terms.map((term, key) => {
            return (
              <PodcastCard
                key={key}
                title={term.name || ''}
                tag={app.tag}
                imageUrl={term.coverImage}
                to={`audio/${term?.slug}`}
                className="h-[300px]"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Terms;

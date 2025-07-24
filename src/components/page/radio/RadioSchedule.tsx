import { isEmpty, isNil } from 'lodash';
import { SectionHeader } from '@/components/common';
import { timestampTo12Hour } from '@/utils/date';
import PodcastCard from '@/components/podcast/PodcastCard';

const RadioSchedule = (props: any) => {
  const { className, title, programs } = props;

  if (isNil(programs) || isEmpty(programs)) return <></>;

  return (
    <div className={className}>
      <SectionHeader
        type="secondary"
        title={title}
        className="text-2xl font-semibold mb-5"
        lineColor="bg-zinc-300 dark:bg-zinc-50"
      />
      <div className="mb-3 xl:mb-5">
        <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((item: any, key: any) => {
            return (
              <PodcastCard
                key={key}
                title={item?.title || ''}
                tag={`${timestampTo12Hour(item?.startTimestamp)} ~ ${timestampTo12Hour(item?.endTimestamp)}`}
                imageUrl={item?.cover[0].sizes?.medium?.url}
                to={`audio/${item?.categories[0]}`}
                className="h-[300px]"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioSchedule;

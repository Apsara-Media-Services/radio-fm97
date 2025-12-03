import { SectionHeader } from '@/components/common';
import PodcastCard from '@/components/podcast/PodcastCard';
import { IRadioProgramComponentProps } from '@/types/component';
import { dateTo12Hour } from '@/utils/date';
import { getMediaUrl } from '@/utils/wp';
import { isEmpty, isNil } from 'lodash';

const RadioSchedule = (props: IRadioProgramComponentProps) => {
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
          {programs.map((item, idx) => {
            return (
              <PodcastCard
                key={idx}
                title={item.name as string}
                tag={`${dateTo12Hour(item.startAt)} ~ ${dateTo12Hour(item.endAt)}`}
                imageUrl={getMediaUrl(item.thumbnail)}
                to={`audio/${item.slug}`}
                isLive={item.isLive}
                isPlayed={item.isPlayed}
                isNext={item.isNext}
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

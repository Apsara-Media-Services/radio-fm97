import { SectionHeader } from '@/components/common';
import PodcastCard from '@/components/podcast/PodcastCard';
import { IRadioProgramComponentProps } from '@/types/component';
import { dateTo12Hour } from '@/utils/date';
import { getAcfMediaUrl } from '@/utils/wp';
import { isEmpty, isNil } from 'lodash';

const RadioSchedule = (props: IRadioProgramComponentProps) => {
  const { className, title, programs } = props;

  if (isNil(programs) || isEmpty(programs)) return <></>;

  return (
    <div className={className}>
      <SectionHeader
        type="primary"
        title={title}
        className="text-2xl md:text-3xl font-semibold mb-5 text-title"
      />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((item, idx) => {
            return (
              <PodcastCard
                key={idx}
                title={item.name as string}
                tag={`${dateTo12Hour(item.startAt)} ~ ${dateTo12Hour(item.endAt)}`}
                imageUrl={getAcfMediaUrl(item.thumbnail)}
                to={item.acf.archivable ? `audio/${item.slug}` : undefined}
                isLive={item.isLive}
                isPlayed={item.isPlayed}
                isNext={item.isNext}
                isReplayed={item.isReplayed}
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

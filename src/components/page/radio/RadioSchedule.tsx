import { SectionHeader } from '@/components/common';
import LineSeparator from '@/components/common/LineSeparator';
import { isEmpty, isNil } from 'lodash';
import moment from 'moment-timezone';

const RadioSchedule = (props: any) => {
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
        className="text-xl md:text-2xl font-semibold"
        lineColor="bg-zinc-300 dark:bg-zinc-50"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7">
        {programs.map((item: any, id: any) => (
          <div key={`${id}-program`} className="">
            <div className="text-lg md:text-xl">{item.title}</div>
            <time className="text-sm md:text-base block pt-3">
              {timestampTo12Hour(item?.startTimestamp)} ~{' '}
              {timestampTo12Hour(item?.endTimestamp)}
            </time>
            <LineSeparator weight="border-b" className="my-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioSchedule;

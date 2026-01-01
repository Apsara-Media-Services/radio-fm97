import dayjs from '@/libs/dayjs';
import { IScheduleProgram } from '@/types/entity';
import { WP_REST_API_ACF_Program } from '@/types/wp';
import _, { find, findIndex, first, isEmpty, map } from 'lodash';

export function getDailyPrograms(
  programs: WP_REST_API_ACF_Program[],
  date: dayjs.Dayjs
) {
  const dayOfWeek = date.format('dddd');
  const schedulingPrograms = _.chain(programs)
    .map((program) => {
      return {
        ...program,
        radio: {
          ...program.acf,
          schedules:
            program.acf.schedules?.filter(
              (schedule) => schedule.day === dayOfWeek
            ) || [],
        },
      };
    })
    .filter((program) => !isEmpty(program.radio?.schedules))
    .flatMap((program) => {
      return map(program.radio?.schedules, (schedule) => {
        const startAt = dayjs(
          `${date.format('YYYY-MM-DD')} ${schedule.start_time}`
        );
        const endAt = dayjs(
          `${date.format('YYYY-MM-DD')} ${schedule.end_time}`
        );
        return {
          ...program,
          thumbnail: program.radio?.thumbnail,
          dayOfWeek: first(schedule?.day) || '',
          startAt: startAt.format('YYYY-MM-DD HH:mm:ss'),
          endAt: endAt.format('YYYY-MM-DD HH:mm:ss'),
          isLive: dayjs().isAfter(startAt) && dayjs().isBefore(endAt),
          isNext: false,
          isPlayed: dayjs().isAfter(endAt),
          isReplayed: schedule.replay ?? false,
        };
      });
    })
    .sortBy(['startAt'])
    .thru((programs) => {
      const activeProgramIdx = findIndex(programs, (program) => program.isLive);
      return map(programs, (program, idx) => {
        if (program.isLive) {
          return program;
        }

        const isNext =
          activeProgramIdx === -1
            ? idx === 0 && dayjs().isBefore(program.startAt)
            : idx === activeProgramIdx + 1;
        return {
          ...program,
          isNext,
        };
      });
    })
    .value() as IScheduleProgram[];
  const firstProgram = first(schedulingPrograms);
  const activeProgram = find(schedulingPrograms, (program) => program.isLive);
  const nextProgram = find(schedulingPrograms, (program) => program.isNext);

  return {
    programs: schedulingPrograms,
    activeProgram,
    nextProgram,
    firstProgram,
  };
}

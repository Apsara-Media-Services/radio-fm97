import { Program } from '@/gql/graphql';
import dayjs from '@/libs/dayjs';
import { IScheduleProgram } from '@/types/entity';
import _, { find, findIndex, first, isEmpty, map } from 'lodash';

export function getDailyPrograms(programs: Program[], dayOfWeek: string) {
  const schedulingPrograms = _.chain(programs)
    .map((program) => {
      return {
        ...program,
        radio: {
          ...program.radio,
          schedules:
            program.radio?.schedules?.filter(
              (schedule) => first(schedule?.day) === dayOfWeek
            ) || [],
        },
      };
    })
    .filter((program) => !isEmpty(program.radio?.schedules))
    .flatMap((program) => {
      return map(program.radio?.schedules, (schedule) => {
        const startAt = dayjs(
          `${dayjs().format('YYYY-MM-DD')} ${schedule?.startTime}`
        );
        const endAt = dayjs(
          `${dayjs().format('YYYY-MM-DD')} ${schedule?.endTime}`
        );
        return {
          ...program,
          thumbnail: program.radio?.thumbnail?.node,
          dayOfWeek: first(schedule?.day) || '',
          startAt: startAt.format('YYYY-MM-DD HH:mm:ss'),
          endAt: endAt.format('YYYY-MM-DD HH:mm:ss'),
          isLive: dayjs().isAfter(startAt) && dayjs().isBefore(endAt),
          isNext: false,
          isPlayed: dayjs().isAfter(endAt),
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
          (activeProgramIdx === -1 && idx === 0) ||
          idx === activeProgramIdx + 1;
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

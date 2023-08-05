import { Container } from '@/components/common';
import FallbackImage from '@/components/common/FallbackImage';
import MainLayout from '@/components/layout/MainLayout';
import { RadioLive, RadioSchedule } from '@/components/page/radio';
import { APP_NAME_ALT } from '@/constants/app';
import { LOGO } from '@/constants/app';
import ScheduleService from '@/services/ScheduleService';
import { find, isEmpty, map } from 'lodash';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Phnom_Penh');
const scheduleService = new ScheduleService();

async function getSchedules() {
  const response = await scheduleService.all();
  const schedules = JSON.parse(response);
  // console.warn(schedules.monday);

  const programs = map(schedules.monday, (program) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const startDateTime = moment(`${currentDate} ${program?.time_range[0]}`);
    const endDateTime = moment(`${currentDate} ${program?.time_range[1]}`);

    return {
      ...program,
      startTimestamp: startDateTime.valueOf(),
      endTimestamp: endDateTime.valueOf(),
    };
  });

  const program =
    find(programs, (program) => {
      const timestamp = moment().valueOf();
      return (
        timestamp >= program.startTimestamp && timestamp < program.endTimestamp
      );
    }) || {};

  const nextProgram =
    find(programs, (_program) => {
      const timestamp = program?.endTimestamp || moment().valueOf();
      return _program.startTimestamp >= timestamp;
    }) || {};

  // console.warn(moment().valueOf(), moment().format('YYYY-MM-DD hh:mm A'));
  // console.warn('Program: ', program);
  // console.warn('Next Program: ', nextProgram);

  return {
    radioApiBaseUrl: process.env.RADIO_API_BASE_URL,
    radioLiveUrl: process.env.RADIO_LIVE_URL,
    programs,
    program: isEmpty(program) ? { ...nextProgram, isNext: true } : program,
    nextProgram: isEmpty(program) ? {} : nextProgram,
  };
}

const Live = async () => {
  const {
    programs = [],
    program,
    nextProgram,
    radioApiBaseUrl,
    radioLiveUrl,
  }: any = await getSchedules();

  return (
    <MainLayout>
      <Container className="py-3 sm:py-5 body">
        {programs.length > 0 && (
          <>
            <RadioLive
              program={program}
              nextProgram={nextProgram}
              radioApiBaseUrl={radioApiBaseUrl}
              radioLiveUrl={radioLiveUrl}
            />
            <RadioSchedule
              className="mt-10"
              title="កម្មវិធីផ្សាយប្រចាំថ្ងៃ (ម៉ោងកម្ពុជា)"
              programs={programs}
            />
          </>
        )}
        {!programs.length && (
          <div className="relative w-72 aspect-square mx-auto">
            <FallbackImage
              fill
              src={LOGO as string}
              alt={APP_NAME_ALT}
              className="rounded-lg"
            />
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

export default Live;

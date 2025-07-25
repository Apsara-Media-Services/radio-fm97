import { Container } from '@/components/common';
import FallbackImage from '@/components/common/FallbackImage';
import MainLayout from '@/components/layout/MainLayout';
import { RadioLive, RadioSchedule } from '@/components/page/radio';
import app from '@/configs/app';
import ScheduleService from '@/services/ScheduleService';
import dayjs from '@/libs/dayjs';
import { find, isEmpty, lowerCase, map } from 'lodash';

const scheduleService = new ScheduleService();

async function getSchedules() {
  const response = await scheduleService.all();
  const schedules = JSON.parse(response);
  const today = lowerCase(dayjs().format('dddd'));

  const programs = map(schedules[today], (program) => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const startDateTime = dayjs(`${currentDate} ${program?.time_range[0]}`);
    const endDateTime = dayjs(`${currentDate} ${program?.time_range[1]}`);

    return {
      ...program,
      startTimestamp: startDateTime.valueOf(),
      endTimestamp: endDateTime.valueOf(),
    };
  });

  const program =
    find(programs, (program) => {
      const timestamp = dayjs().valueOf();
      return (
        timestamp >= program.startTimestamp && timestamp < program.endTimestamp
      );
    }) || {};

  const nextProgram =
    find(programs, (_program) => {
      const timestamp = program?.endTimestamp || dayjs().valueOf();
      return _program.startTimestamp >= timestamp;
    }) || {};

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
      {programs.length > 0 && (
        <>
          {isEmpty(program) && (
            <RadioLive
              program={program}
              nextProgram={nextProgram}
              radioApiBaseUrl={radioApiBaseUrl}
              radioLiveUrl={radioLiveUrl}
            />
          )}
          <RadioLive
            program={program}
            nextProgram={nextProgram}
            radioApiBaseUrl={radioApiBaseUrl}
            radioLiveUrl={radioLiveUrl}
          />
          
          <Container className='pt-10'>
            <RadioSchedule
              className=""
              title="កម្មវិធីផ្សាយប្រចាំថ្ងៃ (ម៉ោងកម្ពុជា)"
              programs={programs}
            />
          </Container>
        </>
      )}
      <Container className="py-3 sm:py-5 body">
        {!programs.length && (
          <div className="relative w-72 aspect-square mx-auto">
            <FallbackImage
              fill
              src={app.appLogo}
              alt={app.appName}
              className="rounded-lg"
            />
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

export default Live;
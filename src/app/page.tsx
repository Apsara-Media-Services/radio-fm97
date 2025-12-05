import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import { RadioLive, RadioSchedule } from '@/components/page/radio';
import { getDailyPrograms } from '@/helpers/program';
import dayjs from '@/libs/dayjs';
import ProgramService from '@/services/ProgramService';
import _, { isEmpty } from 'lodash';

const programService = new ProgramService();

async function loadPrograms() {
  const programs = await programService.all();
  const today = dayjs().format('dddd');
  const tomorrow = dayjs().add(1, 'day').format('dddd');

  const {
    programs: todayPrograms,
    activeProgram,
    nextProgram,
  } = getDailyPrograms(programs, today);

  const { programs: tomorrowPrograms, firstProgram: nextTomorrowProgram } =
    getDailyPrograms(programs, tomorrow);

  const isLive = !!activeProgram || !!nextProgram;

  return {
    programs: isLive ? todayPrograms : tomorrowPrograms,
    activeProgram,
    nextProgram,
    nextTomorrowProgram,
    isLive,
  };
}

const Live = async () => {
  const { programs, activeProgram, nextProgram, nextTomorrowProgram, isLive } =
    await loadPrograms();

  return (
    <MainLayout>
      <RadioLive
        className="pb-10"
        activeProgram={activeProgram}
        nextProgram={nextProgram}
        nextTomorrowProgram={nextTomorrowProgram}
      />
      {!isEmpty(programs) && (
        <Container className="pb-10">
          <RadioSchedule
            title={
              isLive
                ? 'កម្មវិធីផ្សាយប្រចាំថ្ងៃ (ម៉ោងកម្ពុជា)'
                : 'កម្មវិធីសម្រាប់ថ្ងៃស្អែក (ម៉ោងកម្ពុជា)'
            }
            programs={programs}
          />
        </Container>
      )}
    </MainLayout>
  );
};

export default Live;

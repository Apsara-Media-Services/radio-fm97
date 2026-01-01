import JsonLD from '@/components/JsonLD';
import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import HomeLatestNews from '@/components/page/home/HomeLatestNews';
import { RadioLive, RadioSchedule } from '@/components/page/radio';
import { getDailyPrograms } from '@/helpers/program';
import dayjs from '@/libs/dayjs';
import PostService from '@/services/PostService';
import ProgramService from '@/services/ProgramService';
import _, { isEmpty } from 'lodash';

const programService = new ProgramService();
const postService = new PostService();

async function loadPrograms() {
  const { data: programs } = await programService.all();
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');

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

const Home = async () => {
  const { programs, activeProgram, nextProgram, nextTomorrowProgram, isLive } =
    await loadPrograms();
  const { data: posts } = await postService.all({ per_page: 12 });

  return (
    <>
      <JsonLD />
      <MainLayout>
        <RadioLive
          activeProgram={activeProgram}
          nextProgram={nextProgram}
          nextTomorrowProgram={nextTomorrowProgram}
        />
        {!isEmpty(programs) && (
          <div className="bg-white dark:bg-slate-950 py-5 md:py-10">
            <Container>
              <RadioSchedule
                title={
                  isLive
                    ? 'កម្មវិធីផ្សាយប្រចាំថ្ងៃ'
                    : 'កម្មវិធីសម្រាប់ថ្ងៃស្អែក'
                }
                programs={programs}
              />
            </Container>
          </div>
        )}
        {!isEmpty(posts) && (
          <Container className="py-5 md:py-10">
            <HomeLatestNews title="ព័ត៌មានថ្មីៗ" posts={posts} />
          </Container>
        )}
      </MainLayout>
    </>
  );
};

export default Home;

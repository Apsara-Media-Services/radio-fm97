import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastProgramList from '@/components/podcast/PodcastProgramList';
import ProgramService from '@/services/ProgramService';

const programService = new ProgramService();

const ProgramListPage = async () => {
  const { data: programs } = await programService.all();

  return (
    <>
      <MainLayout>
        <Container className="py-5 md:py-10">
          <PodcastProgramList title="កម្មវិធីផ្សាយ" programs={programs} />
        </Container>
      </MainLayout>
    </>
  );
};

export default ProgramListPage;

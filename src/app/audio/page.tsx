import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastProgramList from '@/components/podcast/PodcastProgramList';
import ProgramService from '@/services/ProgramService';

const programService = new ProgramService();

const ProgramListPage = async () => {
  const programs = await programService.all();

  return (
    <>
      <MainLayout>
        <Container className="py-3 sm:py-5 body">
          <PodcastProgramList title="កម្មវិធីផ្សាយ" programs={programs} />
        </Container>
      </MainLayout>
    </>
  );
};

export default ProgramListPage;

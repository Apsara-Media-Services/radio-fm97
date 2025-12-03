import MainLayout from '@/components/layout/MainLayout';
import PodcastProgramDetail from '@/components/podcast/PodcastProgramDetail';
import ProgramService from '@/services/ProgramService';
import { IDynamicPage } from '@/types/page';
import { last } from 'lodash';

const programService = new ProgramService();

const ProgramDetailPage = async ({ params }: IDynamicPage) => {
  const { slug } = await params;
  const program = await programService.findBySlugWithPosts(
    last(slug) as string
  );

  return (
    <MainLayout>
      <PodcastProgramDetail program={program} />
    </MainLayout>
  );
};

export default ProgramDetailPage;

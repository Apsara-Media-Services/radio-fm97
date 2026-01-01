import Breadcrumb from '@/components/Breadcrumb';
import JsonLD from '@/components/JsonLD';
import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastProgramList from '@/components/podcast/PodcastProgramList';
import { getProgramListPageBreadcrumb } from '@/helpers/breadcrumb';
import { getProgramListPageMetadata } from '@/helpers/seo';
import ProgramService from '@/services/ProgramService';

const programService = new ProgramService();

export const metadata = getProgramListPageMetadata();

const ProgramListPage = async () => {
  const { data: programs } = await programService.all();
  const breadcrumbs = getProgramListPageBreadcrumb();

  return (
    <>
      <JsonLD breadcrumbs={breadcrumbs} />
      <MainLayout>
        <Container className="py-5 md:py-10">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <PodcastProgramList title="កម្មវិធីផ្សាយ" programs={programs} />
        </Container>
      </MainLayout>
    </>
  );
};

export default ProgramListPage;

import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import PostService from '@/services/PostService';
import ProgramService from '@/services/ProgramService';
import { IDynamicPage } from '@/types/page';
import { last } from 'lodash';

const programService = new ProgramService();
const postService = new PostService();

const ProgramDetailPage = async ({ params }: IDynamicPage) => {
  const { slug } = await params;
  const program = await programService.findBySlug(last(slug) as string);
  const { data: posts, ...paginator } = await postService.all({
    programs: program.id.toString(),
  });

  return (
    <MainLayout>
      <PodcastHero program={program} post={posts[0]} />
      <Container className="py-5">
        <PodcastPostList
          program={program}
          posts={posts}
          paginator={paginator}
        />
      </Container>
    </MainLayout>
  );
};

export default ProgramDetailPage;

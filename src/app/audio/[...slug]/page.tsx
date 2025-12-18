import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import PostList from '@/components/post/PostList';
import PostService from '@/services/PostService';
import ProgramPostService from '@/services/ProgramPostService';
import ProgramService from '@/services/ProgramService';
import { IDynamicPage } from '@/types/page';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import { first, last } from 'lodash';

const programService = new ProgramService();
const programPostService = new ProgramPostService();
const postService = new PostService();

export default async function ProgramDetailPage({ params }: IDynamicPage) {
  const { slug } = await params;
  const program = await programService.findBySlug(last(slug) as string);
  const programPostData = await programPostService.all({
    programs: program.id.toString(),
    per_page: 5,
  });
  const postData = await postService.all({
    programs: program.id.toString(),
    per_page: 6,
  });

  return (
    <MainLayout>
      <PodcastHero
        program={program}
        post={first(programPostData.data) || ({} as WP_REST_API_ACF_Post)}
      />
      <div className="bg-white dark:bg-slate-950 py-5 md:py-10">
        <Container>
          <div className="mb-5 md:mb-10">
            <SectionHeader
              type="primary"
              title="កម្មវិធីផ្សាយគ្រប់វគ្គ"
              className="text-2xl md:text-3xl font-semibold text-title"
            />
          </div>
          <PodcastPostList
            program={program}
            items={programPostData.data}
            paginator={programPostData.pagination}
            query={programPostData.query}
          />
        </Container>
      </div>

      <div className="py-5 md:py-10">
        <Container>
          <div className="mb-5 md:mb-10">
            <SectionHeader
              type="primary"
              title="អត្ថបទទាក់ទងនឹងកម្មវិធីនេះ"
              className="text-2xl md:text-3xl font-semibold text-title"
            />
          </div>
          <PostList
            items={postData.data}
            paginator={postData.pagination}
            query={postData.query}
            pageable={true}
          />
        </Container>
      </div>
    </MainLayout>
  );
}

export async function generateStaticParams() {
  const programs = await programService.all();
  return programs.data.map((program) => ({
    slug: [program.slug],
  }));
}

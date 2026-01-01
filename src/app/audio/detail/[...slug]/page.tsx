import Breadcrumb from '@/components/Breadcrumb';
import JsonLD from '@/components/JsonLD';
import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PodcastDetail from '@/components/podcast/PodcastDetail';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import { getProgramPostPageBreadcrumb } from '@/helpers/breadcrumb';
import { getProgramPostPageMetadata } from '@/helpers/seo';
import ProgramPostService from '@/services/ProgramPostService';
import ProgramService from '@/services/ProgramService';
import { IDynamicPage } from '@/types/page';
import { WP_REST_API_ACF_Program } from '@/types/wp';
import { last } from 'lodash';
import { cache } from 'react';

const programService = new ProgramService();
const programPostService = new ProgramPostService();

const getPost = cache(async (slug: string) => {
  const post = await programPostService.find(slug);
  return post;
});

const PodcastDetailPage = async ({ params }: IDynamicPage) => {
  const { slug } = await params;

  const post = await getPost(last(slug) as string);
  const program = (post.relation?.program || {}) as WP_REST_API_ACF_Program;
  const programPostData = await programPostService.all({
    programs: `${program?.id}`,
    exclude: post.id.toString(),
    per_page: 5,
  });
  const breadcrumbs = getProgramPostPageBreadcrumb(post);

  return (
    <>
      <JsonLD breadcrumbs={breadcrumbs} post={post} />
      <MainLayout>
        <Container className="py-5 md:py-10">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <PodcastDetail post={post} />
        </Container>
        <div className="bg-white dark:bg-slate-950 py-5 md:py-10">
          <Container>
            <div className="mb-5 md:mb-10">
              <SectionHeader
                type="primary"
                title="មើលវគ្គផ្សេងទៀត"
                className="text-2xl md:text-3xl font-semibold text-title"
              />
            </div>
            <PodcastPostList
              program={program}
              items={programPostData.data}
              paginator={programPostData.pagination}
              query={programPostData.query}
              title="មើលវគ្គផ្សេងទៀត"
            />
          </Container>
        </div>
      </MainLayout>
    </>
  );
};

export default PodcastDetailPage;

export async function generateStaticParams() {
  const { data: programs } = await programService.all();

  const params = [];
  for (const program of programs) {
    const { data: posts } = await programPostService.all({
      programs: `${program.id}`,
      per_page: 5,
    });

    const slugs = posts.map((post) => ({
      slug: [`${post.id}`],
    }));
    params.push(...slugs);
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;
  const post = await getPost(last(slug) as string);

  return getProgramPostPageMetadata(post);
}

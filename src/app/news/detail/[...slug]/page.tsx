import Breadcrumb from '@/components/Breadcrumb';
import JsonLD from '@/components/JsonLD';
import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PostDetail from '@/components/post/PostDetail';
import PostList from '@/components/post/PostList';
import { getNewsPostPageBreadcrumb } from '@/helpers/breadcrumb';
import { getNewsPostPageMetadata } from '@/helpers/seo';
import PostService from '@/services/PostService';
import { IDynamicPage } from '@/types/page';
import { last, map } from 'lodash';
import { cache } from 'react';

const postService = new PostService();

const getPost = cache(async (slug: string) => {
  const post = await postService.find(slug);
  return post;
});

const PostDetailPage = async ({ params }: IDynamicPage) => {
  const { slug } = await params;
  const post = await postService.find(last(slug) as string);
  const postData = await postService.all({
    categories: map(post.relation?.categories_actual, 'id').join(','),
    exclude: post.id.toString(),
    per_page: 6,
  });
  const breadcrumbs = getNewsPostPageBreadcrumb(post);

  return (
    <>
      <JsonLD breadcrumbs={breadcrumbs} post={post} />
      <MainLayout>
        <Container className="py-5 md:py-10">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <PostDetail post={post} />
        </Container>
        <div className="bg-white dark:bg-slate-950 py-5 md:py-10">
          <Container>
            <div className="mb-5 md:mb-10">
              <SectionHeader
                type="primary"
                title="អត្ថបទស្រដៀងៗគ្នា"
                className="text-2xl md:text-3xl font-semibold text-title"
              />
            </div>
            <PostList
              items={postData.data}
              paginator={postData.pagination}
              query={postData.query}
            />
          </Container>
        </div>
      </MainLayout>
    </>
  );
};

export default PostDetailPage;

export async function generateStaticParams() {
  const { data: posts } = await postService.all({ per_page: 50 });

  return posts.map((post) => ({
    slug: [`${post.id}`],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;
  const post = await getPost(last(slug) as string);

  return getNewsPostPageMetadata(post);
}

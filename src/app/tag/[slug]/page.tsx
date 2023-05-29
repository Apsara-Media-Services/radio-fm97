import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import InfiniteScrollPosts from '@/components/page/tag/InfiniteScrollPosts';
import { TagService } from '@/services';
import { IDynamicPage } from '@/types/page';

const tagService = new TagService();

const Tag = async ({ params: { slug } }: IDynamicPage) => {
  const tag = await tagService.findBySlugWithPosts(slug as string, {
    variables: { first: 12 },
  });

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          <div className="my-2 sm:my-5">
            <SectionHeader
              type="primary"
              title={tag.name as string}
              className="text-xl font-semibold"
            />
          </div>
          <InfiniteScrollPosts tag={tag} slug={slug} />
        </Container>
      </MainLayout>
    </div>
  );
};

export default Tag;

export async function generateStaticParams() {
  const tags = await tagService.all();

  return tags.map(({ slug }) => ({ slug }));
}

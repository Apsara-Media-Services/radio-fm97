import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import InfiniteScrollPosts from '@/components/page/category/InfiniteScrollPosts';
import { CategoryService } from '@/services';
import { IDynamicPage } from '@/types/page';
import { last } from 'lodash';

const categoryService = new CategoryService();

const Category = async ({ params: { slug } }: IDynamicPage) => {
  const category = await categoryService.findBySlugWithPosts(
    last(slug) as string,
    {
      variables: { first: 6 },
    }
  );

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          <div className="my-2 sm:my-5">
            <SectionHeader
              type="primary"
              title={category?.name as string}
              className="text-xl font-semibold"
            />
          </div>
          <InfiniteScrollPosts category={category} slug={last(slug)} />
        </Container>
      </MainLayout>
    </div>
  );
};

export default Category;

export async function generateStaticParams() {
  const categories = await categoryService.all();
  const slugs = categories.map(({ uri }) => {
    const slug = uri
      ?.replace('/category', '')
      .split('/')
      .filter((seg) => seg !== '');
    return { slug };
  });

  return slugs;
}

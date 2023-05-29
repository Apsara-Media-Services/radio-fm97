import { Container } from '@/components/common';
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

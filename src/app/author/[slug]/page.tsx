import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import InfiniteScrollPosts from '@/components/page/author/InfiniteScrollPosts';
import { UserService } from '@/services';
import { IDynamicPage } from '@/types/page';

const userService = new UserService();

const Author = async ({ params: { slug } }: IDynamicPage) => {
  const userService = new UserService();
  const user = await userService.findBySlugWithPosts(slug as string, {
    variables: { first: 11 },
  });

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          <InfiniteScrollPosts user={user} slug={slug} />
        </Container>
      </MainLayout>
    </div>
  );
};

export default Author;

export async function generateStaticParams() {
  const users = await userService.all();
  return users.map(({ slug }) => ({ slug }));
}

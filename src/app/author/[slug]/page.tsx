import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import { SkeletonPostItem } from '@/components/skeleton';
import { UserService } from '@/services';
import { IDynamicPage } from '@/types/page';

const userService = new UserService();

const Author = async ({ params: { slug } }: IDynamicPage) => {
  const user = await userService.test();
  console.warn(user);

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          {user?.slug}
          <SkeletonPostItem />
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

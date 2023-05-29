import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import InfiniteScrollPosts from '@/components/page/author/InfiniteScrollPosts';
import { SkeletonPostItem } from '@/components/skeleton';
import { TagService, UserService } from '@/services';
import { IDynamicPage } from '@/types/page';
import { isNil } from 'lodash';

const userService = new UserService();
const tagService = new TagService();

const Author = async ({ params: { slug } }: IDynamicPage) => {
  const user = await tagService.findBySlugWithPosts(slug as string, {
    variables: { first: 11 },
  });

  if (isNil(user)) return <></>;

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          <SkeletonPostItem />
          {/* <InfiniteScrollPosts user={user} slug={slug} /> */}
        </Container>
      </MainLayout>
    </div>
  );
};

export default Author;

// export async function generateStaticParams() {
//   const users = await userService.all();
//   return users.map(({ slug }) => ({ slug }));
// }

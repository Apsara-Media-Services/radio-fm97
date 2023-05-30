import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import InfiniteScrollPosts from '@/components/page/author/InfiniteScrollPosts';
import { UserService } from '@/services';
import { IDynamicPage } from '@/types/page';
import { find, head } from 'lodash';

const userService = new UserService();

const Author = async ({ params: { slug } }: IDynamicPage) => {
  const _users = await userService.all();
  const { databaseId } = find(_users, ['slug', slug]) || {};

  const users = await userService.allWithPosts({
    variables: {
      first: 1,
      where: { search: String(databaseId), searchColumns: 'ID' },
      postFirst: 11,
    },
  });
  const user = head(users);

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

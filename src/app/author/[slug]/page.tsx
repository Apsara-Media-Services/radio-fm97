import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import { SkeletonPostItem } from '@/components/skeleton';
import { UserService } from '@/services';
import { IDynamicPage } from '@/types/page';

const userService = new UserService();

const Author = async ({ params: { slug } }: IDynamicPage) => {
  // const user = await userService.test();
  // console.warn(user);
  const url = `https://radio.amskh.co/graphql`;
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Test($id: ID!) {
          user(id: $id) {
            id
            name
            slug
            databaseId
          }
        }
      `,
      variables: {
        id: 'dXNlcjox',
      },
    }),
  };
  const res = await fetch(url, init);
  const user = await res.json();
  console.warn(user);

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          {/* {user?.slug} */}
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

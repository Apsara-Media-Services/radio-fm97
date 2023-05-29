import { SkeletonPostItem } from '@/components/skeleton';
import { IDynamicPage } from '@/types/page';

const Author = async ({ params: { slug } }: IDynamicPage) => {
  return (
    <>
      {slug}
      <SkeletonPostItem />
    </>
  );
};

export default Author;

// export async function generateStaticParams() {
//   const users = await userService.all();
//   return users.map(({ slug }) => ({ slug }));
// }

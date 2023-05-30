import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import { PostItemDetail } from '@/components/post';
import { ADS } from '@/constants/app';
import { PostService } from '@/services';
import { IDynamicPage } from '@/types/page';
import Image from 'next/image';

const postService = new PostService();

const PostDetail = async ({ params: { slug } }: IDynamicPage) => {
  const post = await postService.find(slug as string);

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5">
          <div className="grid sm:grid-cols-3 gap-3 lg:gap-6 sm:mt-6">
            <div className="col-span-2">
              <PostItemDetail post={post} />
            </div>
            <div className="mb-4 col-span-2 sm:col-auto">
              <div className="sticky top-24">
                <div className="ads">
                  <Image
                    src={ADS.CAMMA}
                    alt="CAMMA Microfinance"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-5">
            <Image
              src={ADS.OLATTE}
              alt="Olatte"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-cover"
            />
          </div>
        </Container>
      </MainLayout>
    </div>
  );
};

export default PostDetail;

export async function generateStaticParams() {
  const posts = await postService.all({ variables: { first: 100 } });

  return posts.map(({ databaseId }) => ({ slug: String(databaseId) }));
}

import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import HomeEconomicNews from '@/components/page/home/HomeEconomicNews';
import HomeLatestNews from '@/components/page/home/HomeLatestNews';
import { ADS } from '@/constants/app';
import { Post } from '@/gql/graphql';
import { PostService } from '@/services';
import Image from 'next/image';

const Home = async () => {
  const postService = new PostService();
  const latestPosts: Post[] = await postService.all({
    variables: { first: 5 },
  });
  const economyPosts: Post[] = await postService.getByCategorySlug('fm97', {
    variables: { first: 7 },
  });

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5 body">
          <HomeLatestNews title="ព័ត៌មានថ្មីបំផុត" posts={latestPosts} />
          <HomeEconomicNews title="សេដ្ឋកិច្ច" posts={economyPosts} />
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

export default Home;

import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import HomeEconomicNews from '@/components/page/home/HomeEconomicNews';
import HomeLatestNews from '@/components/page/home/HomeLatestNews';
import { ADS } from '@/constants/app';
import { PostService } from '@/services';
import Image from 'next/image';

const Home = async () => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query User {
          user(id: "suo-vanlok", idType: SLUG) {
            id
            name
          }
        }
      `,
    }),
  };
  const res = await fetch('https://admin.amskh.co/graphql', init);
  console.warn(await res.json());

  const postService = new PostService();
  const latestPosts = await postService.all({
    variables: { first: 5 },
  });
  const economyPosts = await postService.getByCategorySlug('fm97', {
    variables: { first: 7 },
  });

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5 body">
          <HomeLatestNews title="ព័ត៌មានថ្មីបំផុត" posts={latestPosts} />
          <HomeEconomicNews
            title="សេដ្ឋកិច្ច"
            link="/economy"
            posts={economyPosts}
          />
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

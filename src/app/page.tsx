import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import HomeEconomicNews from '@/components/page/home/HomeEconomicNews';
import HomeLatestNews from '@/components/page/home/HomeLatestNews';
import { ADS, LOGO } from '@/constants/app';
import { Post } from '@/gql/graphql';
import useBreakpoint from '@/hooks/use-breakpoint';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const Home: NextPage = () => {
  const post = {
    title:
      'រដ្ឋបាលរាជធានីភ្នំពេញ រៀបចំពិធីក្រុងពាលី សុំសេចក្តីសុខ សេចក្តីចម្រើន ក្នុងពិធីប្រកាស និង ប្រគល់ជូនគោរមងារកិត្តិយសសម្តេចតេជោ ហ៊ុន សែន និងគោរមងារកិត្តិយស ទីប្រឹក្សាជាន់ខ្ពស់”របស់អង្គការពុទ្ធសាសនិកពិភពលោក ជូនឯកឧត្តម បណ្ឌិត ហ៊ុន ម៉ាណែត',
    date: '2023-05-01 00:00:00',
    excerpt:
      'រដ្ឋបាលរាជធានីភ្នំពេញ រៀបចំពិធីក្រុងពាលី សុំសេចក្តីសុខ សេចក្តីចម្រើន ក្នុងពិធីប្រកាស និង ប្រគល់ជូនគោរមងារកិត្តិយសសម្តេចតេជោ ហ៊ុន សែន និងគោរមងារកិត្តិយស ទីប្រឹក្សាជាន់ខ្ពស់”របស់អង្គការពុទ្ធសាសនិកពិភពលោក ជូនឯកឧត្តម បណ្ឌិត ហ៊ុន ម៉ាណែត',
    author: {
      node: {
        name: 'ហេង សម្បត្តិ',
      },
    },
    featuredImage: {
      node: {
        title: 'Image',
        sourceUrl: LOGO,
      },
    },
  } as Post;
  const posts: Post[] = [
    { ...post, id: '1', databaseId: 1 },
    { ...post, id: '2', databaseId: 2 },
    { ...post, id: '3', databaseId: 3 },
    { ...post, id: '4', databaseId: 4 },
    { ...post, id: '5', databaseId: 5 },
    { ...post, id: '6', databaseId: 6 },
    { ...post, id: '7', databaseId: 7 },
    { ...post, id: '8', databaseId: 8 },
  ];

  return (
    <div>
      <MainLayout>
        <Container className="py-3 sm:py-5 body">
          <HomeLatestNews title="ព័ត៌មានថ្មីបំផុត" posts={posts} />
          <HomeEconomicNews title="សេដ្ឋកិច្ច" posts={posts} />
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

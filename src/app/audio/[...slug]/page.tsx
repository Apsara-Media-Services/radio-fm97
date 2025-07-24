import MainLayout from '@/components/layout/MainLayout';
import PodcastPage from '@/components/podcast/Podcast';
import { PodcastService } from '@/services';
import { IDynamicPage } from '@/types/page';
import { last } from 'lodash';

const podcastService = new PodcastService();

const Podcast = async ({ params }: IDynamicPage) => {
  const { slug } = await params;
  const podcast = await podcastService.findWithPosts(last(slug) as string);

  if (!podcast) {
    return <></>;
  }

  return (
    <MainLayout>
      <PodcastPage podcast={podcast} />
    </MainLayout>
  );
};

export default Podcast;

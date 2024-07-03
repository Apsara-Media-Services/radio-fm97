import MainLayout from '@/components/layout/MainLayout';
import InfiniteScroller from '@/components/podcast/InfiniteScroller';
import { PodcastService } from '@/services';
import { IDynamicPage } from '@/types/page';
import { last } from 'lodash';

const podcastService = new PodcastService();

const Podcast = async ({ params: { slug } }: IDynamicPage) => {
  const posts = await podcastService.getPodcastPosts(last(slug) as string, {
    variables: { first: 30 },
  });

  return (
    <div>
      <MainLayout>
        <InfiniteScroller podcast={posts} slug={last(slug)} />
      </MainLayout>
    </div>
  );
};

export default Podcast;

export async function generateStaticParams() {
  const podcasts = await podcastService.getPodcasts({
    variables: { first: 100 },
  });
  const slug = podcasts.map(({ slug }) => {
    return slug;
  });
  return slug;
}

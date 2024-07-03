import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import Terms from '@/components/podcast/Terms';
import { PodcastService } from '@/services';

const Podcast = async () => {
  const podcastService = new PodcastService();
  const podcasts = await podcastService.getPodcasts({
    variables: { first: 100 },
  });

  return (
    <>
      <MainLayout>
        <Container className="py-3 sm:py-5 body">
          <Terms title="កម្មវិធីផ្សាយ" terms={podcasts} />
        </Container>
      </MainLayout>
    </>
  );
};

export default Podcast;

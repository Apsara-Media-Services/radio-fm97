import { Container, SectionHeader } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import PostList from '@/components/post/PostList';
import PostService from '@/services/PostService';

const postService = new PostService();

const NewsListPage = async () => {
  const { data, pagination, query } = await postService.all({ per_page: 12 });

  return (
    <>
      <MainLayout>
        <Container className="py-5 md:py-10">
          <div className="mb-5 md:mb-10">
            <SectionHeader
              type="primary"
              title="ព័ត៌មានថ្មីៗ"
              className="text-2xl md:text-3xl font-semibold"
            />
          </div>
          <PostList
            items={data}
            paginator={pagination}
            query={query}
            pageable={true}
          />
        </Container>
      </MainLayout>
    </>
  );
};

export default NewsListPage;

import ApiBaseService from '@/services/ApiBaseService';
import MediaService from '@/services/MediaService';
import { IFetchQueryParams, IPaginatedResponse } from '@/types/fetch';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import { find } from 'lodash';

const mediaService = new MediaService();

export default class PostService extends ApiBaseService<WP_REST_API_ACF_Post> {
  constructor() {
    const resource = 'post';
    super(resource);
  }

  async all(
    query: IFetchQueryParams = {}
  ): Promise<IPaginatedResponse<WP_REST_API_ACF_Post>> {
    const response = await super.all(query);
    const { data: posts } = response;

    const mediaIds = posts
      .map((post) => post.acf.audio?.id)
      .filter(Boolean) as number[];

    const { data: medias } = await mediaService.all({
      include: mediaIds.join(','),
      per_page: mediaIds.length,
    });

    posts.map((post) => {
      const media = find(medias, ['id', post.acf.audio?.id]);
      if (media) {
        post.acf.audio!.media = media;
      }
    });

    return {
      ...response,
      data: posts,
    };
  }
}

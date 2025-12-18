import ApiBaseService from '@/services/ApiBaseService';
import MediaService from '@/services/MediaService';
import ProgramService from '@/services/ProgramService';
import PostDto from '@/services/dto/PostDto';
import { IFetchQueryParams, IPaginatedResponse } from '@/types/fetch';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import _, { find, set } from 'lodash';
import { WP_REST_API_Attachment } from 'wp-types';

const mediaService = new MediaService();
const programService = new ProgramService();

export default class BasePostService extends ApiBaseService<WP_REST_API_ACF_Post> {
  constructor(query: IFetchQueryParams = {}) {
    const resource = 'post';
    const dto = PostDto;
    super(resource, query, dto);
  }

  async all(
    query: IFetchQueryParams = {}
  ): Promise<IPaginatedResponse<WP_REST_API_ACF_Post>> {
    const response = await super.all(query);
    const { data: posts } = response;

    // // Media Details
    // const mediaIds = posts
    //   .map((post) => post.acf.audio?.id)
    //   .filter(Boolean) as number[];
    // const mediaPromise = mediaIds.length
    //   ? mediaService.all({
    //       include: mediaIds.join(','),
    //       per_page: mediaIds.length,
    //     })
    //   : Promise.resolve(null);

    // // Program Details
    // const programIds = _.chain(posts)
    //   .flatMap((post) => post.programs)
    //   .filter(Boolean)
    //   .uniq()
    //   .value();
    // const programPromise = programIds.length
    //   ? programService.all({
    //       include: programIds.join(','),
    //       per_page: programIds.length,
    //     })
    //   : Promise.resolve(null);

    // const [medias, programs] = await Promise.all([
    //   mediaPromise,
    //   programPromise,
    // ]);

    // posts.map((post) => {
    //   if (medias && medias.data.length) {
    //     const media = find(medias.data || [], ['id', post.acf.audio?.id]);
    //     if (media) {
    //       set(post, 'acf.audio.media', media);
    //     }
    //   }

    //   if (programs && programs.data.length) {
    //     const originalPrograms = post._embedded?.['wp:term']?.[2] || [];
    //     const enrichedPrograms = originalPrograms.map((_program: any) => {
    //       const program = find(programs.data, ['id', _program.id]);
    //       return program || _program;
    //     });
    //     set(post, '_embedded.wp:term[2]', enrichedPrograms);
    //   }
    // });

    // Media Details
    const mediaIds = posts
      .map((post) => post.acf.audio?.id)
      .filter(Boolean) as number[];
    if (mediaIds.length) {
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
    }

    // Program Details
    const programIds = _.chain(posts)
      .flatMap((post) => post.programs)
      .filter(Boolean)
      .uniq()
      .value();
    if (programIds.length) {
      const { data: programs } = await programService.all({
        include: programIds.join(','),
        per_page: programIds.length,
      });

      posts.map((post) => {
        if (post.relation?.programs) {
          post.relation.programs = post.relation.programs.map((_program) => {
            const program = find(programs, ['id', _program.id]);
            return program || _program;
          });
        }

        if (post.relation?.program) {
          post.relation.program =
            find(programs, ['id', post.relation.program?.id]) ||
            post.relation.program;
        }
      });
    }

    return {
      ...response,
      data: posts,
    };
  }

  async find(
    id: number | string,
    query: IFetchQueryParams = {}
  ): Promise<WP_REST_API_ACF_Post> {
    const post = await super.find(id, query);

    // const mediaPromise = post.acf.audio?.id
    //   ? mediaService.find(post.acf.audio.id)
    //   : Promise.resolve(null);

    // const programIds = post.programs as number[];
    // const programPromise = programIds.length
    //   ? programService.all({
    //       include: programIds.join(','),
    //       per_page: programIds.length,
    //     })
    //   : Promise.resolve(null);

    // const [media, program] = await Promise.all([mediaPromise, programPromise]);

    // if (media && media.id) {
    //   set(post, 'acf.audio.media', media);
    // }

    // if (program && program.data.length) {
    //   set(post, '_embedded.wp:term[2]', program.data ?? []);
    // }

    if (post.acf.audio?.id) {
      const media = await mediaService.find(post.acf.audio.id);
      if (media.id) {
        post.acf.audio.media = media;
      }
    }

    const programIds = post.programs as number[];
    if (post.relation?.programs && programIds.length) {
      const { data: programs } = await programService.all({
        include: programIds.join(','),
        per_page: programIds.length,
      });

      post.relation.programs = post.relation.programs.map((_program) => {
        const program = find(programs, ['id', _program.id]);
        return program || _program;
      });
      post.relation.program =
        find(programs, ['id', post.relation.program?.id]) ||
        post.relation.program;
    }

    return post;
  }
}

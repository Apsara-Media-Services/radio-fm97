import app from '@/configs/app';
import BaseDto from '@/services/dto/BaseDto';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import { filter, first, includes } from 'lodash';

export default class PostDto extends BaseDto {
  static normalize(item: WP_REST_API_ACF_Post): WP_REST_API_ACF_Post;
  static normalize(item: WP_REST_API_ACF_Post[]): WP_REST_API_ACF_Post[];
  static normalize(
    item: WP_REST_API_ACF_Post | WP_REST_API_ACF_Post[]
  ): WP_REST_API_ACF_Post | WP_REST_API_ACF_Post[] {
    if (Array.isArray(item)) {
      return item.map((i) => this.normalize(i)) as WP_REST_API_ACF_Post[];
    }

    const post = super.normalize<WP_REST_API_ACF_Post>(item);

    const {
      'wp:featuredmedia': featuredmedia,
      author,
      'wp:term': terms,
    } = post._embedded || {};
    const [categories = [], tags = [], programs = []] = terms || [];

    post.relation = {
      author: first(author),
      featuredmedia: first(featuredmedia),
      categories,
      categories_actual: filter(
        categories,
        (category) =>
          !includes(
            [app.program.baseCategoryId, app.program.categoryId],
            category.id
          )
      ),
      tags,
      programs,
      programs_actual: filter(
        programs,
        (program) => !includes([app.program.programId], program.id)
      ),
      program: first(
        programs.filter((p) => !includes([app.program.programId], p.id))
      ),
    };

    return post;
  }
}

import app from '@/configs/app';
import BasePostService from '@/services/BasePostService';

export default class PostService extends BasePostService {
  constructor() {
    super({
      categories: app.program.baseCategoryId.toString(),
      categories_exclude: app.program.categoryId.toString(),
    });
  }
}

import app from '@/configs/app';
import BasePostService from '@/services/BasePostService';

export default class ProgramPostService extends BasePostService {
  constructor() {
    super({
      categories: app.program.categoryId.toString(),
    });
  }
}

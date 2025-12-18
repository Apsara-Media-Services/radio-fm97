import app from '@/configs/app';
import ApiBaseService from '@/services/ApiBaseService';
import { WP_REST_API_ACF_Program } from '@/types/wp';

export default class ProgramService extends ApiBaseService<WP_REST_API_ACF_Program> {
  constructor() {
    const resource = 'program';
    const query = {
      parent: app.program.programId,
      per_page: 100,
    };
    super(resource, query);
  }
}

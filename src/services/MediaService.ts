import ApiBaseService from '@/services/ApiBaseService';
import { WP_REST_API_Attachment } from 'wp-types';

export default class MediaService extends ApiBaseService<WP_REST_API_Attachment> {
  constructor() {
    const resource = 'media';
    super(resource);
  }
}

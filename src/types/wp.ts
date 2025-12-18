import {
  WP_REST_API_Attachment,
  WP_REST_API_Category,
  WP_REST_API_Post,
  WP_REST_API_Tag,
  WP_REST_API_Term,
  WP_REST_API_User,
} from 'wp-types';

export interface AcfFile {
  ID: number;
  id?: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link?: string;
  alt?: string;
  author?: string;
  description?: string;
  caption?: string;
  name?: string;
  status?: string;
  uploaded_to?: number;
  date?: string;
  modified?: string;
  menu_order?: number;
  mime_type: string;
  type: string; // audio, image, application
  subtype: string; // mpeg, jpeg, pdf
  icon?: string;
  media?: WP_REST_API_Attachment; // custom field to hold the full media object
}

export interface AcfImage extends AcfFile {
  width: number;
  height: number;
  sizes: Record<string, string | number>; // thumbnail, medium, large, etc.
}

export interface WP_REST_API_ACF_File extends AcfFile {}

export interface WP_REST_API_ACF_Image extends AcfImage {}

export interface WP_REST_API_ACF_Program extends WP_REST_API_Term {
  acf: {
    thumbnail?: WP_REST_API_ACF_Image;
    schedules?: {
      day: string;
      start_time: string;
      end_time: string;
    }[];
  };
}

export interface WP_REST_API_ACF_Post extends WP_REST_API_Post {
  _embedded?: {
    author: WP_REST_API_User[];
    'wp:featuredmedia'?: WP_REST_API_Attachment[];
    'wp:term'?: [
      WP_REST_API_Category[],
      WP_REST_API_Tag[],
      WP_REST_API_ACF_Program[],
    ];
    [k: string]: unknown;
  };
  acf: {
    audio?: WP_REST_API_ACF_File;
  };
  relation?: {
    author?: WP_REST_API_User;
    featuredmedia?: WP_REST_API_Attachment;
    categories?: WP_REST_API_Category[];
    categories_actual?: WP_REST_API_Category[];
    tags?: WP_REST_API_Tag[];
    programs?: WP_REST_API_ACF_Program[];
    programs_actual?: WP_REST_API_ACF_Program[];
    program?: WP_REST_API_ACF_Program;
  };
}

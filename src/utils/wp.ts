import app from '@/configs/app';
import { WP_REST_API_ACF_Image, WP_REST_API_ACF_Post } from '@/types/wp';
import { get } from 'lodash';
import { WP_REST_API_Attachment } from 'wp-types';

type Size =
  | 'thumbnail'
  | 'medium'
  | 'large'
  | 'medium_large'
  | '1536x1536'
  | '2048x2048'
  | 'post-thumbnail';

export function getAcfMediaUrl(
  media?: WP_REST_API_ACF_Image,
  size?: Size,
  fallback?: string
): string {
  let url = fallback ?? app.logo;
  size = size ?? 'medium';

  if (media) {
    url = get(media.sizes, size, media.url) as string;
  }

  return url;
}

export function getMediaUrl(
  media?: WP_REST_API_Attachment,
  size?: Size,
  fallback?: string
): string {
  let url = fallback ?? app.logo;
  size = size ?? 'medium';

  if (media) {
    url = get(
      media.media_details?.sizes,
      `${size}.source_url`,
      media.source_url
    );
  }

  return url;
}

export function getPostAudio(post: WP_REST_API_ACF_Post) {
  const { url, media } = post.acf.audio || {};

  return {
    url,
    duration: get(media?.media_details, 'length', 0) as number,
  };
}

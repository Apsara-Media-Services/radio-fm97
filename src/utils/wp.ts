import app from '@/configs/app';
import { WP_REST_API_ACF_Image, WP_REST_API_ACF_Post } from '@/types/wp';
import { get } from 'lodash';
import { WP_REST_API_Attachment } from 'wp-types';

type Size =
  | 'original'
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
    if (size === 'original') {
      url = media.source_url;
    } else {
      url = get(
        media.media_details?.sizes,
        `${size}.source_url`,
        media.source_url
      );
    }
  }

  return url;
}

export function getPostFeaturedMediaUrl(
  post: WP_REST_API_ACF_Post,
  size?: Size,
  fallback?: string
) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];

  return getMediaUrl(media, size, fallback);
}

export function getPostAudio(post: WP_REST_API_ACF_Post) {
  const { url, media } = post?.acf?.audio || {};

  return {
    url,
    duration: get(media?.media_details, 'length', 0) as number,
  };
}

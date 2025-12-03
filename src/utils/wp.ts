import app from '@/configs/app';
import { MediaItem } from '@/gql/graphql';
import { find } from 'lodash';

type Size =
  | 'thumbnail'
  | 'medium'
  | 'large'
  | 'medium_large'
  | '1536x1536'
  | '2048x2048'
  | 'post-thumbnail';

export function getMediaUrl(
  media?: MediaItem,
  size?: Size,
  fallback?: string
): string {
  let url = fallback ?? app.logo;
  size = size ?? 'medium';

  if (media) {
    url = media.sourceUrl as string;
    const imageSource = find(media.mediaDetails?.sizes, ['name', size]);
    if (imageSource && imageSource.sourceUrl) {
      url = imageSource.sourceUrl;
    }
  }

  return url;
}

import app from '@/configs/app';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: app.name,
    short_name: app.tag,
    description: app.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: app.icons.icon,
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: app.icons.icon192x192,
        sizes: '192x192',
        type: 'image/x-icon',
      },
      {
        src: app.icons.icon512x512,
        sizes: '512x512',
        type: 'image/x-icon',
      },
    ],
  };
}

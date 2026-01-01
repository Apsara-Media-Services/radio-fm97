import { Metadata } from 'next';

import fm97 from './fm97.js';
import fm99 from './fm99.js';

const _app = {
  fm97: fm97,
  fm99: fm99,
};
const app =
  _app[(process.env.NEXT_PUBLIC_APP_TAG as keyof typeof _app) ?? 'fm97'];
const URL = process.env.NEXT_PUBLIC_APP_URL || app.url;

const logo = URL + app.logo;
const icons = {
  icon: URL + app.icons.icon,
  apple: URL + app.icons.apple,
  shortcut: URL + app.icons.shortcut,
  icon192x192: URL + app.icons.icon192x192,
  icon512x512: URL + app.icons.icon512x512,
};

export default {
  ...app,
  logo,
  liveUrl: process.env.NEXT_PUBLIC_APP_LIVE_URL || '',
  url: process.env.NEXT_PUBLIC_APP_URL || app.url,
  icons,
  metadata: {
    title: `${app.name} | ${app.name_en}`,
    description: app.description,
    category: 'Radio',
    keywords: [
      'radio',
      'news',
      'music',
      'live',
      'entertainment',
      'education',
      'Apsara Radio',
      'AMS',
      app.name,
      app.name_en,
      app.tag,
    ],
    applicationName: app.name_en,
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    icons: {
      icon: icons.icon,
      apple: icons.apple,
      shortcut: icons.shortcut,
      other: [
        {
          url: icons.icon192x192,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: icons.icon512x512,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    openGraph: {
      title: `${app.name} | ${app.name_en}`,
      description: app.description,
      url: app.url,
      siteName: app.name_en,
      images: [
        {
          url: logo,
          alt: `${app.name} | ${app.name_en}`,
        },
      ],
      locale: 'km_KH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.name} | ${app.name_en}`,
      description: app.description,
      images: [logo],
    },
    alternates: {
      canonical: URL,
    },
  } as Metadata,
};

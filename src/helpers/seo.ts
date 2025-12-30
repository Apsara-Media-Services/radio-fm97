import app from '@/configs/app';
import {
  WP_REST_API_ACF_Post,
  WP_REST_API_ACF_Program,
  WP_REST_API_YoastSEO,
} from '@/types/wp';
import { getAcfMediaUrl } from '@/utils/wp';
import { Metadata } from 'next';
import sanitizeHtml from 'sanitize-html';

export function getDefaultMetadata() {
  return {
    ...app.metadata,
  } as Metadata;
}

export function getLivePageMetadata() {
  return {
    ...app.metadata,
    title: `ផ្សាយផ្ទាល់ | ${app.name_en}`,
    description: `ស្ដាប់ ${app.name} ពេញមួយថ្ងៃ ជាមួយបទចម្រៀង និងកម្មវិធីផ្សាយផ្សេងៗជាច្រើន។`,
    openGraph: {
      ...app.metadata.openGraph,
      title: `ផ្សាយផ្ទាល់ | ${app.name_en}`,
      description: `ស្ដាប់ ${app.name} ពេញមួយថ្ងៃ ជាមួយបទចម្រៀង និងកម្មវិធីផ្សាយផ្សេងៗជាច្រើន។`,
      audio: {
        url: app.liveUrl,
        secureUrl: app.liveUrl,
      },
    },
    twitter: {
      ...app.metadata.twitter,
      title: `ផ្សាយផ្ទាល់ | ${app.name_en}`,
      description: `ស្ដាប់ ${app.name} ពេញមួយថ្ងៃ ជាមួយបទចម្រៀង និងកម្មវិធីផ្សាយផ្សេងៗជាច្រើន។`,
    },
    alternates: {
      canonical: `${app.url}/live`,
    },
  } as Metadata;
}

export function getProgramListPageMetadata() {
  return {
    ...app.metadata,
    title: `កម្មវិធីផ្សាយ | ${app.name_en}`,
    description: `កម្មវិធីផ្សាយរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    openGraph: {
      ...app.metadata.openGraph,
      title: `កម្មវិធីផ្សាយ | ${app.name_en}`,
      description: `កម្មវិធីផ្សាយរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    },
    twitter: {
      ...app.metadata.twitter,
      title: `កម្មវិធីផ្សាយ | ${app.name_en}`,
      description: `កម្មវិធីផ្សាយរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    },
    alternates: {
      canonical: `${app.url}/audio`,
    },
  } as Metadata;
}

export function getProgramPageMetadata(program: WP_REST_API_ACF_Program) {
  const title = `${program.name} | ${app.name_en}`;
  const description = sanitizeHtml(program.description, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const imgUrl = getAcfMediaUrl(program.acf.thumbnail);

  return {
    ...app.metadata,
    title,
    description: description,
    openGraph: {
      ...app.metadata.openGraph,
      title,
      description: description,
      url: `${app.url}/audio/${program.slug}`,
      images: [
        {
          url: imgUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      ...app.metadata.twitter,
      title,
      description: description,
      images: [imgUrl],
    },
    alternates: {
      canonical: `${app.url}/audio/${program.slug}`,
    },
  } as Metadata;;
}

export function getProgramPostPageMetadata(post: WP_REST_API_ACF_Post) {
  const yoast = post.yoast_head_json || ({} as WP_REST_API_YoastSEO);

  return {
    ...app.metadata,
    title: yoast.title,
    description: yoast.description,
    openGraph: {
      ...app.metadata.openGraph,
      title: yoast.og_title,
      description: yoast.og_description,
      images: yoast.og_image?.map((img: any) => ({
        url: img.url,
      })),
      type: yoast.og_type as any,
      url: `${app.url}/audio/detail/${post.id}`,
    },
    twitter: {
      ...app.metadata.twitter,
      title: yoast.title,
      description: yoast.description,
      images: yoast.og_image?.map((img: any) => img.url),
    },
    authors: [{ name: yoast.author }],
    alternates: {
      canonical: `${app.url}/audio/detail/${post.id}`,
    },
    robots: yoast.robots as any,
  } as Metadata;;
}

export function getNewsListPageMetadata() {
  return {
    ...app.metadata,
    title: `ព័ត៌មានថ្មីៗ | ${app.name_en}`,
    description: `ព័ត៌មានថ្មីៗរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    openGraph: {
      ...app.metadata.openGraph,
      title: `ព័ត៌មានថ្មីៗ | ${app.name_en}`,
      description: `ព័ត៌មានថ្មីៗរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    },
    twitter: {
      ...app.metadata.twitter,
      title: `ព័ត៌មានថ្មីៗ | ${app.name_en}`,
      description: `ព័ត៌មានថ្មីៗរបស់ ${app.name} | ព័ត៌មាន អប់រំ កម្សាន្ត និងចំណេះដឹង`,
    },
    alternates: {
      canonical: `${app.url}/news`,
    },
  } as Metadata;;
}

export function getNewsPostPageMetadata(post: WP_REST_API_ACF_Post) {
  const yoast = post.yoast_head_json || ({} as WP_REST_API_YoastSEO);

  return {
    ...app.metadata,
    title: yoast.title,
    description: yoast.description,
    openGraph: {
      ...app.metadata.openGraph,
      title: yoast.og_title,
      description: yoast.og_description,
      images: yoast.og_image?.map((img: any) => ({
        url: img.url,
      })),
      type: yoast.og_type as any,
      url: `${app.url}/news/detail/${post.id}`,
    },
    twitter: {
      ...app.metadata.twitter,
      title: yoast.title,
      description: yoast.description,
      images: yoast.og_image?.map((img: any) => img.url),
    },
    authors: [{ name: yoast.author }],
    alternates: {
      canonical: `${app.url}/news/detail/${post.id}`,
    },
    robots: yoast.robots as any,
  } as Metadata;
}

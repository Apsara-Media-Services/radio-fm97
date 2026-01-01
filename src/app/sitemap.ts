import app from '@/configs/app';
import ProgramService from '@/services/ProgramService';
import type { MetadataRoute } from 'next';

const programService = new ProgramService();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await programService.all({
    next: { revalidate: 3600 },
  });

  return [
    {
      url: app.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${app.url}/audio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${app.url}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...programs.data.map(
      (item) =>
        ({
          url: `${app.url}/audio/${item.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }) as any
    ),
  ];
}

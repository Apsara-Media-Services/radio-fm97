import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import sanitizeHtml from 'sanitize-html';

export function getLivePageBreadcrumb() {
  return [{ name: 'ទំព័រ​ដើម', href: '/' }, { name: 'ផ្សាយផ្ទាល់' }];
}

export function getProgramListPageBreadcrumb() {
  return [{ name: 'ទំព័រ​ដើម', href: '/' }, { name: 'កម្មវិធីផ្សាយ' }];
}

export function getProgramPageBreadcrumb(program: WP_REST_API_ACF_Program) {
  return [
    { name: 'ទំព័រ​ដើម', href: '/' },
    { name: 'កម្មវិធីផ្សាយ', href: '/audio' },
    { name: program.name },
  ];
}

export function getProgramPostPageBreadcrumb(post: WP_REST_API_ACF_Post) {
  return [
    { name: 'ទំព័រ​ដើម', href: '/' },
    { name: 'កម្មវិធីផ្សាយ', href: '/audio' },
    {
      name: post.relation?.program?.name || '',
      href: `/audio/${post.relation?.program?.slug}`,
    },
    { name: sanitizeHtml(post.title.rendered) },
  ];
}

export function getNewsListPageBreadcrumb() {
  return [{ name: 'ទំព័រ​ដើម', href: '/' }, { name: 'ព័ត៌មានថ្មីៗ' }];
}

export function getNewsPostPageBreadcrumb(post: WP_REST_API_ACF_Post) {
  return [
    { name: 'ទំព័រ​ដើម', href: '/' },
    { name: 'ព័ត៌មានថ្មីៗ', href: '/news' },
    { name: sanitizeHtml(post.title.rendered) },
  ];
}

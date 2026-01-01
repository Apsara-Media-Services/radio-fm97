import app from '@/configs/app';
import { WP_REST_API_ACF_Post } from '@/types/wp';
import { getMediaUrl } from '@/utils/wp';
import { ArticleJsonLd, BreadcrumbJsonLd, OrganizationJsonLd } from 'next-seo';
import sanitizeHtml from 'sanitize-html';

interface IProps {
  breadcrumbs?: {
    name: string;
    href?: string;
  }[];
  post?: WP_REST_API_ACF_Post;
}

const JsonLD = ({ breadcrumbs, post }: IProps) => {
  const breadcrumbItems = breadcrumbs?.map(({ name, href }) => {
    if (href) {
      return {
        name,
        item: `${app.url}${href}`,
      };
    }
    return {
      name: name,
    };
  });
  return (
    <>
      <OrganizationJsonLd
        name={app.name}
        alternateName={app.name_en}
        url={app.url}
        logo={app.logo}
        image={app.logo}
        description={app.description}
        sameAs={app.socials.map((social) => social.href)}
      />
      {breadcrumbItems && <BreadcrumbJsonLd items={breadcrumbItems} />}
      {post && (
        <ArticleJsonLd
          headline={sanitizeHtml(post?.title?.rendered as string, {
            allowedTags: [],
          })}
          datePublished={post.date}
          author={post.relation?.author?.name}
          image={getMediaUrl(post.relation?.featuredmedia)}
          description={sanitizeHtml(post.excerpt.rendered as string, {
            allowedTags: [],
          })}
        />
      )}
    </>
  );
};

export default JsonLD;

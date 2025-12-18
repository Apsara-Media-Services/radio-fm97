import { Category, User } from '@/gql/graphql';
import { IComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post } from '@/types/wp';

export interface IPostConfig {
  showImage?: boolean;
  showTitle?: boolean;
  showExcerpt?: boolean;
  showMeta?: boolean;
  showAuthor?: boolean;
  showAuthorAvatar?: boolean;
  showAuthorName?: boolean;
  showDate?: boolean;
  showLineSeparator?: boolean;
  showCategoryTag?: boolean;
  showCategoryTagMultiple?: boolean;
  linkable?: boolean;
  line?: number | string;
}

export interface IPostComponentProps extends IComponentProps {
  config?: IPostConfig;
  post: WP_REST_API_ACF_Post;
}

export interface IPostAuthorComponentProps extends IPostComponentProps {
  user: User;
}

export interface IPostCategoryTagComponentProps extends IPostComponentProps {
  categories: Category[];
}

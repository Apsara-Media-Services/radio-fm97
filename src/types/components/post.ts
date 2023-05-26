import { Category, Post, User } from '@/gql/graphql';
import { IComponentProps } from '@/types/component';

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
  post?: Post;
}

export interface IPostAuthorComponentProps extends IPostComponentProps {
  user: User;
}

export interface IPostCategoryTagComponentProps extends IPostComponentProps {
  categories: Category[];
}

import { IComponentProps } from '@/types/component';
import { Category, Post, User } from '@/gql/graphql';

export interface IPostConfig {
  showImage?: Boolean;
  showTitle?: Boolean;
  showExcerpt?: Boolean;
  showMeta?: Boolean;
  showAuthor?: Boolean;
  showAuthorAvatar?: Boolean;
  showAuthorName?: Boolean;
  showDate?: Boolean;
  showLineSeparator?: Boolean;
  showCategoryTag?: Boolean;
  showCategoryTagMultiple?: Boolean;
  linkable?: Boolean;
  line?: number | string;
  imageQuality?: number | string;
  imageSize?: string;
  imageIsVideo?: Boolean;
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

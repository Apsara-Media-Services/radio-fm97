import { Post, User } from '@/gql/graphql';
import { IScheduleProgram } from '@/types/entity';
import {
  IFetchQueryParams,
  IPaginatedResponse,
  IPaginator,
} from '@/types/fetch';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { ImageProps } from 'next/image';

import { IObject } from './app';

export interface IComponentProps {
  children?: React.ReactNode | undefined;
  classes?: IObject;
  className?: string;
  config?: IObject;
  title?: string;
  [key: string]: any;
}

export interface IPaginationComponentProps<T> extends IComponentProps {
  items: T[];
  paginator: IPaginator;
  query?: Omit<IFetchQueryParams, 'page' | 'per_page'>;
  pageable?: boolean;
}
export interface ILineClampComponentProps extends IComponentProps {
  content: string | undefined;
  line?: number | string;
}

export interface INoSSRComponentProps extends IComponentProps {
  defer?: boolean;
  fallback?: any | null;
}

export interface IFallbackImageComponentProps extends ImageProps {
  fallbackSrc?: string;
  objectFit?: string;
}

export interface ISectionHeaderComponentProps extends IComponentProps {
  type: string;
  line?: number;
  title?: string;
  link?: string;
  lineColor?: string;
  lineHighlightColor?: string;
}

export interface IPostSectionComponentProps extends IComponentProps {
  title?: string;
  link?: string;
  posts?: WP_REST_API_ACF_Post[];
}

export interface ILineSeparatorComponentProps extends IComponentProps {
  weight?: string;
  color?: string;
}

export interface IAuthorCardComponentProps extends IComponentProps {
  user: User;
}

export interface IRadioLiveComponentProps extends IComponentProps {
  activeProgram?: IScheduleProgram;
  nextProgram?: IScheduleProgram;
  nextTomorrowProgram?: IScheduleProgram;
}

export interface IRadioProgramComponentProps extends IComponentProps {
  programs?: IScheduleProgram[];
}

export interface IPodcastProgramListComponentProps extends IComponentProps {
  programs: WP_REST_API_ACF_Program[];
}

export interface IPodcastProgramDetailComponentProps extends IComponentProps {
  program: WP_REST_API_ACF_Program;
  posts: IPaginatedResponse<WP_REST_API_ACF_Post>;
}

export interface INewsPostListComponentProps extends IComponentProps {
  posts: WP_REST_API_ACF_Post[];
}

export interface INewsPostCardComponentProps extends IComponentProps {
  post: WP_REST_API_ACF_Post;
}

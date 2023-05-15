import { IObject } from './app';
import { Post } from '@/gql/graphql';
import { ImageProps } from 'next/image';

export interface IComponentProps {
  children?: React.ReactNode | undefined;
  classes?: IObject;
  className?: string;
  config?: IObject;
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
  posts?: Post[];
}

export interface ILineSeparatorComponentProps extends IComponentProps {
  weight?: string;
  color?: string;
}

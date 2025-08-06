import { IComponentProps } from '@/types/component';

export interface IRadioPageProps extends IComponentProps {
  programs?: string;
}

export interface IDynamicPage {
  params: Promise<{
    slug?: string | string[];
    [key: string]: any;
  }>;
}

import { IObject } from '@/types/app';

export interface IFetchBody {
  query?: string;
  variables?: IObject;
}

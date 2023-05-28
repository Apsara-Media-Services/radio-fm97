import { IObject } from '@/types/app';

export interface IFetchBody {
  query?: string;
  variables?: {
    first?: number;
    after?: string;
    relationshipFirst?: number;
    relationshipAfter?: string;
    where?: IObject;
    [key: string]: any;
  };
  next?: {
    revalidate: string | number;
  };
  [key: string]: any;
}

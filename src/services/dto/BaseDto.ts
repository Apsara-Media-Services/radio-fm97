import { keys } from 'lodash';

export interface DtoClass<T> {
  normalize(item: T): T;
  normalize(item: T[]): T[];
}

export default class BaseDto {
  static normalize<T>(item: T): T;
  static normalize<T>(item: T[]): T[];
  static normalize<T>(item: T | T[]): T | T[] {
    if (Array.isArray(item)) {
      return item.map((i) => BaseDto.normalize(i)) as T[];
    }

    const cloned: any = { ...item };

    // Handle ACF fields from false to undefined
    keys(cloned).forEach((key) => {
      if (key === 'acf') {
        keys(cloned.acf).forEach((acfKey) => {
          if (cloned.acf[acfKey] === false) {
            cloned.acf[acfKey] = undefined;
          }
        });
      }
    });

    return cloned as T;
  }
}

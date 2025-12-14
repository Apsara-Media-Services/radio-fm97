import { Hls } from 'hls.js';
import { ValueOf } from 'type-fest';

export {};

declare global {
  interface Window {
    hls: Hls;
  }

  type Paginator = ValueOf<typeof IPaginator>;
}

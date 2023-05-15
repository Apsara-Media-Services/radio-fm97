import { Hls } from 'hls.js';

export {};

declare global {
  interface Window {
    hls: Hls;
  }
}

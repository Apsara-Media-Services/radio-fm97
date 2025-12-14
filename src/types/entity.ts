import { WP_REST_API_ACF_Program } from '@/types/wp';

export interface IProgramThumbnail {
  id?: string | number;
  name?: string;
  url?: string;
}

export interface IProgram {
  id?: string | number;
  title?: string;
  description?: string;
  thumbnail?: IProgramThumbnail;
}

export interface ISchedule {
  id?: string | number;
  startTime?: string;
  endTime?: string;
  program?: IProgram;
}

export interface IScheduleProgram extends WP_REST_API_ACF_Program {
  thumbnail?: WP_REST_API_ACF_Program['acf']['thumbnail'];
  dayOfWeek: string;
  startAt: Date | string;
  endAt: Date | string;
  isLive: boolean;
  isNext: boolean;
  isPlayed: boolean;
}

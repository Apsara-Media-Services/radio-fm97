import { MediaItem, Program, Radio, RadioSchedules } from '@/gql/graphql';

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

export interface IScheduleProgram extends Program {
  thumbnail?: MediaItem;
  dayOfWeek: string;
  startAt: Date | string;
  endAt: Date | string;
  isLive: boolean;
  isNext: boolean;
  isPlayed: boolean;
}

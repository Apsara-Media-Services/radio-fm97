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

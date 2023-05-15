export interface IObject {
  [key: string]: any;
}

export type AppContextType = {
  [key: string]: any;
};

export type ScreenBreakpointType = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
  xsOnly: boolean;
  smOnly: boolean;
  smAndDown: boolean;
  smAndUp: boolean;
  mdOnly: boolean;
  mdAndDown: boolean;
  mdAndUp: boolean;
  lgOnly: boolean;
  lgAndDown: boolean;
  lgAndUp: boolean;
  xlOnly: boolean;
  xlAndDown: boolean;
  xlAndUp: boolean;
  '2xlOnly': boolean;
  name: string | null | undefined;
  width: number;
};

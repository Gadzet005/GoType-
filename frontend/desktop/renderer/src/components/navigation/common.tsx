export const DEFAULT_PATH = "";

export type ComponentGetter = (...params: any[]) => React.ReactNode;

export interface RouteList {
  get(path: string): ComponentGetter | undefined;
}

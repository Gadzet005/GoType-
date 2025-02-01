import React from "react";
import { DEFAULT_PATH } from "./common";

interface NavigationContextData {
  navigate: (path: string, ...params: any[]) => void;
  path: string;
  params: any[];
}

export const NavigationContext = React.createContext<NavigationContextData>({
  navigate: () => {},
  path: DEFAULT_PATH,
  params: [],
});

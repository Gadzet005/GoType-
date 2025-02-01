import React from "react";
import { DEFAULT_PATH } from "./common";
import { RouteList } from "./common";
import { NavigationContext } from "./context";

interface AppNavigationProps {
  routes: RouteList;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({ routes }) => {
  const [path, setPath] = React.useState<string>(DEFAULT_PATH);
  const [params, setParams] = React.useState<any[]>([]);

  const navigate = (path: string, ...params: any[]) => {
    const pageGetter = routes.get(path);
    if (pageGetter) {
      setPath(path);
      setParams(params);
    } else {
      setPath(DEFAULT_PATH);
      setParams([]);
    }
  };

  const componentGetter =
    routes.get(path) || routes.get(DEFAULT_PATH) || ((..._: any[]) => null);

  const page = componentGetter(...params);

  return (
    <NavigationContext.Provider value={{ navigate, path, params }}>
      {page}
    </NavigationContext.Provider>
  );
};

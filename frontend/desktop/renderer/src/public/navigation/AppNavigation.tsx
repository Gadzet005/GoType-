import React from "react";
import { RoutePath } from "./routePath";
import { routes } from "./routes";

interface NavigationContextData {
  navigate: (path: string, ...params: any[]) => void;
  path: string;
  params: any[];
}

export const NavigationContext = React.createContext<NavigationContextData>({
  navigate: () => {},
  path: RoutePath.default,
  params: [],
});

export const AppNavigation: React.FC = () => {
  const [path, setPath] = React.useState<string>(RoutePath.default);
  const [params, setParams] = React.useState<any[]>([]);

  const navigate = (path: string, ...params: any[]) => {
    const pageGetter = routes.get(path);
    if (pageGetter) {
      setPath(path);
      setParams(params);
    } else {
      setPath(RoutePath.default);
      setParams([]);
    }
  };

  const componentFactory =
    routes.get(path) ||
    routes.get(RoutePath.default) ||
    ((..._: any[]) => null);

  const page = componentFactory(...params);

  return (
    <NavigationContext.Provider value={{ navigate, path, params }}>
      {page}
    </NavigationContext.Provider>
  );
};

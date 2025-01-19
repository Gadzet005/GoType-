import React from "react";
import { RoutePath } from "./routePath";
import { routes } from "./routes";

interface NavigationContextData {
  navigate: (path: string, ...params: any[]) => void;
}

export const NavigationContext = React.createContext<NavigationContextData>({
  navigate: () => {},
});

export const AppNavigation: React.FC = () => {
  const [page, setPage] = React.useState<React.ReactNode>(null);

  const navigate = (path: string, ...params: any[]) => {
    const pageGetter = routes.get(path);
    if (pageGetter) {
      setPage(pageGetter(...params));
    } else {
      navigate(RoutePath.default);
    }
  };

  React.useEffect(() => {
    navigate(RoutePath.default);
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate }}>
      {page}
    </NavigationContext.Provider>
  );
};

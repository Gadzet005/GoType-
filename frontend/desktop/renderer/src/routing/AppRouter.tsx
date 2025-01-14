import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "../public/user";
import { RoutePath } from "./routePath";
import { routes } from "./routes";

export const AppRouter = observer(() => {
  const user = useUser();

  const authRoutes = routes
    .filter((route) => route.private)
    .map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.component} />
      );
    });

  const publicRoutes = routes
    .filter((route) => !route.private)
    .map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.component} />
      );
    });

  return (
    <Routes>
      {user.isAuth && authRoutes}
      {publicRoutes}
      <Route path="*" element={<Navigate to={RoutePath.home} />} />
    </Routes>
  );
});

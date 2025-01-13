import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { useUser } from "../public/user";
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
    </Routes>
  );
});

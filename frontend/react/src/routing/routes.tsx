import { RoutePath } from "./routePath";
import React from "react";
import { HomePage } from "../components/pages/HomePage";
import { SignInPage } from "../components/pages/SignInPage";
import { SignUpPage } from "../components/pages/SignUpPage";
import { ProfilePage } from "../components/pages/ProfilePage";

export interface Route {
  path: RoutePath;
  component: React.ReactNode;
  title?: string;
  private?: boolean;
}

export const routes: Route[] = [
  {
    path: RoutePath.home,
    component: <HomePage />,
    title: "Домашняя страница",
  },
  {
    path: RoutePath.signIn,
    component: <SignInPage />,
    title: "Вход",
  },
  {
    path: RoutePath.signUp,
    component: <SignUpPage />,
    title: "Регистрация",
  },
  {
    path: RoutePath.profile,
    component: <ProfilePage />,
    title: "Профиль",
    private: true,
  },
];

import { RoutePath } from "./routePath";
import React from "react";
import { HomePage } from "../components/pages/HomePage";
import { SignInPage } from "../components/pages/SignInPage";
import { SignUpPage } from "../components/pages/SignUpPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { GamePage } from "../components/pages/GamePage";
import { LevelListPage } from "../components/pages/LevelListPage";
import { LevelEditorPage } from "../components/pages/LevelEditorPage";

export interface Route {
  path: string;
  component: React.ReactNode;
  private?: boolean;
}

export const routes: Route[] = [
  {
    path: RoutePath.home,
    component: <HomePage />,
  },
  {
    path: "*",
    component: <HomePage />,
  },
  {
    path: RoutePath.signIn,
    component: <SignInPage />,
  },
  {
    path: RoutePath.signUp,
    component: <SignUpPage />,
  },
  {
    path: RoutePath.profile,
    component: <ProfilePage />,
    private: true,
  },
  {
    path: RoutePath.levelList,
    component: <LevelListPage />,
    private: true,
  },
  {
    path: RoutePath.game + "/:levelId",
    component: <GamePage />,
    private: true,
  },
  {
    path: RoutePath.editor,
    component: <LevelEditorPage />,
    private: true,
  },
];

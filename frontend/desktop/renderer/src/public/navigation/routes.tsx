import { GamePage } from "@/components/pages/GamePage";
import { GameResultsPage } from "@/components/pages/GameResultsPage";
import { HomePage } from "@/components/pages/HomePage";
import { LevelEditorPage } from "@/components/pages/LevelEditorPage";
import { LevelListPage } from "@/components/pages/LevelListPage";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { SignInPage } from "@/components/pages/SignInPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { Level } from "@desktop-common/level";
import React from "react";
import { RoutePath } from "./routePath";

type ComponentGetter = (...params: any[]) => React.ReactNode;

export const routes = new Map<string, ComponentGetter>([
  [RoutePath.default, () => <HomePage />],
  [RoutePath.home, () => <HomePage />],
  [RoutePath.signIn, () => <SignInPage />],
  [RoutePath.signUp, () => <SignUpPage />],
  [RoutePath.profile, () => <ProfilePage />],
  [RoutePath.levelList, () => <LevelListPage />],
  [RoutePath.game, (level: Level) => <GamePage level={level} />],
  [RoutePath.gameResults, (level: Level) => <GameResultsPage level={level} />],
  [RoutePath.editor, () => <LevelEditorPage />],
]);

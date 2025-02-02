import { GamePage } from "@/components/pages/GamePage";
import { GameStatisticsPage } from "@/components/pages/GameStatisticsPage";
import { HomePage } from "@/components/pages/HomePage";
import { LevelEditorPage } from "@/components/pages/LevelEditorPage";
import { LevelListPage } from "@/components/pages/LevelListPage";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { SignInPage } from "@/components/pages/SignInPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { RoutePath } from "./path";
import React from "react";

export const routes = new Map<string, React.ElementType>([
    [RoutePath.default, HomePage],
    [RoutePath.home, HomePage],
    [RoutePath.signIn, SignInPage],
    [RoutePath.signUp, SignUpPage],
    [RoutePath.profile, ProfilePage],
    [RoutePath.levelList, LevelListPage],
    [RoutePath.game, GamePage],
    [RoutePath.gameStatistics, GameStatisticsPage],
    [RoutePath.editor, LevelEditorPage],
]);

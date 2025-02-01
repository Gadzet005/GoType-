import { RouteList, ComponentGetter } from "@/components/navigation/common";
import { GamePage } from "@/components/pages/GamePage";
import { GameStatisticsPage } from "@/components/pages/GameStatisticsPage";
import { HomePage } from "@/components/pages/HomePage";
import { LevelEditorPage } from "@/components/pages/LevelEditorPage";
import { LevelListPage } from "@/components/pages/LevelListPage";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { SignInPage } from "@/components/pages/SignInPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { Level } from "@desktop-common/level";
import { GameStatistics } from "../public/game/statistics";
import { RoutePath } from "./routePath";

export const routes: RouteList = new Map<string, ComponentGetter>([
  [RoutePath.default, () => <HomePage />],
  [RoutePath.home, () => <HomePage />],
  [RoutePath.signIn, () => <SignInPage />],
  [RoutePath.signUp, () => <SignUpPage />],
  [RoutePath.profile, () => <ProfilePage />],
  [RoutePath.levelList, () => <LevelListPage />],
  [RoutePath.game, (level: Level) => <GamePage level={level} />],
  [
    RoutePath.gameStatistics,
    (level: Level, statistics: GameStatistics) => (
      <GameStatisticsPage level={level} statistics={statistics} />
    ),
  ],
  [RoutePath.editor, () => <LevelEditorPage />],
]);

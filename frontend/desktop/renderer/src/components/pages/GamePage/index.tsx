import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { BackButton } from "../../common/BackButton";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { GameField } from "./GameField";
import { Level } from "@desktop-common/level";
import { useNavigate } from "@/hooks/navigation";
import { when } from "mobx";

interface GamePageProps {
  level: Level;
}

export const GamePage: React.FC<GamePageProps> = observer(({ level }) => {
  useTitle("Игра");

  const OUTRO_DELAY = 1000;
  const navigate = useNavigate();
  const [game, setGame] = React.useState<Game | null>(null);

  React.useEffect(() => {
    const game = new Game(level);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length != 1) {
        return;
      }
      game.onInput(event.key);
    };
    document.addEventListener("keydown", handleKeyDown);

    setGame(game);
    game.run();

    let exitTimer: NodeJS.Timeout;
    when(
      () => game.progress === 100,
      () => {
        game.state.activeWords.clearWords();
        exitTimer = setTimeout(() => {
          navigate(RoutePath.gameStatistics, level, game.statistics);
        }, OUTRO_DELAY);
      }
    );

    return () => {
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
      game.pause();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!game) {
    return null;
  }

  return (
    <Stack sx={{ display: "flex", height: "100%", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          pb: 2,
        }}
      >
        <Box sx={{ width: "25%" }}>
          <BackButton href={RoutePath.levelList} />
        </Box>
        <Box sx={{ width: "50%" }}>
          <LinearProgress
            sx={{
              height: 15,
              borderRadius: 10,
              bgcolor: "lightgrey",
            }}
            color="primary"
            variant="determinate"
            value={game.progress}
          />
        </Box>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Typography variant="h3">
            {String(game.statistics.score).padStart(7, "0")}
          </Typography>
        </Box>
      </Box>
      <GameField width={"100%"} height={"100%"} game={game} />
    </Stack>
  );
});

import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { GameField } from "./GameField";
import { Level } from "@desktop-common/level";
import { useNavigate } from "@/hooks/navigation";
import { when } from "mobx";
import { Button } from "@/components/common/Button";
import PauseMenu from "./PauseMenu";
import { useKeyboard } from "@/hooks/keyboard";

import "./index.css";

interface GamePageProps {
  level: Level;
}

export const GamePage: React.FC<GamePageProps> = observer(({ level }) => {
  useTitle("Игра");

  const navigate = useNavigate();
  const [game] = React.useState<Game>(new Game(level));

  const handleKeyDown = (event: KeyboardEvent) => {
    if (game.isRunning) {
      game.onInput(event.key);
    }
  };

  const handleResume = () => {
    game.start();
  };

  const handlePause = () => {
    game.pause();
  };

  const handleRestart = () => {
    game.init();
    game.start();
  };

  const handleTogglePause = () => {
    if (game.isPaused) {
      handleResume();
    } else {
      handlePause();
    }
  };

  useKeyboard("Escape", handleTogglePause);
  useKeyboard(null, handleKeyDown);

  React.useEffect(() => {
    game.init();
    game.start();
    return () => {
      game.pause();
    };
  }, []);

  React.useEffect(() => {
    when(
      () => game.isFinished,
      () => {
        navigate(RoutePath.gameStatistics, level, game.statistics);
      }
    );
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${level.game.background.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          height: "100%",
          p: 2,
        }}
      >
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
              <Button
                sx={{
                  bgcolor: "lightgrey",
                  color: "black",
                }}
                variant="contained"
                onClick={handlePause}
              >
                <MenuIcon />
              </Button>
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
              <Box sx={{ bgcolor: "lightgrey", p: 1, borderRadius: 4 }}>
                <Typography variant="h3">
                  {String(game.statistics.score).padStart(7, "0")}
                </Typography>
              </Box>
            </Box>
          </Box>
          <GameField width={"100%"} height={"100%"} game={game} />
        </Stack>
        <PauseMenu
          open={game.isPaused}
          onClose={handleResume}
          onContinue={handleResume}
          onRestart={handleRestart}
          onExit={() => navigate(RoutePath.levelList)}
        />
      </Box>
    </Box>
  );
});

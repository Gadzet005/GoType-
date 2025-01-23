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

const OUTRO_DELAY = 1000;

interface GamePageProps {
  level: Level;
}

export const GamePage: React.FC<GamePageProps> = observer(({ level }) => {
  useTitle("Игра");

  const navigate = useNavigate();
  const [game] = React.useState<Game>(new Game(level));
  const [isPaused, setIsPaused] = React.useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    // ignore input if it's special keys or game paused
    if (event.key.length != 1 || !game.isRunning) {
      return;
    }
    game.onInput(event.key);
  };

  const handleResume = () => {
    setIsPaused(false);
    game.start();
  };

  const handlePause = () => {
    setIsPaused(true);
    game.pause();
  };

  const handleRestart = () => {
    setIsPaused(false);
    game.init();
    game.start();
  };

  const handleTogglePause = () => {
    if (isPaused) {
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
    let exitTimer: NodeJS.Timeout;
    when(
      () => game.progress === 100,
      () => {
        exitTimer = setTimeout(() => {
          navigate(RoutePath.gameStatistics, level, game.statistics);
        }, OUTRO_DELAY);
      }
    );
    return () => {
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
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
            <Button variant="outlined" onClick={handlePause}>
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
            <Typography variant="h3">
              {String(game.statistics.score).padStart(7, "0")}
            </Typography>
          </Box>
        </Box>
        <GameField width={"100%"} height={"100%"} game={game} />
      </Stack>
      <PauseMenu
        open={isPaused}
        onClose={handleResume}
        onContinue={handleResume}
        onRestart={handleRestart}
        onExit={() => navigate(RoutePath.levelList)}
      />
    </Box>
  );
});

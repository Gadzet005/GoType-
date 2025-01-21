import { Box, Typography } from "@mui/material";
import { BackButton } from "../../common/BackButton";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { GameField } from "./GameField";
import { Level } from "@desktop-common/level";
import { useNavigate } from "@/public/navigation";

interface GamePageProps {
  level: Level;
}

export const GamePage: React.FC<GamePageProps> = observer(({ level }) => {
  useTitle("Игра");

  const onGameEnd = () => {
    navigate(RoutePath.gameResults, level);
  };

  const navigate = useNavigate();
  const [game, setGame] = React.useState<Game | null>(null);

  React.useEffect(() => {
    const game = new Game(level, onGameEnd);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length != 1) {
        return;
      }
      game.onInput(event.key);
    };
    document.addEventListener("keydown", handleKeyDown);

    setGame(game);
    game.run();

    return () => {
      game.pause().then(() => game.setInitialState());
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!game) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          mb: 5,
        }}
      >
        <Box sx={{ width: "15%" }}>
          <BackButton href={RoutePath.levelList} />
        </Box>
        <Typography
          sx={{ justifySelf: "center", fontWeight: "bold" }}
          variant="h4"
        >
          {level.name}
        </Typography>
        <Box sx={{ width: "15%" }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <GameField width={"90%"} height={"90vh"} game={game} />
      </Box>
    </Box>
  );
});

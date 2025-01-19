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

  const navigate = useNavigate();
  const [game] = React.useState<Game>(new Game(level));

  React.useEffect(() => {
    game.start().then(() => {
      game.stop();
      navigate(RoutePath.gameResults, level);
    });
    return () => {
      game.stop();
    };
  }, []);

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
          {game.level.name}
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

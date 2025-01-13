import { Box, Typography } from "@mui/material";
import { BackButton } from "../other/BackButton";
import { RoutePath } from "@/routing/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { useParams } from "react-router-dom";

export const GamePage = observer(() => {
  useTitle("Игра");

  const [game, setGame] = React.useState<Game | null>(null);
  const params = useParams();

  React.useEffect(() => {
    const levelId = Number(params.levelId);
    window.levelAPI.getLevel(levelId).then((level) => {
      setGame(new Game(level));
    });
  }, []);

  if (!game) {
    return (
      <Box>
        <BackButton href={RoutePath.levelList} />
        <Typography variant="h3">Загрузка уровня...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <BackButton href={RoutePath.levelList} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Уровень: {game.level.name}</Typography>
      </Box>
    </Box>
  );
});

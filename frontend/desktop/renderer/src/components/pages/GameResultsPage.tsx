import { Level } from "@desktop-common/level";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "../common/Button";
import { RoutePath } from "@/public/navigation/routePath";

interface GameResultsPageProps {
  level: Level;
}

export const GameResultsPage: React.FC<GameResultsPageProps> = ({ level }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      <Typography sx={{ fontWeight: "bold", mb: 3 }} variant="h4">
        Уровень завершен: {level.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          size="large"
          color="success"
          variant="contained"
          href={RoutePath.game}
          params={[level]}
        >
          Пройти снова
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          href={RoutePath.levelList}
        >
          К списку уровней
        </Button>
      </Box>
    </Box>
  );
};

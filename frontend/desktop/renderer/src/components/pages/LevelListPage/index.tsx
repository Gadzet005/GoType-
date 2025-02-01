import { Box, Typography } from "@mui/material";
import { BackButton } from "../../common/BackButton";
import { RoutePath } from "@/navigation/routePath";
import { useTitle } from "@/hooks/title";
import React from "react";
import { Level } from "@desktop-common/level";
import { LevelList } from "./LevelList";

export const LevelListPage = () => {
  useTitle("Уровни");

  const [levels, setLevels] = React.useState<Level[]>([]);

  React.useEffect(() => {
    window.levelAPI.getLevels().then((levels) => {
      setLevels(levels);
    });
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <BackButton href={RoutePath.home} />
      <Typography
        sx={{ pb: 3, fontWeight: "bold", textAlign: "center" }}
        color="primary"
        variant="h2"
      >
        Сохраненные уровни
      </Typography>
      <LevelList levels={levels} />
    </Box>
  );
};

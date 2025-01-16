import { Box, Typography, Button } from "@mui/material";
import { BackButton } from "../other/BackButton";
import { RoutePath } from "@/routing/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import React from "react";
import { Level } from "@desktop-common/level";

export const LevelListPage = observer(() => {
  useTitle("Уровни");

  const [levels, setLevels] = React.useState<Level[]>([]);

  React.useEffect(() => {
    window.levelAPI.getLevels().then((levels) => {
      setLevels(levels);
    });
  }, []);

  return (
    <Box>
      <BackButton href={RoutePath.home} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Уровни</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
          {levels.map((level) => {
            return (
              <Box key={level.id} sx={{ mb: 2, display: "flex", gap: 3 }}>
                <Typography variant="h5">{level.name}</Typography>
                <Button
                  variant="contained"
                  href={RoutePath.game + "/" + level.id}
                >
                  Играть
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
});

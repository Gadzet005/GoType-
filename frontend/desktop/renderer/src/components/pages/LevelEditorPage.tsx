import { Box, Typography, Button } from "@mui/material";
import { BackButton } from "@/components/other/BackButton";
import { RoutePath } from "@/routing/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import { Level } from "@desktop-common/level";

export const LevelEditorPage = observer(() => {
  useTitle("Редактор уровня");

  const handleCreateLevel = () => {
    const level: Level = {
      id: 1,
      name: "Новый уровень",
      authorId: 1,
      duration: 100,
      description: "Описание...",
      words: [
        {
          text: "Слово 1",
          showTime: 5,
          duration: 3,
          style: { fontFamily: "Roboto", fontSize: 16 },
          coord: { x: 5.5, y: 5.5 },
        },
        {
          text: "Слово 2",
          showTime: 10,
          duration: 5,
          style: { fontFamily: "Roboto", fontSize: 16 },
          coord: { x: 50, y: 50 },
        },
      ],
    };
    window.levelAPI.addLevel(level);
  };

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
        <Typography variant="h3">Редактор уровней</Typography>
        <Button
          sx={{ textAlign: "center", mt: 2, width: "400px" }}
          variant="contained"
          onClick={handleCreateLevel}
        >
          Создать уровень
        </Button>
      </Box>
    </Box>
  );
});

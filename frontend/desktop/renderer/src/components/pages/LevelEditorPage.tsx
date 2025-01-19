import { Box, Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import { BackButton } from "@/components/common/BackButton";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import { Level } from "@desktop-common/level";

export const LevelEditorPage = observer(() => {
  useTitle("Редактор уровня");

  const handleCreateLevel = () => {
    const level: Level = {
      id: 1,
      name: "Тестовый уровень",
      authorId: 1,
      duration: 1000,
      description: "Какое-то описание",
      words: [
        {
          text: "hello",
          showTime: 0,
          duration: 500,
          style: {
            fontFamily: "Roboto",
            fontSize: 30,
            fontWeight: "bold",
            color: "red",
          },
          coord: { x: 0, y: 0 },
        },
        {
          text: "world",
          showTime: 500,
          duration: 500,
          style: {
            fontFamily: "Roboto",
            fontSize: 30,
            fontWeight: "bold",
            color: "red",
          },
          coord: { x: 50, y: 50 },
        },
        {
          text: "buy",
          showTime: 300,
          duration: 500,
          style: {
            fontFamily: "Arial",
            fontSize: 100,
            fontWeight: "normal",
            color: "red",
            bgcolor: "black",
            padding: 2,
          },
          coord: { x: 100, y: 100 },
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

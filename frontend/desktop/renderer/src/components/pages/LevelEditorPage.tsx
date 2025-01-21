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
      description: "Какое-то описание",
      authorId: 1,
      duration: 10,
      previewType: "png",
      tags: ["тест"],

      game: {
        audioType: "mp3",
        backgroundType: "png",
        words: [
          {
            text: "hello",
            showTime: 0,
            duration: 500,
            style: {
              word: {},
              default: {
                fontFamily: "Roboto",
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
              },
              current: {
                color: "blue",
                fontSize: 40,
              },
              mistake: {
                color: "red",
              },
              success: {
                color: "green",
              },
            },
            coord: { x: 0, y: 0 },
          },
          {
            text: "world",
            showTime: 500,
            duration: 500,
            style: {
              word: {},
              default: {
                fontFamily: "Roboto",
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
              },
              current: {
                color: "blue",
                fontSize: 40,
              },
              mistake: {
                color: "red",
              },
              success: {
                color: "green",
              },
            },
            coord: { x: 50, y: 50 },
          },
          {
            text: "beautiful",
            showTime: 300,
            duration: 500,
            style: {
              word: {
                padding: 2,
                bgcolor: "gray",
              },
              default: {
                fontFamily: "Arial",
                fontSize: 70,
                fontWeight: "normal",
                color: "black",
              },
              current: {
                color: "blue",
              },
              mistake: {
                color: "red",
              },
              success: {
                color: "green",
              },
            },
            coord: { x: 100, y: 100 },
          },
        ],
      },
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

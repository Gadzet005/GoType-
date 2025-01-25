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
      id: 3,
      name: "Walk on Water",
      description: "Имба",
      authorId: 1,
      duration: 26,
      previewType: "png",
      tags: ["имба"],
      language: "eng",

      game: {
        audioType: "mp3",
        backgroundType: "png",
        groups: [
          {
            text: "Can you even see what you're fighting for?",
            showTime: 0,
            duration: 1000,
            appearanceDuration: 1000,
            style: {
              group: {},
              default: {
                fontFamily: "Roboto",
                fontSize: 50,
                fontWeight: "bold",
                color: "black",
              },
              current: {
                color: "blue",
                fontSize: 60,
              },
              mistake: {
                color: "red",
              },
              success: {
                color: "green",
              },
            },
            coord: { x: 5, y: 5 },
          },
          {
            text: "Bloodlust and a holy war",
            showTime: 1000,
            duration: 700,
            appearanceDuration: 1000,
            style: {
              group: {
                rotate: 45,
              },
              default: {
                fontFamily: "Roboto",
                fontSize: 50,
                fontWeight: "bold",
                color: "black",
              },
              current: {
                color: "blue",
                fontSize: 60,
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
            text: "Listen up, hear the patriots shout",
            showTime: 1700,
            duration: 800,
            appearanceDuration: 1000,
            style: {
              group: {
                padding: 2,
              },
              default: {
                fontFamily: "Roboto",
                fontSize: 70,
                fontWeight: "bold",
                color: "black",
              },
              current: {
                color: "blue",
                fontSize: 80,
              },
              mistake: {
                color: "red",
              },
              success: {
                color: "green",
              },
            },
            coord: { x: 10, y: 90 },
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

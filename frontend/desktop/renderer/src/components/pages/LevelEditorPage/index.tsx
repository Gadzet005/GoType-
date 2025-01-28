import { Box, Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import { BackButton } from "@/components/common/BackButton";
import { RoutePath } from "@/public/navigation/routePath";
import { useTitle } from "@/public/utils/title";
import { observer } from "mobx-react";
import { Level } from "@desktop-common/level";

export const LevelEditorPage = observer(() => {
  useTitle("Редактор уровня");

  // TODO remove this!!!
  const handleCreateLevel = () => {
    const level: Level = {
      id: 3,
      name: "Walk on Water",
      description:
        "«Walk on Water» — первый сингл группы 30 Seconds to Mars из пятого студийного альбома группы America. Песня была написана солистом группы Джаредом Лето. Сингл вышел в продажу 22 августа 2017 года.",
      author: {
        id: 1,
        name: "John Doe",
      },
      duration: 26,
      preview: {
        type: "jpg",
        url: "",
      },
      tags: ["имба"],
      language: "eng",

      game: {
        audio: {
          type: "mp3",
          url: "",
        },
        background: {
          type: "jpg",
          url: "",
        },
        groups: [
          {
            text: "Can you even see what you're fighting for?",
            showTime: 0,
            duration: 1000,
            style: {
              group: {
                bgcolor: "lightgrey",
                padding: 1,
                borderRadius: 4,
                fadeIn: {
                  duration: 1000,
                  letterDuration: 500,
                  easing: "ease-in-out",
                },
                fadeOut: {
                  duration: 1000,
                  letterDuration: 500,
                  easing: "ease-in-out",
                },
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
            coord: { x: 5, y: 5 },
          },
          {
            text: "Bloodlust and a holy war",
            showTime: 800,
            duration: 700,
            style: {
              group: {
                bgcolor: "lightgrey",
                padding: 1,
                borderRadius: 4,
                rotate: 30,
                fadeIn: {
                  duration: 500,
                  letterDuration: 200,
                  easing: "ease-in-out",
                },
                fadeOut: {
                  duration: 500,
                  letterDuration: 200,
                  easing: "ease-in-out",
                },
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
            style: {
              group: {
                bgcolor: "lightgrey",
                padding: 1,
                borderRadius: 4,
                fadeIn: {
                  duration: 500,
                  letterDuration: 200,
                  easing: "ease-in-out",
                },
                fadeOut: {
                  duration: 500,
                  letterDuration: 200,
                  easing: "ease-in-out",
                },
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
    <Box sx={{ p: 2 }}>
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
          sx={{
            textAlign: "center",
            mt: 5,
            width: "400px",
            fontSize: "1.25rem",
          }}
          variant="contained"
          onClick={handleCreateLevel}
        >
          Создать уровень
        </Button>
      </Box>
    </Box>
  );
});

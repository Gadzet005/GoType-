import { Box } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { useSize } from "@/hooks/size";
import { SentenceView } from "./SentenceView";
import { PauseContext } from "./pause";

interface GameFieldProps {
  width: number | string;
  height: number | string;
  game: Game;
}

export const GameField: React.FC<GameFieldProps> = observer(
  ({ width: _width, height: _height, game }) => {
    const ref = React.useRef(null);
    // width and height in pixels
    const { width, height } = useSize(ref);

    const SentenceViews = game.state.field.getAllSentences().map((sentence) => {
      return (
        <SentenceView
          key={sentence.id}
          sentence={sentence}
          fieldHeight={height}
          fieldWidth={width}
        />
      );
    });

    return (
      <Box
        ref={ref}
        sx={{ position: "relative", overflow: "hidden" }}
        height={_height}
        width={_width}
      >
        <PauseContext.Provider value={game.isPaused}>
          {SentenceViews}
        </PauseContext.Provider>
      </Box>
    );
  }
);

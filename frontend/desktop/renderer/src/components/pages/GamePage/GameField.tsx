import { Box } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { Game } from "@/public/game/game";
import { useSize } from "@/public/utils/size";
import { WordView } from "./WordView";

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

    return (
      <Box
        ref={ref}
        sx={{ bgcolor: "lightgray", position: "relative" }}
        height={_height}
        width={_width}
      >
        {game.state.activeWords.map((word) => {
          return (
            <WordView
              key={word.id}
              word={word}
              fieldHeight={height}
              fieldWidth={width}
            />
          );
        })}
      </Box>
    );
  }
);

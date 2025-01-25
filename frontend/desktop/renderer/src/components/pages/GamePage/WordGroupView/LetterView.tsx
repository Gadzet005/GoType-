import { Typography } from "@mui/material";
import React from "react";
import { LetterStyle } from "@desktop-common/wordGroup";
import { useIsPaused } from "../pause";

import "./letter.css";

interface LetterViewProps {
  letter: string;
  style: LetterStyle;
  appearanceTime: number;
  appearanceDuration?: number;
}

export const LetterView: React.FC<LetterViewProps> = React.memo(function ({
  letter,
  style,
  appearanceTime,
  appearanceDuration = 0.5,
}) {
  const isPaused = useIsPaused();

  return (
    <Typography
      component="span"
      sx={{
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}px`,
        fontWeight: style.fontWeight,
        color: style.color,
        opacity: 0,
        animation: `fadeIn ${appearanceDuration}s ease-out ${appearanceTime}ms forwards`,
        animationPlayState: isPaused ? "paused" : "running",
      }}
    >
      {letter}
    </Typography>
  );
});

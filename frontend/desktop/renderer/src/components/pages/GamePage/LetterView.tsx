import { Typography } from "@mui/material";
import React from "react";
import { LetterStyle } from "@desktop-common/wordGroup";

interface LetterViewProps {
  letter: string;
  style: LetterStyle;
}

export const LetterView: React.FC<LetterViewProps> = ({ letter, style }) => {
  console.assert(letter.length === 1, "Invalid letter");

  return (
    <Typography
      component="span"
      sx={{
        fontFamily: style.fontFamily,
        fontSize: String(style.fontSize) + "px",
        fontWeight: style.fontWeight,
        color: style.color,
      }}
    >
      {letter}
    </Typography>
  );
};

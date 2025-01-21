import { Typography } from "@mui/material";
import React from "react";
import { Word } from "@desktop-common/word";
import { useSize } from "@/public/utils/size";

interface WordProps {
  word: Word;
  fieldHeight: number;
  fieldWidth: number;
}

export const WordView: React.FC<WordProps> = ({
  word,
  fieldHeight,
  fieldWidth,
}) => {
  const ref = React.useRef(null);
  const { width, height } = useSize(ref);

  const x = (word.coord.x / 100) * (fieldWidth - width);
  const y = (word.coord.y / 100) * (fieldHeight - height);

  return (
    <Typography
      sx={{
        position: "absolute",
        left: String(x) + "px",
        top: String(y) + "px",
        fontFamily: word.style.fontFamily,
        fontSize: String(word.style.fontSize) + "px",
        fontWeight: word.style.fontWeight,
        color: word.style.color,
        bgcolor: word.style.bgcolor,
        padding: word.style.padding || 0,
      }}
      variant="h4"
      ref={ref}
    >
      {word.text}
    </Typography>
  );
};

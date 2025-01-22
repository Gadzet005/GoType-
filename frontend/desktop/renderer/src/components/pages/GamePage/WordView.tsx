import { Box } from "@mui/material";
import React from "react";
import { useSize } from "@/public/utils/size";
import { ActiveWord } from "@/public/game/activeWord";
import { LetterView } from "./LetterView";
import { getLetterStyle } from "@desktop-common/utils";
import { observer } from "mobx-react";

interface WordViewProps {
  word: ActiveWord;
  fieldHeight: number;
  fieldWidth: number;
}

export const WordView: React.FC<WordViewProps> = observer(
  ({ word, fieldHeight, fieldWidth }) => {
    const ref = React.useRef(null);
    const { width, height } = useSize(ref);

    const x = (word.coord.x / 100) * (fieldWidth - width);
    const y = (word.coord.y / 100) * (fieldHeight - height);

    const letterViews = [];
    for (let i = 0; i < word.text.length; i++) {
      const letter = word.text[i];
      const styleClass = word.state[i];

      letterViews.push(
        <LetterView
          key={i}
          letter={letter}
          style={getLetterStyle(word, styleClass)}
        />
      );
    }

    return (
      <Box
        sx={{
          position: "absolute",
          left: String(x) + "px",
          top: String(y) + "px",
          p: word.style.word.padding,
          bgcolor: word.style.word.bgcolor,
          rotate: String(word.style.word.rotate) + "deg",
        }}
        ref={ref}
      >
        {letterViews}
      </Box>
    );
  }
);

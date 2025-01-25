import { Box } from "@mui/material";
import React from "react";
import { useSize } from "@/public/utils/size";
import { ActiveWordGroup } from "@/public/game/activeWordGroup";
import { LetterView } from "./LetterView";
import { getLetterStyle } from "@desktop-common/utils";
import { observer } from "mobx-react";

interface WordGroupViewProps {
  group: ActiveWordGroup;
  fieldHeight: number;
  fieldWidth: number;
}

export const WordGroupView: React.FC<WordGroupViewProps> = observer(
  ({ group, fieldHeight, fieldWidth }) => {
    const ref = React.useRef(null);
    const { width, height } = useSize(ref);

    const x = (group.coord.x / 100) * (fieldWidth - width);
    const y = (group.coord.y / 100) * (fieldHeight - height);

    const letterAppearanceDuration =
      group.appearanceDuration / group.text.length;

    const letterViews = group.text.split("").map((letter, i) => {
      const styleClass = group.state[i];
      return (
        <LetterView
          key={i}
          letter={letter}
          style={getLetterStyle(group, styleClass)}
          appearanceTime={i * letterAppearanceDuration}
        />
      );
    });

    return (
      <Box
        sx={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          p: group.style.group.padding,
          bgcolor: group.style.group.bgcolor,
          rotate: `${group.style.group.rotate}deg`,
        }}
        ref={ref}
      >
        {letterViews}
      </Box>
    );
  }
);

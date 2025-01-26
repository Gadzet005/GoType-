import { Box } from "@mui/material";
import React from "react";
import { useSize } from "@/public/utils/size";
import { ActiveWordGroup } from "@/public/game/activeWordGroup";
import { LetterView } from "./LetterView";
import { getLetterStyle } from "@desktop-common/utils";
import { observer } from "mobx-react";
import { TICK_TIME } from "@/public/game/consts";
import { useIsPaused } from "../pause";
import { FadeAnimation } from "@desktop-common/wordGroup";

interface WordGroupViewProps {
  group: ActiveWordGroup;
  fieldHeight: number;
  fieldWidth: number;
}

function getFadeStep(fadeAnimation: FadeAnimation, length: number): number {
  return (fadeAnimation.duration - fadeAnimation.letterDuration) / length;
}

function getAbsoluteCoord(
  relative: number,
  fieldSize: number,
  groupSize: number
): number {
  return (relative * (fieldSize - groupSize)) / 100;
}

export const WordGroupView: React.FC<WordGroupViewProps> = observer(
  ({ group, fieldHeight, fieldWidth }) => {
    const ref = React.useRef(null);
    const { width, height } = useSize(ref);
    const x = getAbsoluteCoord(group.coord.x, fieldWidth, width);
    const y = getAbsoluteCoord(group.coord.y, fieldHeight, height);

    const isPaused = useIsPaused();
    const [activeLetters, setActiveLetters] = React.useState(0);
    React.useEffect(() => {
      const letterInterval = (group.duration * TICK_TIME) / group.text.length;
      if (isPaused) return;
      const intervalId = setInterval(() => {
        setActiveLetters((value) => {
          if (value === group.text.length) {
            clearInterval(intervalId);
            return value;
          }
          return value + 1;
        });
      }, letterInterval);
      return () => clearInterval(intervalId);
    }, [isPaused]);

    const style = group.style.group;
    const fadeInStep = getFadeStep(style.fadeIn, group.text.length);
    const fadeOutStep = getFadeStep(style.fadeOut, group.text.length);

    const letterViews = group.text.split("").map((letter, i) => {
      const styleClass = group.state[i];
      const fadeInTime = i * fadeInStep;
      const fadeOutTime =
        group.duration * TICK_TIME - style.fadeOut.duration + i * fadeOutStep;
      return (
        <LetterView
          key={i}
          letter={letter}
          style={getLetterStyle(group, styleClass)}
          useUnderline={i < activeLetters}
          fadeIn={{
            time: fadeInTime,
            duration: style.fadeIn.letterDuration,
            easing: style.fadeIn.easing,
          }}
          fadeOut={{
            time: fadeOutTime,
            duration: style.fadeOut.letterDuration,
            easing: style.fadeOut.easing,
          }}
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

import React, { useContext, useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { colors } from "../../styles";
import { ThemeContext } from "../../theme/ThemeProvider";
import { enteringZoom, releavingFlip } from "./animations";

const RowLetter = ({index, revealed, width, guess, value} : { index: number, revealed: boolean, width: number, guess: string | MatchData, value: string}) => {
  const showRevealed = useSharedValue(0);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (revealed) {
      showRevealed.value = withDelay(index * 700, withTiming(1));
    }
  }, [revealed])

  const textStyle = useAnimatedStyle(() => ({
    color: showRevealed.value ? theme.colors["tile-evaluated-text-color"] : theme.colors["tile-text-color"]
  }));

  return (<Animated.View key={`${revealed}_${value}`} entering={revealed ? releavingFlip(index, guess as MatchData, theme.colors.highLightColors, theme.colors["tile-border-entered"]) : value ? enteringZoom(theme.colors["tile-border-entered"]) : undefined} style={{ aspectRatio: 1, width: width, borderWidth: 2, margin: 2.5, alignItems: 'center', 'justifyContent': 'center', borderColor: theme.colors["tile-border"] }}>
    <Animated.Text style={[{fontFamily: 'ClearSansBold', fontSize: 30 }, textStyle]}>{value}</Animated.Text>
  </Animated.View>)
}

export const Row = ({ length, guess, current, matchData }: {length: number, guess: MatchData, current: boolean, matchData: MatchData}) => {

  const [revealed, setRevealed] = useState(false);

  const { width } = useWindowDimensions();
  const boxWidth = width * .8 / length;

  useEffect(() => {
    if (!current && guess) {
      setRevealed(true);
    }
  }, [current, guess])
  
  return (<View style={{flexDirection: 'row'}}>
      {[...Array(length)].map((_, i) => (
        <RowLetter guess={current ? matchData.currentGuess : guess} value={current ? matchData.currentGuess[i] : guess?.currentGuess?.[i] ?? ''} index={i} key={`rowletter_${i}`} width={boxWidth} revealed={revealed}/>
      ))}
    </View>)
}

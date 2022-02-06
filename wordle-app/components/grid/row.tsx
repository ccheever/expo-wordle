import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { colors } from "../../styles";
import { enteringZoom, releavingFlip } from "./animations";

const RowLetter = ({index, revealed, width, guess, value} : { index: number, revealed: boolean, width: number, guess: string | MatchData, value: string}) => {
  const showRevealed = useSharedValue(0);

  useEffect(() => {
    if (revealed) {
      showRevealed.value = withDelay(index * 450, withTiming(1));
    }
  }, [revealed])

  const textStyle = useAnimatedStyle(() => ({
    color: showRevealed.value ? colors.white : colors.black
  }));

  return (<Animated.View key={`${revealed}_${value}`} entering={revealed ? releavingFlip(index, guess as MatchData) : value ? enteringZoom : undefined} style={{ aspectRatio: 1, width: width, borderWidth: 2, margin: 2.5, alignItems: 'center', 'justifyContent': 'center', borderColor: colors.grayish }}>
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

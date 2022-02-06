import { withDelay, withSequence, withTiming } from "react-native-reanimated";
import { colors, highLightColors } from "../../styles";

export const enteringZoom = () => {
  'worklet';
  const animations = {
    borderColor: colors.darkishGray,
    transform: [
      { scale: withSequence(withTiming(1.1, { duration: 100 }), withTiming(1, { duration: 100})) },
    ],
  };
  const initialValues = {
    transform: [{ scale: 1 }],
  };
  return {
    initialValues,
    animations,
  };
};

export const releavingFlip = (index: number, guess: MatchData) => () => {
  'worklet';
  
  const initialValues = {
    transform: [{ rotateX: '0deg' }],
  }
  const animations = {
    borderColor: colors.grayish,
    backgroundColor: withDelay(index*400, withTiming(highLightColors[guess.match[index].state])),
    transform: [
      { rotateX: withSequence(withDelay(index*400, withTiming('90deg')), withTiming('0deg')) },
    ],
  }
  return {
    initialValues,
    animations,
  };
}
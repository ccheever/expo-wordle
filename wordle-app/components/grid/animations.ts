import { withDelay, withSequence, withTiming } from "react-native-reanimated";

export const enteringZoom = (borderColor) => () => {
  'worklet';
  const animations = {
    borderColor: borderColor,
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

export const releavingFlip = (index: number, guess: MatchData, highLightColors: {}, borderColor) => () => {
  'worklet';
  
  const initialValues = {
    transform: [{ rotateX: '0deg' }],
    borderColor: borderColor,
  }
  const animations = {
    borderColor: withDelay(index*700, withTiming(highLightColors[guess.match[index].state], { duration: 0 })),
    backgroundColor: withDelay(index*700, withTiming(highLightColors[guess.match[index].state], { duration: 0 })),
    transform: [
      { rotateX: withSequence(withDelay(index*600, withTiming('90deg')), withTiming('0deg')) },
    ],
  }
  return {
    initialValues,
    animations,
  };
}
import { useWindowDimensions, View, Text } from "react-native";
import { colors } from "../../styles";

export const Row = ({ index, length, guess, current, matchData }) => {

  const { width } = useWindowDimensions();
  const boxWidth = width * .8 / length;

  const getHightlighting = (index) => {

    const highLightColors = {
      'CorrectLetterAndPosition': colors.correct,
      'CorrectLetterAndIncorrectPosition': colors.present,
      'IncorrectLetter': colors.absent
    }

    let color = colors.black;
    let backgroundColor = colors.white;
    let borderColor = colors.grayish;

    if (!current && guess) {
      backgroundColor = highLightColors[guess.match[index].state];
      color = colors.white;
    } else if (current) {
      if (index <= matchData.currentGuess?.length - 1 ?? 0) {
        borderColor = colors.darkishGray
      }
    }

    return { color, backgroundColor, borderColor };
  }

  return (<View style={{flexDirection: 'row'}}>
      {[...Array(length)].map((_, i) => (
        <View style={{ aspectRatio: 1, width: boxWidth, borderWidth: 2, margin: 2.5, alignItems: 'center', 'justifyContent': 'center', ...getHightlighting(i) }}>
          <Text style={{fontFamily: 'ClearSansBold', fontSize: 30, color: getHightlighting(i).color }}>{current ? matchData.currentGuess[i] : guess?.currentGuess?.[i] ?? ''}</Text>
        </View>
      ))}
      {/* <Text>{current ? matchData.currentGuess : guess}</Text> */}
    </View>)
}

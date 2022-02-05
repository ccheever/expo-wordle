import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { WordOfTheDayData } from '../../game/WordOfTheDayData';
import { colors } from '../../styles';


const Row = ({ index, length, guess, current, matchData }) => {

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

export default function Renderer({
  matchData,
  wordOfTheDayData,
}: {
  matchData: MatchData;
  wordOfTheDayData: WordOfTheDayData | null;
}) {

  console.log(wordOfTheDayData?.guessLimit)

  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>

      {[...Array(wordOfTheDayData?.guessLimit)].map((_, i) => {
        console.log(i);
        return (
          <Row key={i} index={1} length={wordOfTheDayData?.wordToGuess.length ?? 6} guess={wordOfTheDayData?.guesses[i]} current={wordOfTheDayData?.guesses.length === i} matchData={matchData} />
        )}
      )}


      {matchData.error && <Text>{matchData.error}</Text>}
      {/* <Text>{matchData.currentGuess}</Text> */}
    </View>
  );
}

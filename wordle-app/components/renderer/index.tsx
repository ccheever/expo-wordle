import React from 'react';
import { View, Text } from 'react-native';
import { WordOfTheDayData } from '../../game/WordOfTheDayData';
import { Row } from '../grid/row';

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
          <Row key={i} length={wordOfTheDayData?.wordToGuess.length ?? 6} guess={wordOfTheDayData?.guesses[i]} current={wordOfTheDayData?.guesses.length === i} matchData={matchData} />
        )}
      )}

      {matchData.error && <Text>{matchData.error}</Text>}
    </View>
  );
}

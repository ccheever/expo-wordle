import React from 'react';
import { View, Text } from 'react-native';
import { WordOfTheDayData } from '../../game/WordOfTheDayData';

export default function Renderer({
  matchData,
  wordOfTheDayData,
}: {
  matchData: MatchData;
  wordOfTheDayData: WordOfTheDayData | null;
}) {
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      {matchData.error && <Text>{matchData.error}</Text>}
      <Text>{matchData.currentGuess}</Text>
    </View>
  );
}

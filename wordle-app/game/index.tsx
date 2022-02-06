import React, { useContext, useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import { Keyboard } from '../components/keyboard';
import Renderer from '../components/renderer';
import { ThemeContext } from '../theme/ThemeProvider';
import { WordOfTheDayData } from './WordOfTheDayData';

const defaultGuessLimit = 6;

export default function Game() {
  const [wordOfTheDayData, setWordOfTheDayData] =
    useState<WordOfTheDayData | null>(null);
  const [currentMatchData, setCurrentMatchData] = useState<MatchData>({
    currentGuess: '',
    match: [],
  });
  const guessesLeft =
    defaultGuessLimit - (wordOfTheDayData?.guesses?.length ?? 0);

  const theme = useContext(ThemeContext);

  Appearance.addChangeListener(({ colorScheme }) => { colorScheme && theme.setTheme(colorScheme);});

  useEffect(function loadWordOfTheDayData() {
    // todo - load from disk / fetch
    const data: WordOfTheDayData = {
      wordToGuess: 'LIGHT',
      guesses: [],
      guessLimit: 6,
    };
    setWordOfTheDayData(data);
    // todo - save to disk
  }, []);

  function submitGuess() {
    console.log('submitted with ' + guessesLeft + ' guesses left');

    const matchData = { ...currentMatchData };
    const currentGuess = matchData.currentGuess?.toUpperCase();
    if (guessesLeft === 0) {
      matchData.error = 'Insufficient guesses left';
      setCurrentMatchData(matchData);
      return;
    }
    if (!wordOfTheDayData?.wordToGuess) {
      matchData.error = 'Error loading daily word';
      setCurrentMatchData(matchData);
      return;
    }
    const wordToGuess = wordOfTheDayData.wordToGuess.toUpperCase();
    if (!currentGuess) {
      matchData.error = 'No guess was entered';
      setCurrentMatchData(matchData);
      return;
    }
    if (wordToGuess.length != currentGuess.length) {
      matchData.error = 'Incorrect guess length';
      setCurrentMatchData(matchData);
      return;
    }
    // todo - check dictionary

    matchData.error = undefined;
    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === wordToGuess[i]) {
        matchData.match[i] = {
          character: currentGuess[i],
          state: 'CorrectLetterAndPosition',
        };
        continue;
      }
      if (wordToGuess.includes(currentGuess[i])) {
        matchData.match[i] = {
          character: currentGuess[i],
          state: 'CorrectLetterAndIncorrectPosition',
        };
        continue;
      }
      matchData.match[i] = {
        character: currentGuess[i],
        state: 'IncorrectLetter',
      };
    }

    const updatedWOTDD = {
      ...wordOfTheDayData,
    };
    updatedWOTDD.guesses.push(matchData);
    setCurrentMatchData({
      currentGuess: '',
      match: [],
    });
    setWordOfTheDayData(updatedWOTDD);
    // todo save to disk

    if (
      currentMatchData.match.every(
        (character) => character.state === 'CorrectLetterAndPosition'
      )
    ) {
      console.log('You win');
    } else if (
      currentMatchData.match.some(
        (character) => character.state === 'CorrectLetterAndPosition'
      )
    ) {
      console.log('You guessed some letters correctly');
    } else {
      console.log('You guessed no letters correctly');
    }
  }

  return (
    <View style={{ flex: 1, alignContent: 'flex-end', backgroundColor: theme.colors['modal-content-bg'], alignItems: 'center', justifyContent: 'center' }}>
      <Renderer
        matchData={currentMatchData}
        wordOfTheDayData={wordOfTheDayData}
      />
      <Keyboard
        present={[...currentMatchData.match
          .filter((x) => x.state === 'CorrectLetterAndIncorrectPosition')
          .map((x) => x.character), ...(wordOfTheDayData?.guesses || []).map(g => g.match.filter((x) => x.state === 'CorrectLetterAndIncorrectPosition')
          .map((x) => x.character)).flat()].flat()}
        correct={[...currentMatchData.match
          .filter((x) => x.state === 'CorrectLetterAndPosition')
          .map((x) => x.character), ...(wordOfTheDayData?.guesses || []).map(g => g.match.filter((x) => x.state === 'CorrectLetterAndPosition')
          .map((x) => x.character)).flat()].flat()}
        absent={[...currentMatchData.match
          .filter((x) => x.state === 'IncorrectLetter')
          .map((x) => x.character), ...(wordOfTheDayData?.guesses || []).map(g => g.match.filter((x) => x.state === 'IncorrectLetter')
          .map((x) => x.character)).flat()].flat()}
        onLetter={(val: string) => {
          const matchData = { ...currentMatchData };
          if (matchData.currentGuess.length < wordOfTheDayData?.wordToGuess.length) {
            matchData.currentGuess += val;
            setCurrentMatchData(matchData);
          }
        }}
        onDelete={() => {
          const matchData = { ...currentMatchData };
          matchData.currentGuess =
            matchData.currentGuess?.slice(
              0,
              matchData.currentGuess.length - 1
            ) ?? '';
          setCurrentMatchData(matchData);
        }}
        onEnter={() => submitGuess()}
      />
    </View>
  );
}

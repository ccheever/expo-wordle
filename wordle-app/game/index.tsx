import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, View } from 'react-native';
import { Keyboard } from '../components/keyboard';
import Renderer from '../components/renderer';
import { ThemeContext } from '../theme/ThemeProvider';
import { WordOfTheDayData } from './WordOfTheDayData';
import acceptableWordList from './acceptable-words-in-wordle.json';
import dailyWords from './daily-words.json';
import { defaultGuessLimit } from './constants';

// todo - put this an onMount into a page focused navigation listener
const date = new Date();
const key = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

export default function Game() {
  const [wordOfTheDayData, setWordOfTheDayData] =
    useState<WordOfTheDayData | null>(null);
  const [currentMatchData, setCurrentMatchData] = useState<MatchData>({
    currentGuess: '',
    match: [],
  });
  const guessesLeft =
    defaultGuessLimit - (wordOfTheDayData?.guesses?.length ?? 0);
  const hasGuessedOrOutOfGuesses =
    !(wordOfTheDayData?.hasCorrectlyGuessed ?? false) && guessesLeft > 0;
  const isKeypresssInteractble =
    hasGuessedOrOutOfGuesses &&
    currentMatchData?.currentGuess.length <
      (wordOfTheDayData?.wordToGuess.length ?? 0);
  const isEnterInteractable = hasGuessedOrOutOfGuesses;
  const isDeleteInteractable =
    hasGuessedOrOutOfGuesses && currentMatchData?.currentGuess.length > 0;

  const theme = useContext(ThemeContext);

  Appearance.addChangeListener(({ colorScheme }) => {
    colorScheme && theme.setTheme(colorScheme);
  });

  useEffect(function loadWordOfTheDayData() {
    async function run() {
      // for dev
      // await AsyncStorage.clear();
      const storedData = await AsyncStorage.getItem(key);
      if (storedData) {
        // fetch user's previously modified data
        const _wordOfTheDayData: WordOfTheDayData = JSON.parse(storedData);
        setWordOfTheDayData(_wordOfTheDayData);
      } else {
        // fetch daily static starting data
        const loadedWordOfTheDayData = (
          dailyWords as Record<string, WordOfTheDayData>
        )[key];
        if (loadedWordOfTheDayData) {
          setWordOfTheDayData(loadedWordOfTheDayData);
        } else {
          // falback case
          const data: WordOfTheDayData = {
            wordToGuess: 'LIGHT',
            guesses: [],
            guessLimit: 6,
            hasCorrectlyGuessed: false,
          };
          setWordOfTheDayData(data);
        }
      }
    }
    run();
  }, []);

  async function submitGuess() {
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
    if (!acceptableWordList.includes(currentGuess)) {
      matchData.error = 'Invalid word choice';
      setCurrentMatchData(matchData);
      return;
    }

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
    const hasCorrectlyGuessed = currentMatchData.match.every(
      (character) => character.state === 'CorrectLetterAndPosition'
    );

    const updatedWOTDD = {
      ...wordOfTheDayData,
      hasCorrectlyGuessed,
    };
    updatedWOTDD.guesses.push(matchData);
    setWordOfTheDayData(updatedWOTDD);
    await AsyncStorage.setItem(key, JSON.stringify(updatedWOTDD));

    if (hasCorrectlyGuessed) {
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
    setCurrentMatchData({
      currentGuess: '',
      match: [],
    });
  }

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'flex-end',
        backgroundColor: theme.colors['modal-content-bg'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Renderer
        matchData={currentMatchData}
        wordOfTheDayData={wordOfTheDayData}
      />
      <Keyboard
        present={[
          ...currentMatchData.match
            .filter((x) => x.state === 'CorrectLetterAndIncorrectPosition')
            .map((x) => x.character),
          ...(wordOfTheDayData?.guesses || [])
            .map((g) =>
              g.match
                .filter((x) => x.state === 'CorrectLetterAndIncorrectPosition')
                .map((x) => x.character)
            )
            .flat(),
        ].flat()}
        correct={[
          ...currentMatchData.match
            .filter((x) => x.state === 'CorrectLetterAndPosition')
            .map((x) => x.character),
          ...(wordOfTheDayData?.guesses || [])
            .map((g) =>
              g.match
                .filter((x) => x.state === 'CorrectLetterAndPosition')
                .map((x) => x.character)
            )
            .flat(),
        ].flat()}
        absent={[
          ...currentMatchData.match
            .filter((x) => x.state === 'IncorrectLetter')
            .map((x) => x.character),
          ...(wordOfTheDayData?.guesses || [])
            .map((g) =>
              g.match
                .filter((x) => x.state === 'IncorrectLetter')
                .map((x) => x.character)
            )
            .flat(),
        ].flat()}
        onLetter={(val: string) => {
          if (!isKeypresssInteractble) return;

          const matchData = { ...currentMatchData };
          matchData.currentGuess += val;
          setCurrentMatchData(matchData);
        }}
        onDelete={() => {
          if (!isDeleteInteractable) return;

          const matchData = { ...currentMatchData };
          matchData.currentGuess =
            matchData.currentGuess?.slice(
              0,
              matchData.currentGuess.length - 1
            ) ?? '';
          setCurrentMatchData(matchData);
        }}
        onEnter={async () => {
          if (!isEnterInteractable) return;

          await submitGuess();
        }}
      />
    </View>
  );
}

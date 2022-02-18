export type WordOfTheDayData = {
  wordToGuess: string;
  guesses: MatchData[];
  guessLimit: number;
  hasCorrectlyGuessed: boolean;
};

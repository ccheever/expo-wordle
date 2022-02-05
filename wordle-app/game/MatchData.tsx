type MatchData = {
  currentGuess: string;
  error?: string;
  match: {
    character: string;
    state:
      | 'CorrectLetterAndPosition'
      | 'CorrectLetterAndIncorrectPosition'
      | 'IncorrectLetter';
  }[];
};

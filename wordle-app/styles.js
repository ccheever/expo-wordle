const rootColors = {
  'green': '#6aaa64',
  'darkendGreen': '#538d4e',
  'yellow': '#c9b458',
  'darkendYellow': '#b59f3b',
  'lightGray': '#d8d8d8',
  'gray': '#86888a',
  'darkGray': '#939598',
  'white': '#fff',
  'black': '#212121',
  'orange': '#f5793a',
  'blue': '#85c0f9',
}

const darkColors = {
  'color-tone-1': '#d7dadc',
  'color-tone-2': '#818384',
  'color-tone-3': '#565758',
  'color-tone-4': '#3a3a3c',
  'color-tone-5': '#272729',
  'color-tone-6': '#1a1a1b',
  'color-tone-7': '#121213',
}
  
const lightColors = {
  'color-tone-1': '#1a1a1b',
  'color-tone-2': '#787c7e',
  'color-tone-3': '#878a8c',
  'color-tone-4': '#d3d6da',
  'color-tone-5': '#edeff1',
  'color-tone-6': '#f6f7f8',
  'color-tone-7': '#ffffff',
}

export let colors = {
  light: {
    'color-present': rootColors.yellow,
    'color-correct': rootColors.green,
    'color-absent': lightColors['color-tone-2'],
    'tile-evaluated-text-color': lightColors['color-tone-7'],
    'tile-text-color': lightColors['color-tone-1'],
    'tile-border-entered': lightColors['color-tone-3'],
    'tile-border': lightColors['color-tone-4'],
    'key-text-color': lightColors['color-tone-1'],
    'key-evaluated-text-color': lightColors['color-tone-7'],
    'key-bg': lightColors['color-tone-4'],
    'key-bg-present': rootColors.yellow,
    'key-bg-correct': rootColors.green,
    'key-bg-absent': lightColors['color-tone-2'],
    'modal-content-bg': lightColors['color-tone-7'],
    highLightColors: {
      'CorrectLetterAndPosition': rootColors.green,
      'CorrectLetterAndIncorrectPosition': rootColors.yellow,
      'IncorrectLetter': lightColors['color-tone-2'],
    }
  },
  dark: {
    'color-present': rootColors.darkendYellow,
    'color-correct': rootColors.darkendGreen,
    'color-absent': darkColors['color-tone-4'],
    'tile-evaluated-text-color': darkColors['color-tone-1'],
    'tile-text-color': darkColors['color-tone-1'],
    'tile-border-entered': darkColors['color-tone-3'],
    'tile-border': darkColors['color-tone-4'],
    'key-text-color': darkColors['color-tone-1'],
    'key-evaluated-text-color': darkColors['color-tone-1'],
    'key-bg': darkColors['color-tone-2'],
    'key-bg-present': rootColors.darkendYellow,
    'key-bg-correct': rootColors.darkendGreen,
    'key-bg-absent': darkColors['color-tone-4'],
    'modal-content-bg': darkColors['color-tone-7'],
    highLightColors: {
      'CorrectLetterAndPosition': rootColors.darkendGreen,
      'CorrectLetterAndIncorrectPosition': rootColors.darkendYellow,
      'IncorrectLetter': darkColors['color-tone-4'],
    }
  },
};

export const highLightColors = {
  'CorrectLetterAndPosition': colors.correct,
  'CorrectLetterAndIncorrectPosition': colors.present,
  'IncorrectLetter': colors.absent
}
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import {colors} from '../styles';

export const ThemeContext = React.createContext({ colors: colors.light, setTheme: (colorScheme: string) => {} });

const ThemeProvider = ({children}: { children: any}) => {

  let colorScheme = useColorScheme();
  const [isLightTheme, setLightTheme] = useState(colorScheme === 'light');
  const setTheme = (colorScheme: string) => setLightTheme(colorScheme === 'light');

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
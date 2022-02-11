import { useContext } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../theme/ThemeProvider';
import Backspace from './backspace';

type KeyProps = {
  Letter: string | object;
  width: number;
  color: string;
  textColor: string;
  onPress: () => void;
};

const Key = ({
  Letter,
  width = 1,
  color,
  textColor,
  onPress,
}: KeyProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const keyWidth = ((windowWidth - 60) / 10) * width;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.keyStyle, {
        aspectRatio: 0.74 * width,
        width: keyWidth,
        backgroundColor: color,
      }]}
    >
      {typeof Letter === 'string' ? (
        <Text
          style={{
            fontFamily: 'ClearSansBold',
            color: textColor,
          }}
        >
          {Letter}
        </Text>
      ) : (
        <Backspace color={textColor} />
      )}
    </Pressable>
  );
};

type KeyboardProps = {
  present: string[];
  correct: string[];
  absent: string[];
  onEnter: () => void;
  onDelete: () => void;
  onLetter: (letter: string) => void;
};

// TODO: Have this come in through a GameContext consumer
export const Keyboard = ({
  present = [],
  correct = [],
  absent = [],
  onEnter,
  onDelete,
  onLetter,
}: KeyboardProps) => {
  const { bottom } = useSafeAreaInsets();

  const theme = useContext(ThemeContext);

  const renderKey = (val: string | (any | number | (() => void))[]) => {
    const letter: any = Array.isArray(val) ? val[0] : val;
    const width = Array.isArray(val) ? val[1] : 1;
    const handler = Array.isArray(val) ? val[2] : onLetter;

    const color = Array.isArray(val)
      ? theme.colors['key-bg']
      : correct.includes(letter)
      ? theme.colors['key-bg-correct']
      : present.includes(letter)
      ? theme.colors['key-bg-present']
      : absent.includes(letter)
      ? theme.colors['key-bg-absent']
      : theme.colors['key-bg'];
    return (
      <Key
        onPress={() => handler(letter)}
        key={letter}  
        Letter={letter}
        width={width}
        color={color}
        textColor={color === theme.colors['key-bg'] ? theme.colors['key-text-color'] : theme.colors['key-evaluated-text-color']}
      />
    );
  };

  return (
    <View style={[styles.keyboardContainer, { marginBottom: bottom }]}>
      <View style={styles.keyboardRow}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(renderKey)}
      </View>
      <View style={styles.keyboardRow}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(renderKey)}
      </View>
      <View style={styles.keyboardRow}>
        {[
          ['ENTER', 1.52, onEnter],
          'Z',
          'X',
          'C',
          'V',
          'B',
          'N',
          'M',
          [<Backspace />, 1.52, onDelete],
        ].map(renderKey)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 3,
  },
  keyStyle: {
    marginHorizontal: 3,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

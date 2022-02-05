import { View, Text, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles";
import Backspace from "./backspace";

const Key = ({ letter, width = 1, color = colors.grayish }) => {
  const { width: windowWidth } = useWindowDimensions();
  const keyWidth = ((windowWidth - 60) / 10) * width;

  return (
    <View
      style={{
        ...styles.keyStyle,
        aspectRatio: 0.74 * width,
        width: keyWidth,
        backgroundColor: color,
      }}
    >
      {typeof letter === "string" ? (
        <Text style={{ fontFamily: "ClearSansBold", color: color !== colors.grayish ? colors.white : colors.blacker }}>{letter}</Text>
      ) : (
        letter
      )}
    </View>
  );
};

// TODO: Have this come in through a GameContext consumer
export const Keyboard = ({ present = [], correct = [], absent = [] }) => {
  const { bottom } = useSafeAreaInsets();

  const renderKey = (val: string | [any, number]) => {
    const letter: any = Array.isArray(val) ? val[0] : val;
    const width = Array.isArray(val) ? val[1] : 1;

    const color = Array.isArray(val)
      ? colors.grayish
      : present.includes(letter)
      ? colors.present
      : correct.includes(letter)
      ? colors.correct
      : absent.includes(letter)
      ? colors.absent
      : colors.grayish;
    return (
      <Key
        key={letter}
        letter={letter}
        width={width}
        color={color}
      />
    );
  };

  return (
    <View
      style={[styles.keyboardContainer, {marginBottom: bottom}]}
    >
      <View style={styles.keyboardRow}>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(renderKey)}
      </View>
      <View style={styles.keyboardRow}>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(renderKey)}
      </View>
      <View style={styles.keyboardRow}>
        {[["ENTER", 1.52],"Z","X","C","V","B","N","M",[<Backspace />, 1.52],].map(renderKey)}
      </View>
    </View>
  );
};

const styles = {
  keyboardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  keyboardRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 3,
  },
  keyStyle: {
    marginHorizontal: 3,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  }
}

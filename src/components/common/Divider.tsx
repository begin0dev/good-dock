import { StyleProp, StyleSheet, ViewStyle, View } from "react-native";
import { themeColors } from "../../styles/colors";

interface Props {
  type?: "horizontal" | "vertical";
  color?: string;
  style?: StyleProp<ViewStyle>;
}

function Divider({ type = "horizontal", color = themeColors.TEXT_1, style }: Props) {
  return <View style={[{ backgroundColor: color }, styles[type], style]} />;
}

export default Divider;

export const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    height: "100%",
    width: 1,
  },
});

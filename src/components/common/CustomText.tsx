import { StyleSheet, Text, TextProps } from "react-native";

import { themeColors } from "../../styles/colors";

const FONT_FAMILY = {
  normal: "Noto Sans KR",
  medium: "Noto Sans KR Medium",
  bold: "Noto Sans KR Bold",
} as const;

const FONT_WEIGHT = {
  normal: "400",
  medium: "600",
  bold: "700",
} as const;

interface Props extends TextProps {
  color?: string;
  fontWeight?: "normal" | "medium" | "bold";
  fontSize?: number;
  type?: "h1" | "subText";
}

function CustomText({
  color,
  fontWeight = "normal",
  fontSize = 14,
  style,
  children,
  type,
  ...textProps
}: Props) {
  return (
    <Text
      style={[
        {
          fontSize,
          color: color || themeColors.TEXT_0,
          fontFamily: FONT_FAMILY[fontWeight],
          fontWeight: FONT_WEIGHT[fontWeight],
        },
        type ? styles[type] : null,
        style,
      ]}
      {...textProps}>
      {children}
    </Text>
  );
}

export default CustomText;

const styles = StyleSheet.create({
  h1: {
    fontSize: 18,
    lineHeight: 28,
  },
  subText: {
    fontSize: 12,
    lineHeight: 16,
    color: themeColors.TEXT_1,
  },
});

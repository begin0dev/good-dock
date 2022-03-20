import { Text, TextProps } from "react-native";
import useColor from "../../hooks/useColor";

const FONT_WEIGHTS = {
  normal: "400",
  semiBold: "600",
  bold: "700",
} as const;

interface Props extends TextProps {
  color?: string;
  fontWeight?: "normal" | "semiBold" | "bold";
  fontSize?: number;
}

function CustomText({
  color,
  fontWeight = "normal",
  fontSize = 14,
  style,
  children,
  ...textProps
}: Props) {
  const colors = useColor();

  return (
    <Text
      style={[
        { color: color || colors.TEXT_0, fontSize, fontWeight: FONT_WEIGHTS[fontWeight] },
        style,
      ]}
      {...textProps}>
      {children}
    </Text>
  );
}

export default CustomText;

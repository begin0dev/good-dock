import { Text, TextProps } from "react-native";
import useColor from "../../hooks/useColor";

interface Props extends TextProps {
  color?: string;
}

function CustomText({ color, style, children, ...textProps }: Props) {
  const colors = useColor();

  return (
    <Text style={[style, { color: color || colors.TEXT_0 }]} {...textProps}>
      {children}
    </Text>
  );
}

export default CustomText;

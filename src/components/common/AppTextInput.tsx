import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { themeColors } from "../../styles/colors";
import { SIZE_MAPPER, SizeType } from "../../helpers/utils";

interface Props extends TextInputProps {
  size?: SizeType;
  type?: "string" | "number";
}

function AppTextInput({ type = "string", size = "medium", style, ...restProps }: Props) {
  return (
    <TextInput
      keyboardType={type === "number" ? "numeric" : undefined}
      style={[styles.textInput, { height: SIZE_MAPPER[size], maxHeight: SIZE_MAPPER[size] }, style]}
      placeholderTextColor={themeColors.TEXT_1}
      {...restProps}
    />
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: themeColors.TEXT_0,
    borderColor: themeColors.TEXT_1,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
});

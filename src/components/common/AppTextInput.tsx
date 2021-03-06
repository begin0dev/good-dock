import { forwardRef } from "react";
import { StyleSheet, TextInputProps, TextInput } from "react-native";

import { themeColors } from "../../styles/colors";
import { SIZE_MAPPER, SizeType } from "../../helpers/utils";

interface Props extends TextInputProps {
  size?: SizeType;
}

const AppTextInput = forwardRef<TextInput, Props>(
  ({ size = "medium", style, ...restProps }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[
          styles.textInput,
          { height: SIZE_MAPPER[size], maxHeight: SIZE_MAPPER[size] },
          style,
        ]}
        placeholderTextColor={themeColors.TEXT_1}
        {...restProps}
      />
    );
  },
);

export default AppTextInput;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 14,
    color: themeColors.TEXT_0,
    borderColor: themeColors.TEXT_1,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
});

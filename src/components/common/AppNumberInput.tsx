import { forwardRef, useEffect, useState } from "react";
import { StyleSheet, TextInputProps, TextInput } from "react-native";

import { themeColors } from "../../styles/colors";
import { SIZE_MAPPER, SizeType } from "../../helpers/utils";

interface Props extends Omit<TextInputProps, "defaultValue" | "value" | "onChangeText"> {
  size?: SizeType;
  withFormat?: boolean;
  defaultValue?: number;
  value?: number;
  onChangeText?: (value: number) => void;
}

const ONLY_NUMBER_REGEX = /[^(\-.\d)]/g;
const NUMBER_REGEX = /\B(?=(\d{3})+(?!\d))/g;
const parsingValue = (
  value: number | string | undefined,
  withFormat?: boolean,
): string | undefined => {
  if (value === undefined) return undefined;
  if (!withFormat) return value.toString();
  const [int, decimal] = value.toString().split(".");

  if (decimal === undefined) return int.replace(NUMBER_REGEX, ",");
  return `${int.replace(NUMBER_REGEX, ",")}.${decimal}`;
};

const AppNumberInput = forwardRef<TextInput, Props>(
  (
    { size = "medium", style, defaultValue, value, onChangeText, withFormat, ...restProps },
    ref,
  ) => {
    const [text, setText] = useState<string | undefined>(
      parsingValue(defaultValue ?? value, withFormat),
    );

    const onChange = (strValue: string) => {
      const onlyNumber = strValue.toString().replace(ONLY_NUMBER_REGEX, "");
      setText(parsingValue(onlyNumber, withFormat));
      const number = Number(onlyNumber);
      onChangeText?.(isNaN(number) ? 0 : number);
    };

    useEffect(() => {
      if (defaultValue) setText(parsingValue(defaultValue, withFormat));
    }, [defaultValue, withFormat]);

    return (
      <TextInput
        ref={ref}
        keyboardType="numeric"
        value={text}
        onChangeText={onChange}
        placeholderTextColor={themeColors.TEXT_1}
        style={[
          styles.textInput,
          { height: SIZE_MAPPER[size], maxHeight: SIZE_MAPPER[size] },
          style,
        ]}
        {...restProps}
      />
    );
  },
);

export default AppNumberInput;

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

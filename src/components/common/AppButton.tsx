import { ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle, TouchableNativeFeedback, View } from "react-native";

import CustomText from "./CustomText";
import { themeColors } from "../../styles/colors";
import { SIZE_MAPPER } from "../../helpers/utils";

const TEXT_COLOR_MAPPER = {
  primary: themeColors.TEXT_BTN,
  secondary: themeColors.TEXT_BTN,
  ghost: themeColors.TEXT_1,
} as const;

interface Props {
  type?: "primary" | "ghost";
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  disabled?: boolean;
}

function AppButton({ type = "primary", size = "medium", style, disabled, children }: Props) {
  return (
    <TouchableNativeFeedback disabled={disabled}>
      <View
        style={[
          styles.buttonWrapper,
          styles[disabled ? "disable" : type],
          { height: SIZE_MAPPER[size] },
          style,
        ]}>
        <CustomText fontWeight="semiBold" color={TEXT_COLOR_MAPPER[type]}>
          {children}
        </CustomText>
      </View>
    </TouchableNativeFeedback>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: themeColors.PRIMARY,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: themeColors.SECONDARY,
  },
  disable: {
    backgroundColor: themeColors.SECONDARY,
  },
});

import { useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";

import CustomText from "./CustomText";
import { themeColors } from "../../styles/colors";
import { SIZE_MAPPER } from "../../helpers/utils";
import useId from "../../hooks/useId";

interface Props<V> {
  size?: "small" | "medium" | "large";
  space?: number;
  defaultValue?: V;
  items: Array<{ label: string; value: V }>;
  onPress?: (value: V) => void;
}

function Radio<V extends string>({
  size = "medium",
  defaultValue,
  space = 10,
  onPress,
  items,
}: Props<V>) {
  const id = useId();
  const [checked, setChecked] = useState<V | undefined>(defaultValue);

  const onClick = (value: V) => {
    setChecked(value);
    onPress?.(value);
  };

  return (
    <View style={styles.group}>
      {items.map((item, i) => {
        const color = checked === item.value ? themeColors.PRIMARY : themeColors.TEXT_1;
        const marginLeft = i !== 0 ? space : 0;
        return (
          <TouchableNativeFeedback key={`${id}_${i}`} onPress={() => onClick(item.value)}>
            <View
              style={[
                styles.radioBtn,
                { height: SIZE_MAPPER[size], borderColor: color, marginLeft },
              ]}>
              <CustomText color={color}>{item.label}</CustomText>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
}

export default Radio;

const styles = StyleSheet.create({
  group: {
    width: "100%",
    flexDirection: "row",
  },
  radioBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});

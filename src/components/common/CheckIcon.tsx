import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IcCheck } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";

interface Props {
  onPress?: () => void;
  isChecked?: boolean;
}

function CheckIcon({ onPress, isChecked }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonWrapper, isChecked && styles.active]}>
        <IcCheck color={isChecked ? themeColors.SECONDARY_BACKGROUND : themeColors.TEXT_1} />
      </View>
    </TouchableOpacity>
  );
}

export default CheckIcon;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: themeColors.TEXT_1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: themeColors.TEXT_0,
    borderColor: themeColors.TEXT_0,
  },
});

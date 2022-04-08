import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Subsribe } from "../../types/subsribe";
import { CustomText } from "../common";
import { themeColors } from "../../styles/colors";
import CheckIcon from "../common/CheckIcon";

interface Props {
  item: Subsribe;
  isChecked: boolean;
  onPressItem: () => void;
}

function SearchItem({ item, isChecked, onPressItem }: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View style={styles.itemWrapper}>
        <FastImage source={{ uri: item.imageUrl }} style={styles.itemImage} />
        <CustomText fontSize={18} color={themeColors.TEXT_1}>
          {item.ko}
        </CustomText>
        <View style={styles.icon}>
          <CheckIcon isChecked={isChecked} onPress={onPressItem} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(SearchItem);

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 26,
    marginBottom: 15,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 14,
  },
  icon: {
    position: "absolute",
    right: 0,
  },
});

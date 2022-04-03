import { memo } from "react";
import { Subsribe } from "../../types/subsribe";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

import { CustomText } from "../common";
import { themeColors } from "../../styles/colors";

interface Props {
  item: Subsribe;
}

function SearchItem({ item }: Props) {
  return (
    <View style={styles.itemWrapper}>
      <FastImage source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <CustomText fontSize={18} color={themeColors.TEXT_1}>
        {item.ko}
      </CustomText>
    </View>
  );
}

export default memo(SearchItem);

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 14,
  },
});

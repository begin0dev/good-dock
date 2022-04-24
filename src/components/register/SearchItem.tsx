import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Subscribe } from "../../types/subsribe";
import { themeColors } from "../../styles/colors";
import { IcWallet } from "../../assets/svgs";
import { CustomText } from "../common";
import CheckIcon from "../common/CheckIcon";

interface ItemProps extends PropsBase {
  type: "DEFAULT";
  item: Subscribe;
}
interface NotFoundItem extends PropsBase {
  type: "NOT_FOUND";
  item: { ko: string };
}

interface PropsBase {
  type: string;
  isChecked: boolean;
  onPressItem: () => void;
}

function SearchItem({ type, item, isChecked, onPressItem }: ItemProps | NotFoundItem) {
  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View style={styles.itemWrapper}>
        {type === "DEFAULT" && (
          <FastImage source={{ uri: item.imageUrl }} style={styles.itemImage} />
        )}
        {type === "NOT_FOUND" && (
          <View style={styles.walletIcon}>
            <IcWallet color={themeColors.BACKGROUND} />
          </View>
        )}
        <CustomText fontSize={18} color={themeColors.TEXT_1} style={styles.text}>
          {`${item.ko}${type === "NOT_FOUND" ? " 등록하기" : ""}`}
        </CustomText>
        <View style={styles.checkIcon}>
          <CheckIcon isChecked={isChecked} onPress={onPressItem} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(SearchItem);

const ICON_SIZE = 40;
const SPACE_SIZE = 14;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 26,
    marginBottom: 15,
  },
  itemImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 20,
  },
  walletIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: themeColors.TEXT_1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: SPACE_SIZE,
  },
  checkIcon: {
    position: "absolute",
    right: 0,
  },
});

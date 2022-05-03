import { useState } from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import { themeColors } from "../../../styles/colors";
import { IcChevronDown } from "../../../assets/svgs";
import CustomText from "../CustomText";
import AppButton from "../AppButton";

const ITEM_HEIGHT = 40;
const FONT_SIZE = 14;

interface Props<V extends string | number = string> {
  placeholder?: string;
  value?: V | null;
  items: { label?: string; value: string | number }[];
  onPressItem: (value: V) => void;
  viewCount?: number;
}

function Select<V extends string | number = string>({
  placeholder,
  value,
  items,
  onPressItem,
  viewCount = 5,
}: Props<V>) {
  const [isVisible, setIsVisible] = useState(false);

  const onPress = (nextValue: string | number) => {
    onPressItem(nextValue as V);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsVisible(true)}>
        <View style={styles.wrapper}>
          {value && (
            <CustomText fontSize={FONT_SIZE}>
              {items.find((item) => item.value === value)!.label}
            </CustomText>
          )}
          {!value && placeholder && (
            <CustomText fontSize={FONT_SIZE} color={themeColors.TEXT_1}>
              {placeholder}
            </CustomText>
          )}
          <IcChevronDown style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
      <Modal isVisible={isVisible} backdropOpacity={0.3} style={styles.modal}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalController}>
            <AppButton size="small" type="ghost" onPress={() => setIsVisible(false)}>
              취소
            </AppButton>
          </View>
          <ScrollView style={[{ height: ITEM_HEIGHT * viewCount + 20 }, styles.selectWrapper]}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.selectItem}
                onPress={() => onPress(item.value)}>
                <CustomText
                  fontSize={16}
                  color={value === item.value ? themeColors.PRIMARY : themeColors.TEXT_1}>
                  {item.label ?? item.value.toString()}
                </CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default Select;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flex: 1,
    height: 40,
    minWidth: 45,
    borderColor: themeColors.TEXT_1,
    borderRadius: 6,
    borderWidth: 1,
    paddingBottom: 1,
    paddingLeft: 13,
    paddingRight: 30,
  },
  icon: {
    position: "absolute",
    right: 7,
    top: (40 - 20) / 2,
    height: 20,
    width: 20,
    color: themeColors.TEXT_1,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalWrapper: {
    backgroundColor: themeColors.BACKGROUND,
  },
  modalController: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 4,
    borderBottomColor: themeColors.TEXT_1,
    borderBottomWidth: 1,
  },
  selectWrapper: {
    marginVertical: 10,
  },
  selectItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useState } from "react";
import Modal from "react-native-modal";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { themeColors } from "../../../styles/colors";
import { IcChevronDown } from "../../../assets/svgs";
import CustomText from "../CustomText";
import AppButton from "../AppButton";

interface Props {
  placeholder?: string;
}

function Select({ placeholder }: Props) {
  const FONT_SIZE = 14;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsVisible(true)}>
        <View style={styles.wrapper}>
          {placeholder && (
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
            <AppButton
              size="small"
              type="ghost"
              onPress={() => setIsVisible(false)}
              style={styles.btnSpace}>
              취소
            </AppButton>
            <AppButton size="small" onPress={() => {}}>
              확인
            </AppButton>
          </View>
          <CustomText fontSize={FONT_SIZE} color={themeColors.TEXT_1}>
            aaaaa
          </CustomText>
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
    minHeight: 200,
  },
  modalController: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 4,
    borderBottomColor: themeColors.TEXT_1,
    borderBottomWidth: 1,
  },
  btnSpace: {
    marginRight: 4,
  },
});

import { StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { themeColors } from "../../styles/colors";
import { Calendar } from "../common";
import { IcClose } from "../../assets/svgs";

interface Props {
  defaultDate?: Date | null | undefined;
  isVisible: boolean;
  onPressDate?: (date: Date) => void;
  onClose?: () => void;
}

function CalendarModal({ isVisible, defaultDate, onPressDate, onClose }: Props) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose} backdropOpacity={0.4}>
      <View style={styles.wrapper}>
        <View style={styles.closeBtnWrapper}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <IcClose color={themeColors.SECONDARY_BACKGROUND} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Calendar defaultDate={defaultDate} onPressDate={onPressDate} />
        </View>
      </View>
    </Modal>
  );
}

export default CalendarModal;

const styles = StyleSheet.create({
  closeBtnWrapper: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  closeBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.TEXT_0,
    borderRadius: 16,
  },
  wrapper: {
    position: "relative",
    alignItems: "center",
    paddingVertical: 16,
  },
  content: {
    width: 332,
    paddingVertical: 12,
    paddingHorizontal: 7,
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    borderRadius: 20,
  },
});

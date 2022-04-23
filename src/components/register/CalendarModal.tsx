import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";

import { themeColors } from "../../styles/colors";
import { Calendar } from "../common";

interface Props {
  defaultDate?: Date | null | undefined;
  isVisible: boolean;
  onPressDate?: (date: Date) => void;
  onClose?: () => void;
}

function CalendarModal({ isVisible, defaultDate, onPressDate, onClose }: Props) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose}>
      <Text>aaaa</Text>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Calendar defaultDate={defaultDate} onPressDate={onPressDate} />
        </View>
      </View>
    </Modal>
  );
}

export default CalendarModal;

const styles = StyleSheet.create({
  closeBtn: {},
  wrapper: {
    alignItems: "center",
  },
  content: {
    width: 332,
    paddingVertical: 12,
    paddingHorizontal: 7,
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    borderRadius: 20,
  },
});

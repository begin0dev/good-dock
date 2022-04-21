import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { themeColors } from "../../styles/colors";
import { Calendar } from "../common";

interface Props {
  isVisible: boolean;
  onClose?: () => void;
}

function CalendarModal({ isVisible }: Props) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Calendar />
        </View>
      </View>
    </Modal>
  );
}

export default CalendarModal;

const styles = StyleSheet.create({
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

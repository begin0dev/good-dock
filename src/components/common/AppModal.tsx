import { ReactNode } from "react";
import Modal from "react-native-modal";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { IcClose } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";

interface Props {
  isVisible: boolean;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

function AppModal({ isVisible, onClose, contentStyle, children }: Props) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose} backdropOpacity={0.4}>
      <View style={styles.wrapper}>
        <View style={styles.closeBtnWrapper}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <IcClose color={themeColors.SECONDARY_BACKGROUND} />
          </TouchableOpacity>
        </View>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
}

export default AppModal;

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
    paddingVertical: 12,
    paddingHorizontal: 7,
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    borderRadius: 20,
  },
});

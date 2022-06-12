import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { CustomText } from "../index";
import { ToastItemInterface } from "./types";
import { useMount } from "../../../hooks";

interface Props {
  toast: ToastItemInterface;
  backgroundColor: string;
  animationDuration: number;
}

function ToastItem({ toast, animationDuration, backgroundColor }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.8));
  const fadeAnim = useRef(new Animated.Value(0));

  useMount(() => {
    Animated.parallel([
      Animated.timing(scaleAnim.current, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim.current, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  });

  useEffect(() => {
    if (toast.visible) return;

    Animated.parallel([
      Animated.timing(scaleAnim.current, {
        toValue: 0.8,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim.current, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationDuration, toast.visible]);

  return (
    <Animated.View
      style={[
        styles.toastItem,
        { backgroundColor, opacity: fadeAnim.current, transform: [{ scale: scaleAnim.current }] },
      ]}>
      <CustomText>{toast.message}</CustomText>
    </Animated.View>
  );
}

export default ToastItem;

const styles = StyleSheet.create({
  toastItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 50,
    marginBottom: 12,
    borderRadius: 24,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

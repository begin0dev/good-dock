import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useUnMount } from "../../../hooks";
import { ToastAction, PositionType, ToastCallbackType, ToastItemInterface } from "./types";
import ToastEventEmitter from "./ToastEventEmitter";
import ToastItem from "./ToastItem";

interface Props {
  animationDuration?: number;
  backgroundColor?: string;
  maxCount?: number;
  position?: PositionType;
}

export function Toast({
  animationDuration = 150,
  backgroundColor = "white",
  maxCount = 10,
  position = "top",
}: Props) {
  const timers = useRef<Record<string, NodeJS.Timer>>({});

  const [toasts, setToasts] = useState<ToastItemInterface[]>([]);

  const remove = useCallback(
    (id: string) => {
      setToasts((prevState) => prevState.filter((notification) => notification.id !== id));
      delete timers.current[id];
    },
    [setToasts],
  );

  const update = useCallback(
    (id: string) => {
      setToasts((prevState) =>
        prevState.map((notification) =>
          notification.id === id ? { ...notification, visible: false } : notification,
        ),
      );
      if (timers.current[id]) clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => remove(id), animationDuration);
    },
    [animationDuration, remove],
  );

  const addToast = useCallback(
    (toast: ToastItemInterface) => {
      setToasts((prevState) => [...prevState, toast].slice(maxCount * -1));
      if (toast.isAutoClose) {
        timers.current[toast.id] = setTimeout(() => update(toast.id), toast.autoCloseTime);
      }
    },
    [maxCount, update],
  );

  const eventCallback: ToastCallbackType = useCallback(
    (toast) => {
      if (toast.action === ToastAction.ADD) addToast(toast as ToastItemInterface);
      if (toast.action === ToastAction.REMOVE) update(toast.id);
    },
    [addToast, update],
  );

  useEffect(() => {
    ToastEventEmitter.addChangeListener(eventCallback);
    return () => {
      ToastEventEmitter.removeChangeListener();
    };
  }, [eventCallback]);

  useUnMount(() => {
    Object.values(timers.current).forEach((timer) => {
      if (timer) clearTimeout(timer);
    });
  });

  return (
    <View style={[styles.container, styles[position]]}>
      {toasts.map((toast) => (
        <ToastItem
          toast={toast}
          animationDuration={animationDuration}
          backgroundColor={backgroundColor}
          key={toast.id}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10000,
    position: "absolute",
    left: 0,
    right: 0,
  },
  top: {
    top: 60,
  },
  bottom: {
    bottom: 60,
  },
  toastItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
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

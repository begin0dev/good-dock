import { DeviceEventEmitter } from "react-native";

import { ToastAddType, ToastCallbackType, ToastAction } from "./types";
import { generateID } from "../../../hooks";

class ToastEventEmitter {
  private readonly CHANGE_EVENT_NAME = "toast_change" as const;

  addChangeListener(callback: ToastCallbackType) {
    DeviceEventEmitter.addListener(this.CHANGE_EVENT_NAME, callback);
  }

  removeChangeListener() {
    DeviceEventEmitter.removeAllListeners(this.CHANGE_EVENT_NAME);
  }

  add({ message, autoCloseTime, isAutoClose }: ToastAddType) {
    DeviceEventEmitter.emit(this.CHANGE_EVENT_NAME, {
      id: generateID("toast-message-"),
      action: ToastAction.ADD,
      autoCloseTime: autoCloseTime ?? 3000,
      isAutoClose: isAutoClose ?? true,
      visible: true,
      message,
    });
  }

  remove(id: string) {
    DeviceEventEmitter.emit(this.CHANGE_EVENT_NAME, {
      id,
      action: ToastAction.REMOVE,
    });
  }
}

export default new ToastEventEmitter();

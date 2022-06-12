import { useCallback } from "react";

import { ToastAddType } from "./types";
import ToastEventEmitter from "./ToastEventEmitter";

export function useToast() {
  const addToast = useCallback((toast: ToastAddType) => {
    ToastEventEmitter.add(toast);
  }, []);

  const removeToast = useCallback((id: string) => {
    ToastEventEmitter.remove(id);
  }, []);

  return {
    addToast,
    removeToast,
  };
}

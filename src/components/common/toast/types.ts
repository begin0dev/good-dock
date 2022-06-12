import { ValueOf } from "../../../types/utils";

export type PositionType = "top" | "bottom";

export const ToastAction = {
  ADD: "add",
  REMOVE: "remove",
} as const;
type ToastActionType = ValueOf<typeof ToastAction>;

export interface ToastItemInterface {
  id: string;
  action: ToastActionType;
  message: string;
  visible: boolean;
  autoCloseTime: number;
  isAutoClose: boolean;
}

export type ToastAddType = Pick<ToastItemInterface, "message"> &
  Partial<Pick<ToastItemInterface, "autoCloseTime" | "isAutoClose">>;

export type ToastCallbackType = (
  toast: Pick<ToastItemInterface, "id" | "action"> | ToastItemInterface,
) => void;

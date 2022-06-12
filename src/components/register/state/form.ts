import { atom } from "recoil";

export interface RegisterFormState {
  type: "subscribe" | "fixed";
  name: string | undefined;
  imageUrl: string | undefined;
  price: number | undefined;
  startDate: Date | undefined;
  period: number | undefined;
  unit: "day" | "week" | "month" | "year" | undefined;
  memo: string | undefined;
}

export const registerFormState = atom<RegisterFormState>({
  key: "registerFormState",
  default: {
    type: "subscribe",
    name: undefined,
    imageUrl: undefined,
    price: undefined,
    startDate: undefined,
    period: undefined,
    unit: undefined,
    memo: undefined,
  },
});

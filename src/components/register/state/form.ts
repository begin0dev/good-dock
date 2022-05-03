import { atom } from "recoil";

interface RegisterFormState {
  type: "subscribe" | "fixed";
  name: string;
  imageUrl: string | undefined;
  price: number | null;
  startDate: Date | null;
  period: number | null;
  unit: "day" | "week" | "month" | "year" | null;
  memo: string | null;
}

export const registerFormState = atom<RegisterFormState>({
  key: "registerFormState",
  default: {
    type: "subscribe",
    name: "",
    imageUrl: undefined,
    price: null,
    startDate: null,
    period: null,
    unit: null,
    memo: null,
  },
});

import { atom } from "recoil";

interface RegisterFormState {
  type: "subscribe" | "fixed";
  name: string;
  price: number | null;
}

export const registerFormState = atom<RegisterFormState>({
  key: "registerFormState",
  default: {
    type: "subscribe",
    name: "",
    price: null,
  },
});

import { atom } from "recoil";

interface RegisterFormState {
  type: "subscribe" | "fixed";
  name: string;
  imageUrl: string | undefined;
  price: number | null;
  startDate: Date | null;
}

export const registerFormState = atom<RegisterFormState>({
  key: "registerFormState",
  default: {
    type: "subscribe",
    name: "",
    imageUrl: undefined,
    price: null,
    startDate: null,
  },
});

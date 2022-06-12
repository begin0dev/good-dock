import { atom } from "recoil";
import { PostUserSubscribeParams } from "../../../services/subscribes";

export const registerFormState = atom<Partial<PostUserSubscribeParams>>({
  key: "registerFormState",
  default: {
    type: "subscribe",
    ko: undefined,
    imageUrl: undefined,
    startDate: undefined,
    price: undefined,
    period: undefined,
    unit: undefined,
    memo: undefined,
  },
});

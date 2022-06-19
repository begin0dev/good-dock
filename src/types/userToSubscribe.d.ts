import { Dayjs } from "dayjs";

export type UserSubscribeType = "subscribe" | "fixed";

export interface UserSubscribe {
  _id: string;
  type: UserSubscribeType;
  ko: string;
  imageUrl?: string;
  startDate: Dayjs | Date;
  endDate?: Dayjs | Date;
  price: number;
  period: number;
  unit: "week" | "month" | "year";
  memo?: string;
}

import { apiClient } from "./apiClient";
import { BaseJsendResponse, InfinityParams } from "../types/base";
import { Subscribe } from "../types/subsribe";

interface SubscribeParams extends InfinityParams {
  keyword?: string;
}

export interface PostUserSubscribeParams {
  type: "subscribe" | "fixed";
  ko: string;
  imageUrl?: string;
  startDate: Date;
  price: number;
  period: number;
  unit: "day" | "week" | "month" | "year";
  memo?: string;
}

export const getSubscribesApi = (searchParams: SubscribeParams) =>
  apiClient.get("subscribes/search", { searchParams }).json<BaseJsendResponse<Subscribe[]>>();

export const postUserSubscribeApi = (json: PostUserSubscribeParams) =>
  apiClient.post("user_to_subscribes", { json });

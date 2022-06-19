import { apiClient } from "./apiClient";
import { BaseJsendResponse, InfinityParams } from "../types/base";
import { Subscribe } from "../types/subsribe";
import { UserSubscribe, UserSubscribeType } from "../types/userToSubscribe";

interface SubscribeParams extends InfinityParams {
  keyword?: string;
}

export interface GetUserMonthSubscribesApiParams {
  type: UserSubscribeType;
  date: Date;
}

export interface PostUserSubscribeParams extends Omit<UserSubscribe, "_id" | "endDate"> {}

export const getSubscribesApi = (searchParams: SubscribeParams) =>
  apiClient.get("subscribes/search", { searchParams }).json<BaseJsendResponse<Subscribe[]>>();

export const getUserMonthSubscribesApi = (searchParams: GetUserMonthSubscribesApiParams) =>
  apiClient.get("user_to_subscribes", { searchParams }).json<BaseJsendResponse<UserSubscribe[]>>();

export const postUserSubscribeApi = (json: PostUserSubscribeParams) =>
  apiClient.post("user_to_subscribes", { json });

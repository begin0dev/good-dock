import { apiClient } from "./apiClient";
import { BaseJsendResponse, InfinityParams } from "../types/base";
import { Subscribe } from "../types/subsribe";

interface SubscribeParams extends InfinityParams {
  keyword?: string;
}

export const getSubscribesApi = (searchParams: SubscribeParams) =>
  apiClient.get("subscribes/search", { searchParams }).json<BaseJsendResponse<Subscribe[]>>();

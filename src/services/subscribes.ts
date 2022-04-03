import qs from "qs";

import { apiClient } from "./apiClient";
import { BaseJsendResponse, InfinityParams } from "../types/base";
import { Subsribe } from "../types/subsribe";

interface SubscribeParams extends InfinityParams {
  keyword?: string;
}

export const getSubscribesApi = (searchParams: SubscribeParams) =>
  apiClient
    .get("subscribes/search", { searchParams: qs.stringify(searchParams) })
    .json<BaseJsendResponse<Subsribe[]>>();

import { apiClient } from "./apiClient";
import { BaseJsendResponse } from "../types/base";

interface LoginBody {
  provider: string;
  accessToken: string;
}

export const loginApi = (json: LoginBody) =>
  apiClient
    .post("socials", { json })
    .json<BaseJsendResponse<User, { accessToken: string; refreshToken: string }>>();

export const getAccessTokenApi = (refreshToken: string) =>
  apiClient
    .get("auth/access_token", { headers: { refresh_token: refreshToken } })
    .json<BaseJsendResponse<{}, { accessToken: string }>>();

export const getMeApi = () => apiClient.get("auth/me").json<BaseJsendResponse<User, {}>>();

import ky from "ky";
import qs from "qs";
import { Input, Options } from "ky/distribution/types/options";

import { SERVER_URL } from "../config";
import { getAccessTokenApi } from "./auth";
import TokenManager from "../helpers/token-manager";

let pendingRefreshToken: boolean = false;

const apiInstance = ky.create({
  prefixUrl: SERVER_URL,
  timeout: 10 * 1000,
  hooks: {
    beforeRequest: [
      async (req) => {
        const accessToken = await TokenManager.getAccessToken();
        if (accessToken) {
          req.headers.set("Authorization", `Bearer ${accessToken}`);
          return;
        }
        const refreshToken = await TokenManager.getRefreshToken();
        if (!refreshToken || pendingRefreshToken) return;

        try {
          pendingRefreshToken = true;
          const { data } = await getAccessTokenApi(refreshToken);
          await TokenManager.setAccessToken(data.meta.accessToken);
        } finally {
          pendingRefreshToken = false;
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status !== 401) return;
        const accessToken = await TokenManager.getAccessToken();
        if (pendingRefreshToken || accessToken) return ky(request);
      },
    ],
  },
});

interface CustomOptions extends Options {
  searchParams?: Record<string, any>;
}

const changeOptions = (options?: CustomOptions): Options | undefined =>
  options?.searchParams
    ? { ...options, searchParams: qs.stringify(options?.searchParams) }
    : options;

const apiClient = {
  get: (url: Input, options?: CustomOptions) => apiInstance.get(url, changeOptions(options)),
  post: (url: Input, options?: CustomOptions) => apiInstance.post(url, changeOptions(options)),
  put: (url: Input, options?: CustomOptions) => apiInstance.put(url, changeOptions(options)),
  delete: (url: Input, options?: CustomOptions) => apiInstance.delete(url, changeOptions(options)),
  patch: (url: Input, options?: CustomOptions) => apiInstance.patch(url, changeOptions(options)),
  head: (url: Input, options?: CustomOptions) => apiInstance.patch(url, changeOptions(options)),
};

export { apiClient };

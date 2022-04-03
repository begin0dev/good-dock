import ky from "ky";

import TokenManager from "../helpers/token-manager";
import { SERVER_URL } from "../config";
import { getAccessTokenApi } from "./auth";

let pendingRefreshToken: boolean = false;

const apiClient = ky.create({
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

export { apiClient };

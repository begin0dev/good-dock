import EncryptedStorage from "react-native-encrypted-storage";
import jwtDecode from "jwt-decode";

import { JWT } from "../types/base";

class TokenManager {
  private readonly ACCESS_TOKEN_KEY = "access_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";

  async setAccessToken(accessToken: string) {
    const decode = jwtDecode<JWT>(accessToken);
    await EncryptedStorage.setItem(
      this.ACCESS_TOKEN_KEY,
      JSON.stringify({ accessToken, exp: decode.exp * 1000 }),
    );
  }

  async setRefreshToken(refreshToken: string) {
    await EncryptedStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  async getAccessToken() {
    const access = await EncryptedStorage.getItem(this.ACCESS_TOKEN_KEY);
    if (!access) return null;
    const { accessToken, exp } = JSON.parse(access) as { accessToken: string; exp: number };
    if (exp < new Date().getTime()) return null;
    return accessToken;
  }

  async getRefreshToken() {
    return EncryptedStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  async clear() {
    await EncryptedStorage.clear();
  }
}

export default new TokenManager();

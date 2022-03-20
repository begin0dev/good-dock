import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { authState } from "../../atoms/auth";
import { getMeApi } from "../../services/auth";
import TokenManager from "../../helpers/token-manager";

function useUser() {
  const [{ isLoggedIn }, setAuthState] = useRecoilState(authState);

  const { data: user } = useQuery(["getMeApi"], () => getMeApi().then((res) => res.data.payload), {
    enabled: isLoggedIn,
    async onError() {
      setAuthState({ isLoggedIn: false });
      await TokenManager.clear();
    },
  });

  return { user };
}

export default useUser;

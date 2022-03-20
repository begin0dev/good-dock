import { useRecoilState } from "recoil";
import SplashScreen from "react-native-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";
import LoginPage from "../pages/LoginPage";
import useMount from "../hooks/useMount";
import TokenManager from "../helpers/token-manager";
import { authState } from "../atoms/auth";

const Stack = createNativeStackNavigator();

function InitNavigation() {
  const [{ isLoggedIn }, setAuthState] = useRecoilState(authState);

  useMount(async () => {
    const refreshToken = await TokenManager.getRefreshToken();
    setAuthState({ isLoggedIn: !!refreshToken });
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn && <Stack.Screen name="loginScreen" component={LoginPage} />}
      {isLoggedIn && <Stack.Screen name="AppScreen" component={AppNavigation} />}
    </Stack.Navigator>
  );
}

export default InitNavigation;

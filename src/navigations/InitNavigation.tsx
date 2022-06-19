import { useRecoilState } from "recoil";
import SplashScreen from "react-native-splash-screen";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useMount } from "../hooks";
import TokenManager from "../helpers/token-manager";
import { authState } from "../atoms/auth";
import { themeColors } from "../styles/colors";
import { BackButton } from "../components/common";
import SearchList from "../components/register/SearchList";
import CloseButton from "../components/common/CloseButton";
import { useMonthSubscribes } from "../hooks/queries/useMonthSubscribes";

export type InitNavigation = {
  LoginScreen: undefined;
  AppScreen: undefined;
  RegisterScreen: { type: "subscribe" | "fixed" };
  SearchListScreen: undefined;
};
const Stack = createNativeStackNavigator<InitNavigation>();

const headerOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerShadowVisible: false,
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: themeColors.TEXT_0,
  },
  headerStyle: {
    backgroundColor: themeColors.BACKGROUND,
  },
};

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
      {!isLoggedIn && <Stack.Screen name="LoginScreen" component={LoginPage} />}
      {isLoggedIn && (
        <>
          <Stack.Screen name="AppScreen" component={AppNavigation} />
          <Stack.Group screenOptions={{ headerLeft: BackButton, ...headerOptions }}>
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterPage}
              options={{ title: "정기 결제 등록" }}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              title: "",
              presentation: "modal",
              headerLeft: CloseButton,
              ...headerOptions,
            }}>
            <Stack.Screen name="SearchListScreen" component={SearchList} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}

export default InitNavigation;

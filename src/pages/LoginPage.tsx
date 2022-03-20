import { Image, Text, View, StyleSheet, TouchableNativeFeedback, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import KakaoSDK from "@actbase/react-kakaosdk";

import TokenManager from "../helpers/token-manager";
import { IcKakao } from "../assets/svgs";
import { KAKAO_NATIVE_APP_KEY } from "../config";
import { loginApi } from "../services/auth";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/auth";
import CustomText from "../components/common/CustomText";

function LoginPage() {
  const setAuthState = useSetRecoilState(authState);

  const onClickKakao = async () => {
    try {
      await KakaoSDK.init(KAKAO_NATIVE_APP_KEY);
      const tokens = await KakaoSDK.login();
      const { data } = await loginApi({ provider: "kakao", accessToken: tokens!.access_token });
      await TokenManager.setAccessToken(data.meta.accessToken);
      await TokenManager.setRefreshToken(data.meta.refreshToken);
      setAuthState({ isLoggedIn: true });
    } catch (err) {
      console.error(err);
      Alert.alert("카카오 로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={require("../assets/images/main_logo.png")} />
        <CustomText style={styles.subText}>카카오 계정으로 서비스를 이용해보세요</CustomText>
        <TouchableNativeFeedback onPress={onClickKakao}>
          <View style={styles.kakaoBtn}>
            <IcKakao />
            <Text style={styles.kakaoBtnText}>카카오 로그인</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  image: {
    width: 80,
    height: 140,
    resizeMode: "contain",
    marginBottom: 110,
  },
  subText: {
    fontSize: 12,
    marginBottom: 10,
  },
  kakaoBtn: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    padding: 14,
    paddingRight: 14 + 18,
    backgroundColor: "#FEE500",
    borderRadius: 6,
  },
  kakaoBtnText: {
    width: "100%",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },
});

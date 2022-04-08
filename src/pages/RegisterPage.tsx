import { StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InitNavigation } from "../navigations/InitNavigation";
import { themeColors } from "../styles/colors";
import { AppButton, AppTextInput, CustomText, Radio } from "../components/common";
import { NavigationProps } from "../navigations/types";
import Form from "../components/register/Form";

function RegisterPage() {
  const navigation = useNavigation<NavigationProps>();
  const { params } = useRoute<RouteProp<InitNavigation, "RegisterScreen">>();

  return (
    <SafeAreaView style={styles.container}>
      <Form label="카테고리 선택">
        <Radio
          defaultValue={params.type}
          items={[
            { label: "구독", value: "subscribe" },
            { label: "고정 생활비", value: "fixed" },
          ]}
        />
      </Form>
      <Form label="정기 결제명">
        <AppTextInput
          placeholder="정기 결제 중인 항목의 이름을 입력해주세요."
          onPressIn={() => navigation.push("SearchListScreen")}
          showSoftInputOnFocus={false}
        />
      </Form>
      <Form label="결제 요금">
        <>
          <AppTextInput type="number" placeholder="결제 금액을 입력해주세요." />
          <CustomText fontSize={12} style={styles.suffixText}>
            원 (KRW)
          </CustomText>
        </>
      </Form>
      <Form label="결제 시작일">
        <AppTextInput placeholder="결제를 시작한 날짜를 입력해주세요." editable={false} />
      </Form>
      <Form label="메모">
        <AppTextInput placeholder="결제방법, 카드 등 필요하다면 메모해보세요." />
      </Form>
      <AppButton onPress={() => {}} disabled>
        완료
      </AppButton>
    </SafeAreaView>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    minHeight: "100%",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  suffixText: {
    padding: 6,
    marginLeft: 6,
  },
});

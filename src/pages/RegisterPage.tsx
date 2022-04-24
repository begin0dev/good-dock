import { useState } from "react";
import { useRecoilState } from "recoil";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";

import { NavigationProps } from "../navigations/types";
import { InitNavigation } from "../navigations/InitNavigation";
import { themeColors } from "../styles/colors";
import {
  AppButton,
  AppTextInput,
  AppNumberInput,
  CustomText,
  Divider,
  Radio,
  AppModal,
  Calendar,
  Select,
} from "../components/common";
import { registerFormState } from "../components/register/state/form";
import Form from "../components/register/Form";

function RegisterPage() {
  const navigation = useNavigation<NavigationProps>();
  const { params } = useRoute<RouteProp<InitNavigation, "RegisterScreen">>();

  const [formState, setFormState] = useRecoilState(registerFormState);
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangePrice = (price: number) => {
    setFormState((prevState) => ({ ...prevState, price }));
  };

  const onPressDate = (startDate: Date) => {
    setFormState((prevState) => ({ ...prevState, startDate }));
    setShowCalendar(false);
  };

  return (
    <>
      <AppModal
        isVisible={showCalendar}
        onClose={() => setShowCalendar(false)}
        contentStyle={styles.calendar}>
        <Calendar defaultDate={formState.startDate} onPressDate={onPressDate} />
      </AppModal>
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
            value={formState.name}
            onPressIn={() => navigation.push("SearchListScreen")}
            showSoftInputOnFocus={false}
          />
        </Form>
        <Form label="결제 요금">
          <>
            <AppNumberInput
              withFormat
              placeholder="결제 금액을 입력해주세요."
              onChangeNumber={onChangePrice}
            />
            <CustomText fontSize={12} style={styles.suffixText}>
              원 (KRW)
            </CustomText>
          </>
        </Form>
        <Form label="결제 시작일">
          <AppTextInput
            placeholder="결제를 시작한 날짜를 입력해주세요."
            value={formState.startDate ? format(formState.startDate, "yyyy년 M월 dd일") : ""}
            onPressIn={() => setShowCalendar(true)}
            showSoftInputOnFocus={false}
          />
        </Form>
        <Form label="결제 갱신 주기">
          <AppNumberInput placeholder="주기" />
          <Select placeholder="단위" />
          <CustomText fontSize={12} style={styles.suffixText}>
            마다 정기 결제가 갱신됩니다.
          </CustomText>
        </Form>
        <Divider style={styles.space} />
        <Form label="메모">
          <AppTextInput placeholder="결제방법, 카드 등 필요하다면 메모해보세요." />
        </Form>
        <AppButton onPress={() => {}} disabled>
          완료
        </AppButton>
      </SafeAreaView>
    </>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.BACKGROUND,
    minHeight: "100%",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  suffixText: {
    padding: 6,
    marginLeft: 6,
  },
  space: {
    marginBottom: 15,
  },
  calendar: {
    width: 332,
  },
});

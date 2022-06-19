import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

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
import { useMount, useSendApi } from "../hooks";
import { useToast } from "../components/common/toast";
import { formValidatorSchema } from "../components/register/state/form.validator";
import { postUserSubscribeApi, PostUserSubscribeParams } from "../services/subscribes";
import Form from "../components/register/Form";

const PERIOD_ITEMS = [
  { label: "주", value: "week" },
  { label: "개월", value: "month" },
  { label: "년", value: "year" },
];

const RADIO_ITEMS: { label: string; value: "subscribe" | "fixed" }[] = [
  { label: "구독", value: "subscribe" },
  { label: "고정 생활비", value: "fixed" },
];

function RegisterPage() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProps>();
  const { params } = useRoute<RouteProp<InitNavigation, "RegisterScreen">>();

  const [formState, setFormState] = useRecoilState(registerFormState);
  const resetFormState = useResetRecoilState(registerFormState);

  const [isValid, setIsValid] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const { addToast } = useToast();
  const [isLoading, submit] = useSendApi(async () => {
    if (!isValid) return;
    try {
      await postUserSubscribeApi(formState as PostUserSubscribeParams);
      await queryClient.invalidateQueries([
        "getUserMonthSubscribesApi",
        formState.type,
        dayjs(formState.startDate).startOf("M").toString(),
      ]);
      addToast({ message: "등록되었습니다." });
      resetFormState();
      navigation.goBack();
    } catch (err) {
      addToast({ message: `등록에 실패하였습니다. 다시 시도해주세요 (${err})` });
    }
  });

  const onPressDate = (startDate: Dayjs) => {
    setFormState((prevState) => ({ ...prevState, startDate }));
    setShowCalendar(false);
  };

  const onPressPeriod = (unit: "week" | "month" | "year") => {
    setFormState((prevState) => ({ ...prevState, unit }));
  };

  useMount(() => {
    setFormState({ type: params.type });
  });

  useEffect(() => {
    formValidatorSchema
      .validate(formState)
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [formState]);

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
            items={RADIO_ITEMS}
            onPress={(type) => setFormState((prevState) => ({ ...prevState, type }))}
          />
        </Form>
        <Form label="정기 결제명">
          <AppTextInput
            placeholder="정기 결제 중인 항목의 이름을 입력해주세요."
            value={formState.ko}
            onPressIn={() => navigation.push("SearchListScreen")}
            showSoftInputOnFocus={false}
          />
        </Form>
        <Form label="결제 요금">
          <>
            <AppNumberInput
              withFormat
              placeholder="결제 금액을 입력해주세요."
              onChangeNumber={(price: number) =>
                setFormState((prevState) => ({ ...prevState, price }))
              }
            />
            <CustomText fontSize={12} style={styles.suffixText}>
              원 (KRW)
            </CustomText>
          </>
        </Form>
        <Form label="결제 시작일">
          <AppTextInput
            placeholder="결제를 시작한 날짜를 입력해주세요."
            value={formState.startDate ? dayjs(formState.startDate).format("YYYY년 MM월 DD일") : ""}
            onPressIn={() => setShowCalendar(true)}
            showSoftInputOnFocus={false}
          />
        </Form>
        <Form label="결제 갱신 주기">
          <AppNumberInput
            placeholder="주기"
            style={styles.itemSpace}
            onChangeNumber={(period) => setFormState((prevState) => ({ ...prevState, period }))}
          />
          <Select
            placeholder="단위"
            value={formState.unit}
            items={PERIOD_ITEMS}
            onPressItem={onPressPeriod}
          />
          <CustomText fontSize={12} style={styles.suffixText}>
            마다 정기 결제가 갱신됩니다.
          </CustomText>
        </Form>
        <Divider style={styles.divider} />
        <Form label="메모">
          <AppTextInput
            placeholder="결제방법, 카드 등 필요하다면 메모해보세요."
            onChangeText={(memo) => setFormState((prevState) => ({ ...prevState, memo }))}
          />
        </Form>
        <AppButton onPress={submit} disabled={isLoading || !isValid}>
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
  divider: {
    marginBottom: 15,
  },
  itemSpace: {
    marginRight: 6,
  },
  calendar: {
    width: 332,
  },
});

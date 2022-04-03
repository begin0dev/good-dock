import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useUser from "../hooks/queries/useUser";
import ListCard from "../components/home/ListCard";
import { numberWithCommas } from "../helpers/number";
import { themeColors } from "../styles/colors";
import { CustomText } from "../components/common";

function HomePage() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <CustomText fontSize={24} fontWeight="bold" style={styles.nameText}>
        {user?.displayName || "방문자"}님
      </CustomText>
      <View style={styles.card}>
        <CustomText>이번 달 고정 지출</CustomText>
        <CustomText fontSize={28} fontWeight="bold" color={themeColors.PRIMARY}>
          {numberWithCommas(1000)}원
        </CustomText>
      </View>
      <View style={styles.card}>
        <ListCard title="구독 목록 보기" registerType="subscribe" />
      </View>
      <View style={styles.card}>
        <ListCard title="고정 생활비 목록 보기" registerType="fixed" />
      </View>
    </SafeAreaView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 45,
    height: "100%",
    backgroundColor: themeColors.BACKGROUND,
  },
  nameText: {
    marginBottom: 14,
  },
  card: {
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 19,
    paddingHorizontal: 22,
    marginBottom: 14,
    minHeight: 100,
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
  },
});

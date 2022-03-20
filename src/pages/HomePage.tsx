import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useUser from "../hooks/queries/useUser";
import useColor from "../hooks/useColor";
import CustomText from "../components/common/CustomText";
import ListCard from "../components/home/ListCard";
import { numberWithCommas } from "../helpers/number";

function HomePage() {
  const colors = useColor();
  const { user } = useUser();

  const cardStyle = {
    ...styles.card,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.BACKGROUND, ...styles.container }}>
      <CustomText fontSize={24} fontWeight="bold" style={styles.nameText}>
        {user?.displayName || "-"}님
      </CustomText>
      <View style={cardStyle}>
        <CustomText>이번 달 고정 지출</CustomText>
        <CustomText fontSize={28} fontWeight="bold" color={colors.PRIMARY}>
          {numberWithCommas(1000)}원
        </CustomText>
      </View>
      <View style={cardStyle}>
        <ListCard title="구독 목록 보기" />
      </View>
      <View style={cardStyle}>
        <ListCard title="고정 생활비 목록 보기" />
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
  },
});

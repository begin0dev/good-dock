import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useUser from "../hooks/queries/useUser";
import useColor from "../hooks/useColor";
import CustomText from "../components/common/CustomText";

function HomePage() {
  const colors = useColor();
  const { user } = useUser();

  const cardStyle = {
    ...styles.card,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.BACKGROUND, ...styles.container }}>
      <CustomText style={styles.nameText}>{user?.displayName}님</CustomText>
      <View style={cardStyle}>
        <CustomText style={styles.cardHeader}>이번 달 고정 지출</CustomText>
        <CustomText color={colors.PRIMARY} style={styles.priceText}>
          0원
        </CustomText>
      </View>
      <View style={cardStyle}>
        <CustomText style={styles.cardHeader}>구독 목록 보기</CustomText>
      </View>
      <View style={cardStyle}>
        <CustomText style={styles.cardHeader}>고정 생활비 목록 보기</CustomText>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 27,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  cardHeader: {
    fontSize: 14,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

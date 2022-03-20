import { View } from "react-native";

import { styles } from "./styles";
import { IcChevronRight, IcDotsHorizontal, IcPlus } from "../../assets/svgs";
import CustomText from "../common/CustomText";
import useColor from "../../hooks/useColor";
import { numberWithCommas } from "../../helpers/number";

interface Props {
  title: string;
}

function ListCard({ title }: Props) {
  const colors = useColor();

  return (
    <>
      <View style={styles.cardHeaderWrapper}>
        <CustomText>{title}</CustomText>
        <IcChevronRight color={colors.TEXT_0} />
      </View>
      <View style={styles.cardBodyWrapper}>
        <View style={[styles.listItem, { backgroundColor: colors.BACKGROUND }]}>
          <IcPlus color={colors.TEXT_1} />
        </View>
        <View style={[styles.listItem, { backgroundColor: colors.BACKGROUND }]} />
        <View style={[styles.listItem, { backgroundColor: colors.BACKGROUND }]}>
          <IcDotsHorizontal color={colors.TEXT_1} />
        </View>
      </View>
      <View style={styles.cardSummary}>
        <CustomText style={styles.summaryLabel}>이번달 구독료</CustomText>
        <CustomText fontWeight="semiBold" color={colors.PRIMARY}>
          {numberWithCommas(1000)}원
        </CustomText>
      </View>
    </>
  );
}

export default ListCard;

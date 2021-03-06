import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";
import { IcChevronRight, IcDotsHorizontal, IcPlus, IcWallet } from "../../assets/svgs";
import { numberWithCommas } from "../../helpers/number";
import { NavigationProps } from "../../navigations/types";
import { themeColors } from "../../styles/colors";
import CustomText from "../common/CustomText";
import { UserSubscribe } from "../../types/userToSubscribe";
import FastImage from "react-native-fast-image";

interface Props {
  title: string;
  registerType: "subscribe" | "fixed";
  price?: number;
  items?: UserSubscribe[];
}

function ListCard({ title, registerType, items = [], price = 0 }: Props) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <View style={styles.cardHeaderWrapper}>
        <CustomText>{title}</CustomText>
        <View style={styles.detailIcon}>
          <IcChevronRight color={themeColors.TEXT_0} />
        </View>
      </View>
      <View style={styles.cardBodyWrapper}>
        {items.slice(0, 4).map((item) => (
          <View style={styles.listItem} key={item._id}>
            {item.imageUrl ? (
              <FastImage source={{ uri: item.imageUrl }} style={styles.itemImage} />
            ) : (
              <IcWallet color={themeColors.BACKGROUND} />
            )}
          </View>
        ))}
        {items.length <= 4 ? (
          <TouchableWithoutFeedback
            onPress={() => navigation.push("RegisterScreen", { type: registerType })}>
            <View style={styles.listItem}>
              <IcPlus color={themeColors.TEXT_1} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.listItem}>
            <IcDotsHorizontal color={themeColors.TEXT_1} />
          </View>
        )}
      </View>
      <View style={styles.cardSummary}>
        <CustomText style={styles.summaryLabel}>이번달 구독료</CustomText>
        <CustomText fontWeight="medium" color={themeColors.PRIMARY}>
          {numberWithCommas(price)}원
        </CustomText>
      </View>
    </>
  );
}

export default ListCard;

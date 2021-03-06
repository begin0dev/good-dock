import { StyleSheet } from "react-native";
import { themeColors } from "../../styles/colors";

const ITEM_SIZE = 40;

export const styles = StyleSheet.create({
  cardHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  detailIcon: {
    width: 24,
    height: 24,
    padding: 6,
  },
  cardBodyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: themeColors.SECONDARY_BACKGROUND,
    overflow: "hidden",
  },
  itemImage: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 20,
  },
  cardSummary: {
    flexDirection: "row",
    paddingTop: 10,
  },
  summaryLabel: {
    paddingRight: 12,
  },
  summaryText: {
    fontSize: 14,
  },
});

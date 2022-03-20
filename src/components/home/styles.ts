import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardBodyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    overflow: "hidden",
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

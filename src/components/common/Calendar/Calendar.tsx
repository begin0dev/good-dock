import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableNativeFeedback, View } from "react-native";
import { add, format, getDate, getMonth, startOfMonth, sub } from "date-fns";

import CustomText from "../CustomText";
import { themeColors } from "../../../styles/colors";
import { IcChevronLeft, IcChevronRight } from "../../../assets/svgs";
import { getMonthDays } from "./utils";
import { sx } from "../../../helpers/utils";

const dayOfWeeks = [
  { text: "일", color: themeColors.CALENDAR_SUNDAY },
  { text: "월", color: themeColors.CALENDAR_WEEKDAY },
  { text: "화", color: themeColors.CALENDAR_WEEKDAY },
  { text: "수", color: themeColors.CALENDAR_WEEKDAY },
  { text: "목", color: themeColors.CALENDAR_WEEKDAY },
  { text: "금", color: themeColors.CALENDAR_WEEKDAY },
  { text: "토", color: themeColors.CALENDAR_SATURDAY },
];

interface Props {
  defaultDate?: Date | null | undefined;
  onPressDate?: (date: Date) => void;
}

function Calendar({ defaultDate, onPressDate }: Props) {
  const [monthDate, setMonthDate] = useState<Date>(startOfMonth(defaultDate || new Date()));

  const currentMonth = getMonth(monthDate);

  useEffect(() => {
    if (defaultDate) setMonthDate(startOfMonth(defaultDate));
  }, [defaultDate]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <CustomText color={themeColors.TEXT_HEADER} fontSize={18} fontWeight="semiBold">
          {format(monthDate, "yyyy년 MM월")}
        </CustomText>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={[styles.headerIconBtn, styles.headerIconSpace]}
            onPress={() => setMonthDate(startOfMonth(sub(monthDate, { months: 1 })))}>
            <IcChevronLeft height={16} width={7} color={themeColors.TEXT_1} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => setMonthDate(startOfMonth(add(monthDate, { months: 1 })))}>
            <IcChevronRight height={16} width={7} color={themeColors.TEXT_1} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tableRow}>
        {dayOfWeeks.map((dayOfWeek) => (
          <View key={dayOfWeek.text} style={styles.tableHeaderCell}>
            <CustomText fontSize={12} color={dayOfWeek.color}>
              {dayOfWeek.text}
            </CustomText>
          </View>
        ))}
      </View>
      <View>
        {getMonthDays(monthDate).map((weeks, weekIndex) => (
          <View key={`week_row_${weekIndex}`} style={styles.tableRow}>
            {weeks.map((date, dateIndex) => (
              <TouchableNativeFeedback
                key={`week_${weekIndex}_date_${dateIndex}`}
                onPress={() => onPressDate?.(date)}>
                <View
                  style={sx(styles.tableCell, [
                    styles.outOfMonth,
                    currentMonth !== getMonth(date),
                  ])}>
                  <CustomText fontSize={12} color={dayOfWeeks[dateIndex].color}>
                    {getDate(date)}
                  </CustomText>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    minHeight: 362,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 7,
    marginBottom: 16,
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIconBtn: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconSpace: {
    marginRight: 10,
  },
  tableHeaderCell: {
    flex: 1,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    alignItems: "center",
    height: 44,
  },
  outOfMonth: {
    opacity: 0.3,
  },
});

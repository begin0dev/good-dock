import dayjs, { Dayjs } from "dayjs";
import { StyleProp } from "react-native";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { UserSubscribe } from "../types/userToSubscribe";

dayjs.extend(isSameOrAfter);

export const SIZE_MAPPER = {
  small: 34,
  medium: 40,
  large: 46,
} as const;

export type SizeType = keyof typeof SIZE_MAPPER;

export const sx = (...args: Array<StyleProp<any> | [StyleProp<any>, boolean]>): StyleProp<any> =>
  args.reduce<StyleProp<any>>((acc, cur) => {
    if (Array.isArray(cur)) {
      if (cur[1]) return { ...acc, ...cur[0] };
      return acc;
    }
    return { ...acc, ...(cur as StyleProp<any>) };
  }, {});

interface MonthSubscribes {
  total: number;
  keyOfDay: Record<string, UserSubscribe[]>;
  list: UserSubscribe[];
}

export const getMonthSubscribes = (
  startOfMonth: Dayjs | undefined,
  subscribes: UserSubscribe[] | undefined,
): MonthSubscribes => {
  const result: MonthSubscribes = {
    total: 0,
    keyOfDay: {},
    list: [],
  };

  if (!startOfMonth || !subscribes) return result;
  const endOfMonth = startOfMonth.endOf("month");

  for (const subscribe of subscribes) {
    const { startDate, unit } = subscribe;

    const start = dayjs(startDate);
    const diff = startOfMonth.diff(start, unit);
    let first = start.add(diff, unit);

    while (first.isBefore(endOfMonth)) {
      if (first.isSameOrAfter(startOfMonth)) {
        const key = first.format("YYYY/MM/DD");

        if (!result.keyOfDay[key]) result.keyOfDay[key] = [];
        result.keyOfDay[key].push(subscribe);
        result.total += subscribe.price;
      }

      first = first.add(1, unit);
    }
  }

  result.list = subscribes;
  return result;
};

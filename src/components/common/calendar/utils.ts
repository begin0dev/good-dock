import { addDays, endOfMonth, endOfWeek, getDay, startOfWeek } from "date-fns";

export const getMonthDays = (start: Date | number) => {
  let prev = startOfWeek(start);
  let end = endOfWeek(endOfMonth(start));
  let weekIndex: number = 0;
  const daysGroup: Array<Array<Date>> = [];
  while (prev < end) {
    let monthOfWeek = getDay(prev);
    if (prev === start || monthOfWeek === 0) {
      daysGroup.push(Array(7).fill(null));
    }
    daysGroup[weekIndex][monthOfWeek] = prev;
    if (monthOfWeek === 6) weekIndex += 1;
    prev = addDays(prev, 1);
  }
  return daysGroup;
};

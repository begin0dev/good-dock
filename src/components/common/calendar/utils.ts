import dayjs, { Dayjs } from "dayjs";

export const getMonthDays = (start: Dayjs | number) => {
  let prev = dayjs(start).startOf("w");
  let end = dayjs(start).endOf("M").endOf("w");
  let weekIndex: number = 0;
  const daysGroup: Array<Array<Dayjs>> = [];
  while (prev < end) {
    let monthOfWeek = prev.day().valueOf();
    if (prev === start || monthOfWeek === 0) {
      daysGroup.push(Array(7).fill(null));
    }
    daysGroup[weekIndex][monthOfWeek] = prev;
    if (monthOfWeek === 6) weekIndex += 1;
    prev = prev.add(1, "d");
  }
  return daysGroup;
};

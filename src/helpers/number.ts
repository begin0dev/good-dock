export function numberWithCommas(x: number): string {
  const splitNums = x.toString().split(".");
  splitNums[0] = splitNums[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return splitNums.join(".");
}

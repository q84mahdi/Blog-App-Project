const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbers(n: number | string): string {
  return n.toString().replace(/\d/g, (digit) => farsiDigits[Number(digit)]);
}

function numberWithCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbersWithComma(n: number | string): string {
  return toPersianNumbers(numberWithCommas(n));
}

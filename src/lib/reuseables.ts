import { ROUTE } from "./route";

export function addCommasToNumber(number: number | string) {
  let numberStr: string;
  if (typeof number === 'number') {
    numberStr = number.toString();
  } else if (typeof number === 'string') {
    numberStr = number;
  } else {
    throw new Error('Input must be a number or a string');
  }
  numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numberStr;
}

export const logout = () => {
  window.location.href = ROUTE.login
}

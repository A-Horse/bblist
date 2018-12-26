import { Promise } from "es6-promise";

export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

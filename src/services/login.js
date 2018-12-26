import { AUTH_DATA } from "../constants";
import { Storage } from "services/storage";

export function isLogin() {
  return !!Storage.get(AUTH_DATA);
}

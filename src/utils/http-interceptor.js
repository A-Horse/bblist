import history from "../services/history";
import axios from "axios";
import { removeJWT } from "./auth";
import { AUTH_HEADER_KEY } from "../constant/constants";

export function setupAxiosJwtHeader(jwt) {
  if (!jwt) {
    return;
  }
  axios.defaults.headers.common[AUTH_HEADER_KEY] = `${jwt}`;
}

export function setupAxiosInterceptor() {
  axios.interceptors.response.use(
    responseSuccessInterceptor,
    responseFailureInterceptor
  );
}

export function responseSuccessInterceptor(response) {
  return response;
}

export function responseFailureInterceptor(error) {
  if (error.response.status === 401) {
    removeJWT();
    history.push("/login");
  }
  return Promise.reject(error);
}

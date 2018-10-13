// @flow
import axios from 'axios';

export function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['jwt-token'] = `${jwt}`;
}

export function setupAxiosInterceptor() {
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}

export function responseSuccessInterceptor(response) {
  return response;
}

export function responseFailureInterceptor(error) {
  if (error.response.status === 401) {
    window.localStorage.removeItem('jwt');
    history.push('/login');
  }
  return Promise.reject(error);
}

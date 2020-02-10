import history from '../services/history';
import axios from 'axios';

export function setupAxiosJwtHeader(jwt) {
  axios.defaults.headers.common['jwt-token'] = `${jwt}`;
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
    window.localStorage.removeItem('jwt');
    history.push('/signin');
  }
  return Promise.reject(error);
}

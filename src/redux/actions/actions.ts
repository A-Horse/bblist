import { AxiosResponse } from 'axios';

export interface FSAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}

export interface AxiosSuccessAction extends FSAction {
  payload: AxiosResponse;
  meta: {
    previousAction: FSAction;
  };
}

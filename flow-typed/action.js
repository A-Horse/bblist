// @flow

declare interface ActionAdapter {
  name: string;
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
  FINISH: string;
  request: Function;
  success: Function;
  failure: Function;
  finish: Function;
}

declare type ActionType = 'REQUEST' | 'SUCCESS' | 'FAILURE' | 'FINISH';
declare interface FSAction {
  type: string;
  payload: any;
  meta: any;
  error?: boolean;
}

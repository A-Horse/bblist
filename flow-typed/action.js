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

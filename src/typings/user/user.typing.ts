import { Record } from 'immutable';

export interface AppUserInfo {
  id: string;
  username: string;
  email: string;
}

export type AppUserInfoRecord = Record<AppUserInfo>;

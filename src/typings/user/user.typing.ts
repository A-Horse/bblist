import { Record } from 'immutable';

export interface AppUserInfo {
  id: number;
  username: string;
  email: string;
}

export type AppUserInfoRecord = Record<AppUserInfo>;

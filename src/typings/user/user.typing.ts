import { Record } from 'immutable';

export interface AppUserInfo {
    id: string;
    email: string;
}

export type AppUserInfoRecord = Record<AppUserInfo>;
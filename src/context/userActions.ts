import {User} from '../types';

export enum UserActionTypes {
  LoggedIn,
  LoggedOut,
  Loading,
}

export interface LoggedIn {
  type: UserActionTypes.LoggedIn;
  payload: User;
}

export interface LoggedOut {
  type: UserActionTypes.LoggedOut;
}

export interface Loading {
  type: UserActionTypes.Loading;
  payload: boolean;
}
export type UserActions = LoggedIn | LoggedOut | Loading;

import {User} from '../types';
import {ListItem} from '../types';

export enum UserActionTypes {
  LoggedIn,
  LoggedOut,
  Loading,
  AddItem,
  RemoveItem,
  ClearBasket,
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
export interface AddItem {
  type: UserActionTypes.AddItem;
  payload: ListItem;
}

export interface RemoveItem {
  type: UserActionTypes.RemoveItem;
  payload: ListItem;
}

export interface ClearBasket {
  type: UserActionTypes.ClearBasket;
}

export type UserActions =
  | LoggedIn
  | LoggedOut
  | Loading
  | AddItem
  | RemoveItem
  | ClearBasket;

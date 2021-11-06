import auth from '@react-native-firebase/auth';
import {User, UserState} from '../types';
import {UserActions, UserActionTypes} from './userActions';
import {LoggedIn, LoggedOut, Loading} from './userActions';

export function userReducer(state: UserState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.LoggedIn:
      return {
        ...state,
        loggedin: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
          password: action.payload.password,
        },
      };

    case UserActionTypes.LoggedOut:
      return {
        ...state,
        user: null,
        loggedin: false,
      };

    case UserActionTypes.Loading:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      //console.log('?');
      return state;
  }
}

// helper functions to simplify the caller
// we don't have to declare type while calling the dispatch
export const login = (user: User): LoggedIn => ({
  type: UserActionTypes.LoggedIn,
  payload: user,
});
export const logout = (): LoggedOut => ({
  type: UserActionTypes.LoggedOut,
});
export const setloading = (isLoading: boolean): Loading => ({
  type: UserActionTypes.Loading,
  payload: isLoading,
});

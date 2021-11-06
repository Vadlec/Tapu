import React from 'react';

import {UserState} from '../types';
import {UserActions} from './userActions';

export const initalUserState: UserState = {
  user: null,
  loggedin: false,
  loading: false,
  locale: 'TR',
};

export const UserContext = React.createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserActions>;
}>({
  state: initalUserState,
  dispatch: () => undefined,
});

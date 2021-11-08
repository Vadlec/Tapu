import {ListItem, User, UserState} from '../types';
import {
  UserActions,
  UserActionTypes,
  LoggedIn,
  LoggedOut,
  Loading,
  AddItem,
  RemoveItem,
  ClearBasket,
} from './userActions';

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
          items: [],
          currentItemPrice: 0,
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

    case UserActionTypes.AddItem:
      let newState = {...state};

      newState.user!.items!.push(action.payload);
      let currentPrice = newState.user!.currentItemPrice;
      newState.user!.currentItemPrice =
        parseInt(action.payload.price) + currentPrice;
      return newState;

    case UserActionTypes.RemoveItem:
      let _newState = {...state};
      let _newStateUser = {...state.user!};
      let newItems = [...state.user!.items];

      var index = newItems.findIndex(x => x.id == action.payload.id);

      if (index > -1) {
        newItems.splice(index, 1);
      }

      _newStateUser.items = newItems;

      _newStateUser.currentItemPrice =
        _newStateUser.currentItemPrice! - parseInt(action.payload.price);
      _newState.user = _newStateUser;

      console.log(_newState);
      return _newState;
    case UserActionTypes.ClearBasket:
      let newStateClear = {...state};
      newStateClear.user!.items = [];
      newStateClear.user!.currentItemPrice = 0;
      return newStateClear;
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
export const addItem = (item: ListItem): AddItem => ({
  type: UserActionTypes.AddItem,
  payload: item,
});
export const removeItem = (item: ListItem): RemoveItem => ({
  type: UserActionTypes.RemoveItem,
  payload: item,
});
export const clearBasket = (): ClearBasket => ({
  type: UserActionTypes.ClearBasket,
});

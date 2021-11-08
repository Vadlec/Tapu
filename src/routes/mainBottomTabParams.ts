import {NavigatorScreenParams} from '@react-navigation/native';
import {AccountStackParams} from '.';

export type MainBottomTabParamList = {
  AccountStack: NavigatorScreenParams<AccountStackParams>;
  Basket: undefined;
  List: undefined;
};

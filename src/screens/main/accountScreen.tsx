import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button, Container, Title} from '../../components';
import DisplayText from '../../components/DisplayText';
import {logout, UserContext} from '../../context';
import {
  AccountStackParams,
  MainBottomTabParamList,
  BottomTabNavigationProp,
  CompositeNavigationProp,
  useNavigation,
  NativeStackNavigationProp,
} from '../../routes';

type AccountScreenProp = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParams, 'Account'>,
  BottomTabNavigationProp<MainBottomTabParamList>
>;

function AccountScreen() {
  const {state, dispatch} = useContext(UserContext);

  return (
    <Container justCont="space-between">
      <Title>Account</Title>
      <View style={{flex: 1, width: '100%'}}>
        <Title>{state.user?.name}</Title>
        <DisplayText>E-mail: {state.user?.email}</DisplayText>
        <DisplayText>
          Password: {state.user?.password?.slice(0, -3)}***
        </DisplayText>
        <DisplayText>Current Locale: {state.locale}</DisplayText>
      </View>
      <Button
        text="log out"
        primary={false}
        onpress={() => dispatch(logout())}></Button>
    </Container>
  );
}
export default AccountScreen;

import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../routes';
import LoginScreen from './loginScreen';
import RegisterScreen from './registerScreen';
import AccountScreen from '../main/accountScreen';
import {UserContext} from '../../context';

const AuthStack = createNativeStackNavigator<AccountStackParams>();

function AuthStackNavigator() {
  let {state} = useContext(UserContext);
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {state.user ? (
        <AuthStack.Screen name="Account" component={AccountScreen} />
      ) : (
        <>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;

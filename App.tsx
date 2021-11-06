import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import {initalUserState, UserContext, userReducer} from './src/context';
import {lightTheme} from './src/style/theme';
import AuthStackNavigator from './src/screens/auth';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from './src/routes';
import ListScreen from './src/screens/main/listScreen';
import BasketScreen from './src/screens/main/basketScreen';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, dispatch] = useReducer(userReducer, initalUserState);

  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? undefined : lightTheme.backgroundColor}
        />
        <UserContext.Provider value={{state, dispatch}}>
          <BottomTab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              tabBarHideOnKeyboard: true,

              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}>
            <BottomTab.Screen
              name="List"
              component={ListScreen}
              options={{
                tabBarIcon: props => (
                  <MaterialIcons
                    name="dashboard"
                    size={30}
                    color={props.focused ? 'red' : undefined}
                  />
                ),
              }}
            />
            {state.user && (
              <BottomTab.Screen
                name="Basket"
                component={BasketScreen}
                options={{
                  tabBarBadge: 3,
                  tabBarIcon: props => (
                    <AntDesignIcons
                      name="shoppingcart"
                      size={30}
                      color={props.focused ? 'red' : undefined}
                    />
                  ),
                }}
              />
            )}
            <BottomTab.Screen
              name="AccountStack"
              component={AuthStackNavigator}
              options={{
                title: 'Account',
                tabBarIcon: props => (
                  <MaterialIcons
                    name="person"
                    size={30}
                    color={props.focused ? 'red' : undefined}
                  />
                ),
              }}
            />
          </BottomTab.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

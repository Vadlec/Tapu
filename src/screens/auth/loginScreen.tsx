import React, {useContext, useEffect, useState} from 'react';
import {
  AccountStackParams,
  MainBottomTabParamList,
  BottomTabNavigationProp,
  CompositeNavigationProp,
  useNavigation,
  NativeStackNavigationProp,
} from '../../routes';

import {
  Container,
  Button,
  Title,
  StyledTextInput,
  RowBox,
} from '../../components';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {InputProps, User} from '../../types';
import {UserContext, login, setloading} from '../../context';
import loginToFirebase from '../../functions/loginToFirebase';

type LoginScreenProp = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParams, 'Login'>,
  BottomTabNavigationProp<MainBottomTabParamList>
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const {state, dispatch} = useContext(UserContext);
  const [user, setUser] = useState<User>({email: '', password: '', name: ''});
  const [error, setError] = useState({isError: false, message: ''});
  const [email, setEmail] = useState<InputProps>({key: 'email'});
  const [password, setPassword] = useState<InputProps>({key: 'password'});

  const handleChange = (key: keyof typeof user, text: string) => {
    let _user = {...user};
    _user[key] = text;
    setUser(_user);
  };

  const handleLogin = () => {
    dispatch(setloading(true));
    loginToFirebase(user.email!, user.password!)
      .then(response => {
        setUser({...user, name: response.user.displayName});
      })
      .catch(err => {
        setError({isError: true, message: err});
        dispatch(setloading(false));
      });
  };
  useEffect(() => {
    if (user.name) {
      dispatch(login(user));
      dispatch(setloading(false));
    }
  }, [user.name]);
  useEffect(() => {
    if (error.isError) {
      setTimeout(() => {
        setError({isError: false, message: ''});
      }, 5000);
    }
  }, [error]);
  return (
    <Container>
      <Title>Login</Title>
      <StyledTextInput
        placeholder="E-mail"
        onFocus={() => setEmail({...email, focused: true})}
        onBlur={() => setEmail({...email, focused: false})}
        isfocused={email.focused}
        onChangeText={text => handleChange('email', text)}
      />

      <StyledTextInput
        onFocus={() => setPassword({...password, focused: true})}
        onBlur={() => setPassword({...password, focused: false})}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        isfocused={password.focused}
        onChangeText={text => handleChange('password', text)}
      />

      <Button
        text="log in"
        onpress={() => handleLogin()}
        loading={state.loading}
        disable={
          email.error ||
          user.email.trim().length == 0 ||
          user.password!.trim().length == 0
        }
      />
      <View style={{display: 'flex'}}>
        <HelperText type="error" visible={error.isError}>
          {error.message}
        </HelperText>
      </View>

      <RowBox justCont="space-evenly">
        <Text>Not have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'red'}}>Register</Text>
        </TouchableOpacity>
      </RowBox>
    </Container>
  );
};
export default LoginScreen;

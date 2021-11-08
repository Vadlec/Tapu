import React, {useContext, useState, useEffect} from 'react';
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
import {TouchableOpacity, Text, View, Keyboard} from 'react-native';
import {InputProps, User} from '../../types';
import {UserContext, login, setloading} from '../../context';
import registerToFirebase from '../../functions/registerToFirebase';
import {HelperText} from 'react-native-paper';

type RegisterScreenProp = CompositeNavigationProp<
  NativeStackNavigationProp<AccountStackParams, 'Register'>,
  BottomTabNavigationProp<MainBottomTabParamList>
>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenProp>();
  const {state, dispatch} = useContext(UserContext);

  const [password, setPassword] = useState<InputProps>({key: 'password'});
  const [email, setEmail] = useState<InputProps>({key: 'email'});
  const [nameFocus, setNameFocus] = useState(false);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    name: '',
    items: [],
    currentItemPrice: 0,
  });
  const [error, setError] = useState(null);
  const handleChange = (key: keyof typeof user, text: string) => {
    let _user = {...user};
    if (key == 'email' || key == 'name' || key == 'password') _user[key] = text;
    setUser(_user);
  };

  const handleRegister = () => {
    Keyboard.dismiss();
    dispatch(setloading(true));
    registerToFirebase(user.email, user.password!, user.name!)
      .then(() => {
        dispatch(setloading(false));
        dispatch(login(user));
      })
      .catch(err => {
        dispatch(setloading(false));
        setError(err);
      });
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);
  return (
    <Container>
      <Title>Register</Title>
      <StyledTextInput
        placeholder="E-mail"
        onFocus={() => setEmail({...email, focused: true})}
        onBlur={() => setEmail({...email, focused: false})}
        autoFocus
        isfocused={email.focused}
        onChangeText={text => handleChange('email', text)}
      />

      <StyledTextInput
        placeholder="Name"
        onFocus={() => setNameFocus(true)}
        onBlur={() => setNameFocus(false)}
        isfocused={nameFocus}
        onChangeText={text => handleChange('name', text)}
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
        text="Register"
        onpress={() => handleRegister()}
        loading={state.loading}
        disable={
          user.name!.trim().length == 0 ||
          user.email.trim().length == 0 ||
          user.password!.trim().length == 0
        }
      />
      <View style={{display: 'flex'}}>
        <HelperText type="error" visible={error != null}>
          {error}
        </HelperText>
      </View>

      <RowBox justCont="space-evenly">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'red'}}>Login</Text>
        </TouchableOpacity>
      </RowBox>
    </Container>
  );
};
export default RegisterScreen;

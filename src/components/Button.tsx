import React, {ReactElement} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = {
  primary?: boolean;
  text: string;
  onpress?: () => void;
  loading?: boolean;
  disable?: boolean;
  width?: string;
};

type ButtonViewProps = {
  primary: boolean;
  disable?: boolean;
  width?: string;
};

const ButtonView = styled.TouchableOpacity<ButtonViewProps>`
  background-color: ${({theme, primary, disable}) =>
    disable ? theme.disabledColor : primary ? theme.primaryColor : theme.white};
  min-height: 55px;
  width: ${({width}) => width};
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({theme, disable}) =>
    disable ? 'transparent' : theme.primaryColor};
  align-items: center;
  justify-content: center;
  elevation: 4;
`;
const ButtonText = styled.Text<ButtonViewProps>`
  color: ${({theme, primary}) => (primary ? theme.white : theme.primaryColor)};
  font-family: 'Nunito Sans, sans-serif';
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
  line-height: 18px;
`;

const Button: React.FC<ButtonProps> = ({
  text,
  primary = true,
  onpress,
  children,
  loading = false,
  disable = false,
  width = '100%',
}) => {
  return (
    <ButtonView
      primary={primary}
      onPress={onpress}
      disabled={loading || disable}
      disable={disable}
      width={width}>
      {loading ? (
        <ActivityIndicator size="large" color={primary ? 'white' : '#E82223'} />
      ) : (
        <ButtonText primary={primary}>{text}</ButtonText>
      )}
    </ButtonView>
  );
};

export default Button;

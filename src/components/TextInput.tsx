import styled from 'styled-components/native';

type TextInputViewProps = {
  disabled?: boolean;
  isfocused?: boolean;
};

const StyledTextInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.inActiveColor,
}))<TextInputViewProps>`
  width: 100%;
  border-bottom-width: ${({isfocused}) => (isfocused ? '2px' : '1px')};
  border-bottom-color: ${({theme, isfocused}) =>
    isfocused ? theme.activeColor : theme.disabledColor};
  color: ${({theme}) => theme.textColor};
  margin-top: 20px;
  margin-bottom: ${({isfocused}) => (isfocused ? '38px' : '39px')};
`;

export default StyledTextInput;

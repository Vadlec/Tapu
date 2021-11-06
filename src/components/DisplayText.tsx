import React from 'react';
import styled from 'styled-components/native';

const Styled_Title = styled.Text`
  font-family: 'SF Pro Display Regular';
  font-weight: 700;
  color: ${({theme}) => theme.textColor};
  font-size: 14px;
  line-height: 29px;
`;

const DisplayText: React.FC = ({children}) => {
  return <Styled_Title>{children}</Styled_Title>;
};
export default DisplayText;

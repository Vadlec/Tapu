import React from 'react';
import styled from 'styled-components/native';

const Styled_Title = styled.Text`
  font-family: 'Nunito Sans, sans-serif';
  font-weight: 600;
  font-size: 32px;
  line-height: 42px;
  margin-top: 20px;
  margin-bottom: 30px;
  color: ${({theme}) => theme.textColor};
  width: 100%;
`;

const Title: React.FC = ({children}) => {
  return <Styled_Title>{children}</Styled_Title>;
};
export default Title;

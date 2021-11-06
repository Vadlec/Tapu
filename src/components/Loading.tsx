import React from 'react';
import styled from 'styled-components/native';

const Styled_Loader = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.primaryColor,
  size: 'large',
  width: '100%',
}))``;

const Loading: React.FC = ({children}) => {
  return <Styled_Loader>{children}</Styled_Loader>;
};
export default Loading;

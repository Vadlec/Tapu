import React from 'react';
import styled from 'styled-components/native';

const Styled_Container = styled.View<ContainerProps>`
  background-color: ${({theme, bg}) => (bg ? bg : theme.backgroundColor)};
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 30px;
  padding-bottom: ${({paddingBottom}) => paddingBottom}px;
  flex: 1;
  align-items: ${props => (props.center ? 'center' : 'flex-start')};
  justify-content: ${props => (props.center ? 'center' : props.justCont)};
`;

interface ContainerProps {
  center?: boolean;
  paddingBottom?: number;
  justCont?:
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  bg?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  center = false,
  justCont = 'flex-start',
  paddingBottom = 30,
  bg,
}) => {
  return (
    <Styled_Container
      center={center}
      justCont={justCont}
      paddingBottom={paddingBottom}
      bg={bg}>
      {children}
    </Styled_Container>
  );
};
export default Container;

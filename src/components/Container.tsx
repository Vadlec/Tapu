import React from 'react';
import styled from 'styled-components/native';

const Styled_Container = styled.View<ContainerProps>`
background-color: ${({theme}) => theme.backgroundColor};
padding-left:24px;
padding-right:24px;
padding-top:30px;
padding-bottom:30px;
flex: 1;
align-items: ${props => (props.center ? 'center' : 'flex-start')}
justify-content: ${props => (props.center ? 'center' : props.justCont)}

`;

interface ContainerProps {
  center?: boolean;
  justCont?:
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
}

const Container: React.FC<ContainerProps> = ({
  children,
  center = false,
  justCont = 'flex-start',
}) => {
  return (
    <Styled_Container center={center} justCont={justCont}>
      {children}
    </Styled_Container>
  );
};
export default Container;

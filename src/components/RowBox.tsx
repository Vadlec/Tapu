import React, {Children} from 'react';
import styled from 'styled-components/native';

const Styled_RowBox = styled.View<RowBoxProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justCont};
  margin-top: ${props => props.marginTop}px;
`;

interface RowBoxProps {
  justCont?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  marginTop?: number;
}

const RowBox: React.FC<RowBoxProps> = ({
  children,
  justCont = 'flex-start',
  marginTop = 30,
}) => {
  return (
    <Styled_RowBox justCont={justCont} marginTop={marginTop}>
      {children}
    </Styled_RowBox>
  );
};
export default RowBox;

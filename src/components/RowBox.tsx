import React, {Children} from 'react';
import styled from 'styled-components/native';

const Styled_RowBox = styled.View<RowBoxProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justCont};
  margin-top: 30px;
`;

interface RowBoxProps {
  justCont?:
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
}

const RowBox: React.FC<RowBoxProps> = ({children, justCont = 'flex-start'}) => {
  return <Styled_RowBox justCont={justCont}>{children}</Styled_RowBox>;
};
export default RowBox;

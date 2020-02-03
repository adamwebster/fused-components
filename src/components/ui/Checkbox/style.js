import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from '../../../styles/styles';

export const Label = styled.span`
    margin-left: 5px;
    display:inline-block;
`

export const Icon = styled(FontAwesomeIcon)`
    color: ${color.primary};
`

export const CheckInput = styled.input`
position: absolute;
opacity: 0;
cursor: pointer;
`
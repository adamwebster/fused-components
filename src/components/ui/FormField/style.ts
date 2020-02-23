import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const HintText = styled.p`
    font-size:0.9em;
    color: ${color.mediumdark};
    margin-top:3px;
    margin-bottom: 3px;
    font-weight:300;
`

export const ValidationMessage = styled.p`
    font-size:0.9em;
    color: ${color.danger};
    margin-top:3px;
    margin-bottom: 3px;
    font-weight:300;
`

export const RequiredMark = styled.span`
    color:${color.danger};
    font-weight: bold;
    font-size: 1.2em;
`

export const InputWrapper = styled.div`
    width: 100%;
`

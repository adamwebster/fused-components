import styled from 'styled-components';
import { color } from '../../../styles/styles';
import { darken, lighten } from 'polished';

export const StyledTextarea = styled.textarea`
    border-radius: 5px;
    border: solid 1px ${props => props.theme === 'dark' ? darken(0.3, color.focus) : color.border};
    background-color: ${props => props.theme === 'dark' ? color.darkModeBG : '#fff'};

`

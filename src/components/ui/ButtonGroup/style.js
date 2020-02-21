import styled, { css } from 'styled-components';
import { StyledButton } from '../Button/style';

export const ButtonGroupStyled = styled.div`
    ${StyledButton}{
        margin: 0;
        border-radius: 0;

        &:first-child{
            border-radius: 5px 0 0 5px;
            border-right: 0px;
        }

        &:last-child{
            border-radius: 0 5px 5px 0;
            border-left: 0px;
        }
        &:active{
            transform: scale(1)!important;
        }

        ${props => props.children.map(child => {
            if (child.props.primary) {
                return (css`
                    &:not(:last-child){
                        margin-right:1px;
                    }
                    `
                     )
            }
            return true;
        })}
    }
`
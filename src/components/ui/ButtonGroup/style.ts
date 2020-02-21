import styled, { css } from 'styled-components';
import { StyledButton } from '../Button/style';
import { Props } from './';

const PrimaryButtonStyles = (props: Props) => {
    const styles = props.children.map((child: any) => {
        if (child?.props.primary) {
            return (css`
                &:not(:last-child){
                    margin-right:1px;
                }
            `)
        }
        return true;
    })
    return styles;
}

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
        ${props => PrimaryButtonStyles(props as Props)}
    }
`

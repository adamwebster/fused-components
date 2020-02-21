import styled from 'styled-components';

export const ButtonGroupStyled = styled.div`
    button{
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
    }
`
import styled from 'styled-components';
import { Alert } from '../Alert/';

export const ToastContainer = styled.div`
    position:fixed;
    width: 500px;
    top: 20px;  
    left: 50%;
    transform: translateX(-50%);
    z-index:99;
`

export const StyledToast = styled(Alert)`
    margin-bottom: 10px;
    transition: all;
    animation:  ${props => !props.removing ? 'fadeinToast 0.5s ease-in-out' : 'fadeoutToast 0.5s ease-in-out' };
    @keyframes fadeinToast {
        0%{
            transform: scale(0);
            opacity: 0;
        }
        100%{
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeoutToast {
        0%{
            transform: scale(1);
            opacity: 1;
        }
        100%{
            opacity: 0;
            transform: scale(0);
        }
    }
`
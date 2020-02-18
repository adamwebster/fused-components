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
`
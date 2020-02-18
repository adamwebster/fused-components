import React, {useState} from 'react';
import { useToast, ToastProvider } from '../components/ui/Toasts/ToastProvider';
import { Button } from '../components/ui/Button';

const Toaster = () => {
    const toasts = useToast();
    const [count, setCount] = useState(0)

    return(
        <>
        <Button onClick={() => {setCount(count + 1); toasts.addInfo('Did you know?', 'That space smells like seared steak.')}}>Info toast</Button>
  <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addSuccess('Hooray!', 'Something went right for once...', {duration: 10})}}>Success Toast (Duration set to 10sec)</Button>
        <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addWarning('Warning', 'Winter is coming.', {id: 'one'})}}>Warning Toast (Maximum 1)</Button>
        <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addDanger('Ok fly boy', 'Highway to the danger zone')}}>Danger Toast</Button>
        <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addDanger('Danger Will Robinson')}}>Danger Toast No Content</Button>

        </>
        )
}
export const ToastDemo = () => {
    
    return(
        <ToastProvider>
            <Toaster />
        </ToastProvider>
    )
}
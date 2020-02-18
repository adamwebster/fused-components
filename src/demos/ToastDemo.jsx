import React, {useState} from 'react';
import { useToast, ToastProvider } from '../components/ui/Toasts/ToastProvider';
import { Button } from '../components/ui/Button';

const Toaster = () => {
    const toasts = useToast();
    const [count, setCount] = useState(0)

    return(
        <>
        <Button onClick={() => {setCount(count + 1); toasts.addInfo('Toast', 'toast content')}}>Info toast</Button>
  <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addSuccess('Toast', 'toast content')}}>Success Toast</Button>
        <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addWarning('Toast', 'toast content', {id: 'one'})}}>Warning Toast (Maximum 1)</Button>
        <br/> <br/>
        <Button onClick={() => {setCount(count + 1); toasts.addDanger('Toast', 'toast content')}}>Danger Toast</Button>

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
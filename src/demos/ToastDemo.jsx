import React, {useState} from 'react';
import { useToast, ToastProvider } from '../components/ui/Toasts/ToastProvider';
import { Button } from '../components/ui/Button';

const Toaster = () => {
    const toasts = useToast();
    const [count, setCount] = useState(0)

    return(
        <>
        <Button onClick={() => {setCount(count + 1); toasts.add('Toast #' + count, 'toast content', 'danger')}}>Add Toasts</Button>
        <Button onClick={() => {setCount(count + 1); toasts.add('Toast #' + count, 'toast content', 'success')}}>Add another toasts</Button>
        <Button onClick={() => {setCount(count + 1); toasts.add('Toast #' + count, 'toast content', 'info', {id: 'one'})}}>Add only 1 toasts</Button>

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
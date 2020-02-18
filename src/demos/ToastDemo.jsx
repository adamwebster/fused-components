import React, {useState} from 'react';
import { useToast, ToastProvider } from '../components/ui/Toasts/ToastProvider';
import { Button } from '../components/ui/Button';


const Toaster = () => {
    const toasts = useToast();
    const [count, setCount] = useState(0)

    return(
        <Button onClick={() => {setCount(count + 1); toasts.add('Toast #' + count, 'toast content', 'danger')}}>Log Toasts</Button>
    )
}
export const ToastDemo = () => {
    
    return(
        <ToastProvider>
            <Toaster />
        </ToastProvider>
    )
}
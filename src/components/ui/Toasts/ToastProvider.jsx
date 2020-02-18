import React, { useState, useContext, useEffect } from "react";
import ToastContext from "./ToastContext";
import {ToastContainer, StyledToast} from './styles';
// Idea for autodismise handle it in the alert component istead of the useEffect used here as it is currently
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if(toasts.length > 0){
        setTimeout(() => {
            
            let toastsToSet = toasts.slice(-1, 1);
            if(toasts.length === 1){
                toastsToSet = [];
            }
          setToasts(toastsToSet);
        }, 5000)
    }
  },[toasts])
  const add = (title, content, fcStyle) => {
    const toAdd = toasts.slice();
    toAdd.unshift({ title, content, fcStyle });
    console.log(toAdd)
    setToasts(toAdd);
  };

  const state = {
    add: (title, content, style) => add(title, content, style),
    test: "test"
  };
  return (
    <ToastContext.Provider value={state}>
      {children}
      <ToastContainer id="Toasts">
        {toasts.map((toast) => {
          return <StyledToast
            fcStyle={toast.fcStyle && toast.fcStyle}
            title={toast.title && toast.title}
          >{toast.content && toast.content}
          </StyledToast>
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return {
    add: (title, content, style) => context.add(title, content, style)
  };
};

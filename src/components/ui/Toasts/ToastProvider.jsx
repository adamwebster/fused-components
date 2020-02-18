import React, { useState, useContext, useEffect } from "react";
import ToastContext from "./ToastContext";
import { ToastContainer } from "./styles";
import { Toast } from "./Toast";
import { math } from "polished";
// Idea for auto dismissible handle it in the alert component instead of the useEffect used here as it is currently
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const add = (title, content, fcStyle, options) => {
    if(options){  
    const test = toasts.filter(toast => (toast.options.id === options.id))
      console.log(test)
    }
      const toAdd = toasts.slice();
    toAdd.push({ title, content, fcStyle, key: Math.random(), options });
    setToasts(toAdd);
  };

  const state = {
    add: (title, content, style, options) =>
      add(title, content, style, options),
    test: "test"
  };
  return (
    <ToastContext.Provider value={state}>
      {children}
      <ToastContainer id="Toasts">
        {toasts
          .slice(0)
          .reverse()
          .map(toast => {
            return (
              <Toast
                key={toast.key}
                fcStyle={toast.fcStyle && toast.fcStyle}
                title={toast.title && toast.title}
              >
                {toast.content && toast.content}
              </Toast>
            );
          })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return {
    add: (title, content, style, options) =>
      context.add(title, content, style, options)
  };
};

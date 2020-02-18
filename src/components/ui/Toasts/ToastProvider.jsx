import React, { useState, useContext } from "react";
import ToastContext from "./ToastContext";
import { ToastContainer } from "./styles";
import { Toast } from "./Toast";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const add = (title, content, fcStyle, options) => {
    const toAdd = toasts.slice();

    if (options) {
      const indexValue = toAdd.map((item, index) => {
        if (item.options) {
          if (item.options.id === options.id) {
            return index;
          }
        }
        return false;
      });
      indexValue.forEach(item => {
          if(item){
          toAdd.splice(item, 1); 
          }  
      });
    }
    
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

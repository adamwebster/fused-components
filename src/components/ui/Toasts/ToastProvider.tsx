import React, { useState, useContext, ReactNode } from "react";
import { ToastContext,  ToastContextProvider, Options, ToastObject} from "./ToastContext";
import { ToastContainer } from "./styles";
import { Toast } from "./Toast";

export interface Props {
  children: ReactNode,
  position?: 'top' | 'bottom' | 'top-right' | 'bottom-right',
}

export const ToastProvider = ({ children, position = 'top' }: Props) => {
  const [toasts, setToasts] = useState(new Array<ToastObject>());

  const add = (title: string, content: string, fcStyle: string, icon: string, options: Options) => {
    const toAdd = toasts.slice();
    if (options) {
      if (options.id) {
        const indexValue = toAdd.map((item: any, index) => {
          if (item.options) {
            if (item.options.id) {
              if (item.options.id === options.id) {
                return index;
              }
            }
          }
          return false;
        });
        indexValue.forEach(item => {
          if (item !== false) {
            toAdd.splice(item, 1);
          }
        });
      }
    }

    setToasts((toasts: any) => [...toasts, { title, content, fcStyle, icon, key: Math.random(), options }]);
  };

  const state = {
    add: (title: string, content: string, style: string, icon: string, options: Options) =>
      add(title, content, style, icon, options),
  };
  return (
    <ToastContextProvider value={state}>
      {children}
      <ToastContainer position={position} id="Toasts">
        {toasts
          .slice(0)
          .reverse()
          .map((toast: any) => {
            return (
              <Toast
                key={toast.key}
                fcStyle={toast.fcStyle && toast.fcStyle}
                title={toast.title && toast.title}
                duration={toast.options && toast.options.duration}
                icon={toast.icon && toast.icon}
              >
                {toast.content && toast.content}
              </Toast>
            );
          })}
      </ToastContainer>
    </ToastContextProvider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context) {
    return {
      addInfo: (title: string, content: string, options: Options) =>
        context.add(title, content, 'info', 'info-circle', options),
      addSuccess: (title: string, content: string, options: Options) =>
        context.add(title, content, 'success', 'check-circle', options),
      addWarning: (title: string, content: string, options: Options) =>
        context.add(title, content, 'warning', 'exclamation-circle', options),
      addDanger: (title: string, content: string, options: Options) =>
        context.add(title, content, 'danger', 'no-entry-circle', options)
    };
  }
};

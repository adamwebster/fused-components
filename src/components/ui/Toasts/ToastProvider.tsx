import React, { useState, useContext, ReactNode, ReactElement, useRef, useEffect } from 'react';
import { ToastContext, ToastContextProvider, Options, ToastObject } from './ToastContext';
import { ToastContainer } from './styles';
import { Toast } from './Toast';
import { FCTheme } from '../../../theming/FCTheme';
import { fcStyles } from '../../../common/types';

export interface Props {
  children: ReactNode;
  /** The position of the toast provider */
  position?: 'top' | 'bottom' | 'top-right' | 'bottom-right';
}

export const ToastProvider = ({ children, position = 'top' }: Props): ReactElement => {
  const [toasts, setToasts] = useState(new Array<ToastObject>());
  const theme = useContext(FCTheme);
  const isMounted = useRef(true);
  const add = (
    title: string,
    content: string,
    style?: string,
    icon?: string,
    key?: number,
    options?: Options,
  ): void => {
    const toAdd = toasts.slice();
    if (options) {
      if (options.id) {
        const indexValue = toAdd.map((item: ToastObject, index) => {
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
        setToasts(toAdd);
      }
    }

    if (isMounted.current)
      setToasts((toasts: Array<ToastObject>) => [...toasts, { title, content, style, icon, key, options }]);
  };

  const state = {
    add: (title: string, content: string, style: fcStyles, icon: string, key: number, options: Options): void =>
      add(title, content, style, icon, key, options),
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <ToastContextProvider value={state}>
      {children}
      <ToastContainer position={position} id="Toasts">
        {toasts
          .slice(0)
          .reverse()
          .map((toast: ToastObject) => {
            return (
              <Toast
                key={toast.key}
                theme={theme?.theme}
                style={toast.style as fcStyles}
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

export const useToast = (): {
  addInfo: (title: string, content?: string | undefined, options?: Options | undefined) => void;
  addSuccess: (title: string, content?: string | undefined, options?: Options | undefined) => void;
  addWarning: (title: string, content?: string | undefined, options?: Options | undefined) => void;
  addDanger: (title: string, content?: string | undefined, options?: Options | undefined) => void;
} => {
  const context = useContext(ToastContext);
  return {
    addInfo: (title: string, content?: string, options?: Options): void =>
      context?.add(title, content as string, 'info', 'info-circle', Math.random(), options as Options),
    addSuccess: (title: string, content?: string, options?: Options): void =>
      context?.add(title, content as string, 'success', 'check-circle', Math.random(), options as Options),
    addWarning: (title: string, content?: string, options?: Options): void =>
      context?.add(title, content as string, 'warning', 'exclamation-circle', Math.random(), options as Options),
    addDanger: (title: string, content?: string, options?: Options): void =>
      context?.add(title, content as string, 'danger', 'no-entry-circle', Math.random(), options as Options),
  };
};

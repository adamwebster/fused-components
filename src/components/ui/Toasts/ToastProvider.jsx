import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';

import { ToastContext } from "./ToastContext";
import { ToastContainer } from "./styles";
import { Toast } from "./Toast";

export const ToastProvider = ({ children, position }) => {
  const [toasts, setToasts] = useState([]);

  const add = (title, content, fcStyle, icon, options) => {
    const toAdd = toasts.slice();
    if (options) {
      if(options.id){
      const indexValue = toAdd.map((item, index) => {
        if(item.options){
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

    setToasts(toasts => [...toasts, {title, content, fcStyle, icon, key: Math.random(), options}]);
  };

  const state = {
    add: (title, content, style, icon, options) =>
      add(title, content, style, icon, options),
    test: "test"
  };
  return (
    <ToastContext.Provider value={state}>
      {children}
      <ToastContainer position={position} id="Toasts">
        {toasts
          .slice(0)
          .reverse()
          .map(toast => {
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
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return {
    addInfo: (title, content, options) =>
      context.add(title, content, 'info', 'info-circle', options),
      addSuccess: (title, content, options) =>
      context.add(title, content, 'success', 'check-circle', options),
      addWarning: (title, content, options) =>
      context.add(title, content, 'warning', 'exclamation-circle', options),
      addDanger: (title, content, options) =>
      context.add(title, content, 'danger', 'no-entry-circle', options)
    };
};

ToastProvider.propTypes = {
    /** top | bottom | top-right | bottom-right */
    position: PropTypes.string,
}

ToastProvider.defaultProps = {
    position: 'top',
}
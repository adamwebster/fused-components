import React from 'react';
import { fcStyles } from '../../../common/types';

export interface Options {
  id?: string;
  duration?: number;
}

export interface ToastObject {
  title: string;
  content?: string;
  style?: string;
  icon?: string;
  options?: Options;
  key?: number;
}

export interface ToastInterface {
  add: (title: string, content: string, style: fcStyles, icon: string, key: number, options: Options) => void;
}

export const ToastContext = React.createContext<ToastInterface | null>(null);

export const ToastContextProvider = ToastContext.Provider;

export const ToastContextConsumer = ToastContext.Consumer;

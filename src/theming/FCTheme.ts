import React from 'react';

export interface Theme {
    theme?: string,
    children?: any,
}

export const FCTheme = React.createContext<Theme | null>(null);

export const FCThemeProvider = FCTheme.Provider;

export const FCThemeConsumer = FCTheme.Consumer;
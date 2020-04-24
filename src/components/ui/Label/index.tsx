import React, { useContext, ReactNode, ReactElement } from 'react';

import { LabelStyled } from './style';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}
export const Label = React.memo<Props>(function Label({ children, ...rest }: Props): ReactElement {
  const theme = useContext(FCTheme);
  return (
    <LabelStyled theme={theme?.theme} {...rest}>
      {children}
    </LabelStyled>
  );
});

Label.displayName = 'Label';

import React, { ReactElement } from 'react';
import { ButtonGroupStyled } from './style';

export interface Props {
  /**
   * @ignore
   */
  children: Array<ReactElement>;
}

export const ButtonGroup = ({ children, ...rest }: Props): ReactElement => {
  return <ButtonGroupStyled {...rest}>{children}</ButtonGroupStyled>;
};

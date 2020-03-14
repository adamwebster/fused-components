import React, { ReactElement } from 'react';
import { ButtonGroupStyled } from './style';

export interface Props {
  children: Array<ReactElement>;
}

export const ButtonGroup = ({ children }: Props): ReactElement => {
  return <ButtonGroupStyled>{children}</ButtonGroupStyled>;
};

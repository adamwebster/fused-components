import React, { ReactElement } from 'react';
import { ButtonGroupStyled } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  children: Array<ReactElement>;
}

const ButtonGroup = ({ children, ...rest }: Props): ReactElement => {
  return <ButtonGroupStyled {...rest}>{children}</ButtonGroupStyled>;
};

export default ButtonGroup;

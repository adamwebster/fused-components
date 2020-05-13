import React, { useContext, ReactElement, ReactNode } from 'react';
import { StyledCard } from './style';
import { FCTheme } from '../../../theming/FCTheme';
export interface Props {
  /** Sets the border radius for the card */
  borderRadius?: string;
  /** Sets the card to have a box shadow */
  boxShadow?: boolean;
  /**
   * @ignore
   */
  children?: ReactNode;
}
export const Card = ({ borderRadius = '5px', boxShadow = false, children, ...rest }: Props): ReactElement => {
  const theme = useContext(FCTheme);
  return (
    <StyledCard theme={theme.theme} borderRadius={borderRadius} boxShadow={boxShadow} {...rest}>
      {children}
    </StyledCard>
  );
};

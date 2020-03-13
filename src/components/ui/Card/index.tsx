import React, { useContext } from 'react';
import { StyledCard } from './style';
import { FCTheme } from '../../../theming/FCTheme';
export interface Props {
  /** Sets the border radius for the card */
  borderRadius?: string;
  /** Sets the card to have a box shadow */
  boxShadow?: boolean;
  children?: any;
}
export const Card = ({ borderRadius = '5px', boxShadow = false, children, ...rest }: Props) => {
  const theme = useContext(FCTheme);
  return (
    <StyledCard theme={theme?.theme} borderRadius={borderRadius} boxShadow={boxShadow} {...rest}>
      {children}
    </StyledCard>
  );
};

import React from 'react';
import { StyledCard } from './style';

export interface Props {
  /** Sets the border radius for the card */
  borderRadius?: string,
  /** Sets the card to have a box shadow */
  boxShadow?: boolean,
  children?: any,
}
export const Card = ({ borderRadius = '5px', boxShadow = false, children, ...rest }:Props) => {
  return (
    <StyledCard borderRadius={borderRadius} boxShadow={boxShadow} {...rest}>
      {children}
    </StyledCard>
  )
}

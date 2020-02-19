import React from 'react';
import { StyledCard } from './style';

export interface Props {
  borderRadius?: String,
  boxShadow?: Boolean,
}
export const Card = ({ borderRadius = '5px', boxShadow = false, ...rest }: Props) => {
  return (
    <StyledCard borderRadius={borderRadius} boxShadow={boxShadow} {...rest} />
  )
}

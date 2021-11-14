import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardActions } from './card.styles';

interface CardActionsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardActions = ({ children }: CardActionsProps) => {
  return <StyledCardActions>{children}</StyledCardActions>;
};
export default CardActions;

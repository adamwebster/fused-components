import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardAction } from './card.styles';

interface CardActionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardAction = ({ children }: CardActionProps) => {
  return <StyledCardAction>{children}</StyledCardAction>;
};
export default CardAction;

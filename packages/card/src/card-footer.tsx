import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardHeader } from './card.styles';

interface CardFooterProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter = ({ children }: CardFooterProps) => {
  return <StyledCardHeader>{children}</StyledCardHeader>;
};
export default CardFooter;

import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCard } from './card.styles';

interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const Card = ({ children }: CardProps) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;

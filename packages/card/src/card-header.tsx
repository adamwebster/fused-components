import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardHeader } from './card.styles';

interface CardHeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return <StyledCardHeader>{children}</StyledCardHeader>;
};
export default CardHeader;

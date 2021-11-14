import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardBody } from './card.styles';

interface CardBodyProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
  return <StyledCardBody>{children}</StyledCardBody>;
};
export default CardBody;

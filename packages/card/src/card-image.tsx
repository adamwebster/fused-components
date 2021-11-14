import React, { HtmlHTMLAttributes, ReactNode } from 'react';
import { StyledCardImage } from './card.styles';

interface CardImageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardImage = ({ children }: CardImageProps) => {
  return <StyledCardImage>{children}</StyledCardImage>;
};
export default CardImage;

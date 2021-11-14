import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardImageProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardImage: ({ children }: CardImageProps) => JSX.Element;
export default CardImage;

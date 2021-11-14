import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Card: ({ children }: CardProps) => JSX.Element;
export default Card;

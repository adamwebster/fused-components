import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardFooterProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardFooter: ({ children }: CardFooterProps) => JSX.Element;
export default CardFooter;

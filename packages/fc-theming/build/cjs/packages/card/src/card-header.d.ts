import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardHeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardHeader: ({ children }: CardHeaderProps) => JSX.Element;
export default CardHeader;

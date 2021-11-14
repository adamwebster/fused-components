import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardBodyProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardBody: ({ children }: CardBodyProps) => JSX.Element;
export default CardBody;

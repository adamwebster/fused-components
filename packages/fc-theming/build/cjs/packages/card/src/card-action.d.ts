import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardActionProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardAction: ({ children }: CardActionProps) => JSX.Element;
export default CardAction;

import { HtmlHTMLAttributes, ReactNode } from 'react';
interface CardActionsProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const CardActions: ({ children }: CardActionsProps) => JSX.Element;
export default CardActions;

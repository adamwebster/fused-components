import React, { useContext, ReactElement, ReactNode } from 'react';
import { StyledCard } from './style';
import { FCTheme } from '../../../theming/FCTheme';
export interface Props extends React.HTMLAttributes<HTMLElement> {
  /** Sets the border radius for the card */
  borderRadius?: string;
  /** Sets the card to have a box shadow */
  boxShadow?: boolean;
  /**
   * @ignore
   */
  children?: ReactNode;
  /**
   * @ignore
   */
  as?: React.ElementType;
}
export const Card = ({
  borderRadius = '5px',
  boxShadow = false,
  children,
  as = 'div',
  ...rest
}: Props): ReactElement => {
  const theme = useContext(FCTheme);

  return (
    <StyledCard as={as} theme={theme.theme} borderRadius={borderRadius} boxShadow={boxShadow} {...rest}>
      {children}
    </StyledCard>
  );
};

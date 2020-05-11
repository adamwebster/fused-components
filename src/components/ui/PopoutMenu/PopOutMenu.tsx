import React, { ReactNode, useContext, ReactElement, useState, useEffect, HTMLAttributes } from 'react';
import { usePopper } from 'react-popper';
import { Placement as PopperPlacements } from '@popperjs/core';
import { PopOutMenuStyled } from './style';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  placement?: PopperPlacements;
  referenceElement?: any;
}
const PopOutMenu = React.forwardRef<HTMLUListElement, Props>(
  (props: Props, ref: any): ReactElement => {
    const { placement, children, referenceElement, ...rest } = props;
    const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
    });
    const theme = useContext(FCTheme);

    useEffect(() => {
      setPopperElement(ref.current);
    }, [popperElement]);

    return (
      <>
        <PopOutMenuStyled theme={theme.theme} ref={ref} style={styles.popper} {...attributes.popper} {...rest}>
          {children}
        </PopOutMenuStyled>
      </>
    );
  },
);

export default PopOutMenu;

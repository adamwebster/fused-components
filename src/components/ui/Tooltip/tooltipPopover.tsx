import React, { useState, ReactNode, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement as PopperPlacements } from '@popperjs/core';
import { TooltipStyled } from './style';

interface Props {
  content: ReactNode;
  referenceElement?: HTMLDivElement | null;
  targetElement?: string;
  placement?: PopperPlacements;
}
const TooltipComponent = ({ content, referenceElement, targetElement, placement }: Props): ReactElement => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'arrow', options: { element: arrowElement, padding: 10 } },
    ],
  });
  if (targetElement) {
    const target = document.querySelector(targetElement) as Element;
    return ReactDOM.createPortal(
      <TooltipStyled ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {content}
        <div className="tooltip-arrow" ref={setArrowElement} style={styles.arrow} />
      </TooltipStyled>,
      target,
    );
  }
  return (
    <TooltipStyled ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {content}
      <div className="tooltip-arrow" ref={setArrowElement} style={styles.arrow} />
    </TooltipStyled>
  );
};

export default TooltipComponent;

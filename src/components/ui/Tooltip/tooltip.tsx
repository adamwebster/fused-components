import React, { useState, ReactNode, ReactElement } from 'react';

import { Placement as PopperPlacements } from '@popperjs/core';
import { TooltipWrapper } from './style';
import TooltipComponent from './tooltipPopover';

export interface Props {
  children?: ReactNode;
  /** Set the content of the tooltip */
  content?: ReactNode;
  /** Set the target element of the tooltip useful to break out of containers that are set to overflow hidden */
  targetElement?: string;
  /** Set the placement of the tooltip */
  placement?: PopperPlacements;
}

const Tooltip = ({ children, content, targetElement = '', placement = 'auto' }: Props): ReactElement => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [tooltipVisible, setToolTipVisible] = useState(false);

  const showTooltip = (): void => {
    setToolTipVisible(true);
  };

  const hideTooltip = (): void => {
    setToolTipVisible(false);
  };
  return (
    <>
      <TooltipWrapper
        onMouseOver={(): void => showTooltip()}
        onMouseLeave={(): void => hideTooltip()}
        ref={setReferenceElement}
      >
        {children}
      </TooltipWrapper>
      {tooltipVisible && (
        <TooltipComponent
          placement={placement}
          targetElement={targetElement}
          referenceElement={referenceElement}
          content={content}
        />
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;

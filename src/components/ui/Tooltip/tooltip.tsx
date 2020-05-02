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
  /** The trigger event that should cause the tooltip to show.  Defaults to mouseOver.  */
  triggerEvent?: 'click' | 'mouseOver';
  visible?: boolean;
}

export const Tooltip = ({
  children,
  triggerEvent,
  content,
  targetElement = '',
  placement = 'auto',
  visible = false,
}: Props): ReactElement => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [tooltipVisible, setToolTipVisible] = useState(visible);

  const showTooltip = (): void => {
    setToolTipVisible(true);
  };

  const hideTooltip = (): void => {
    setToolTipVisible(false);
  };

  let triggerProps: { onMouseOver?: () => void; onClick?: () => void } = {
    onMouseOver: (): void => showTooltip(),
  };

  if (triggerEvent === 'click') {
    triggerProps = {
      onClick: (): void => showTooltip(),
    };
  }
  return (
    <>
      <TooltipWrapper
        triggerEvent={triggerEvent}
        {...triggerProps}
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

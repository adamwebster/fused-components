import React, { useState, ReactNode, ReactElement } from 'react';

import { Placement as PopperPlacements } from '@popperjs/core';
import { TooltipWrapper, TooltipButton } from './style';
import TooltipComponent from './tooltipPopover';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Set the content of the tooltip */
  content?: ReactNode;
  /** Set the target element of the tooltip useful to break out of containers that are set to overflow hidden */
  targetElement?: string;
  /** Set the placement of the tooltip  "auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"*/
  placement?: PopperPlacements;
  /** The trigger event that should cause the tooltip to show.  Defaults to mouseOver. 'click' | 'mouseOver' */
  triggerEvent?: 'click' | 'mouseOver';
  /**
   * @ignore
   */
  visible?: boolean;
  /** The id of the tooltip element. Required for accessibility.  */
  id: string;
  /** What element the trigger should render as.  */
  triggerAs?: string;
}

export const Tooltip = ({
  children,
  triggerEvent,
  content,
  targetElement = '',
  placement = 'auto',
  id,
  visible = false,
  triggerAs,
  ...rest
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

  let asProps = {};
  if (triggerAs) {
    asProps = {
      as: triggerAs,
    };
  }

  let ariaProps = {};
  if (tooltipVisible) {
    ariaProps = {
      'aria-describedby': id,
    };
  }
  return (
    <>
      <TooltipWrapper
        triggerEvent={triggerEvent}
        {...triggerProps}
        onMouseLeave={(): void => hideTooltip()}
        onBlur={(): void => hideTooltip()}
        ref={setReferenceElement}
        {...rest}
      >
        <TooltipButton {...asProps} tabIndex={0} onFocus={(): void => showTooltip()} {...ariaProps}>
          {children}
        </TooltipButton>
      </TooltipWrapper>
      {tooltipVisible && (
        <TooltipComponent
          id={id}
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

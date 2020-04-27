import React, { ReactNode, ReactElement, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ToolTipWrapper, StyledTooltip } from './style';

interface TooltipPopoverProps {
  parentRef: any;
  content: ReactNode;
  toolTipVisible: boolean;
  targetElement: HTMLElement | null;
  targetElementId: string;
}
const TooltipPopover = ({
  parentRef,
  content,
  targetElement,
  targetElementId,
  toolTipVisible,
}: TooltipPopoverProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [self, setSelf] = useState<any>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setSelf(ref.current);
    window.addEventListener('scroll', function() {
      const scroll = this.scrollY;
      console.log(scroll);
      setScrollY(scroll);
    });
  }, [toolTipVisible]);

  if (targetElementId === 'body' && toolTipVisible) {
    const rect = parentRef.getBoundingClientRect();

    return ReactDOM.createPortal(
      <StyledTooltip
        ref={ref}
        self={self}
        leftPosition={self ? rect.left - self.offsetWidth / 2 + parentRef.offsetWidth / 2 : 0}
        divHeight={self ? rect.top - self.offsetHeight + scrollY : 0}
      >
        {content}
      </StyledTooltip>,
      document.body,
    );
  }
  if (targetElement !== null && toolTipVisible) {
    return ReactDOM.createPortal(
      <StyledTooltip
        ref={ref}
        self={self}
        leftPosition={self ? targetElement.offsetWidth / 2 - self.offsetWidth / 2 : 0}
        divHeight={self ? -self.offsetHeight : 0}
      >
        {content}
      </StyledTooltip>,
      targetElement,
    );
  }
  if (toolTipVisible)
    return (
      <StyledTooltip
        ref={ref}
        self={self}
        leftPosition={self ? parentRef.offsetWidth / 2 - self.offsetWidth / 2 : 0}
        divHeight={self ? -self.offsetHeight : 0}
      >
        {content}
      </StyledTooltip>
    );
  return <></>;
};
interface Props {
  children?: ReactNode;
  /** Sets the content for the popover */
  content?: ReactNode;
  /** The target element for the id if you want it to be the body just use body as the value */
  targetElementId?: string;
}

export const Tooltip = ({ children, content, targetElementId = '' }: Props): ReactElement => {
  const [parentNode, setParentNode] = useState<any>(document.body);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [target, setTarget] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParentNode(ref.current);
    if (targetElementId) {
      setTarget(document.getElementById(targetElementId));
    }
  }, []);

  const showTooltip = (): void => {
    setToolTipVisible(true);
  };
  const hideTooltip = (): void => {
    setToolTipVisible(false);
  };
  return (
    <ToolTipWrapper onMouseOver={(): void => showTooltip()} onMouseLeave={(): void => hideTooltip()} ref={ref}>
      <TooltipPopover
        targetElementId={targetElementId}
        targetElement={target}
        toolTipVisible={toolTipVisible}
        content={content}
        parentRef={parentNode}
      />
      {children}
    </ToolTipWrapper>
  );
};

export default Tooltip;

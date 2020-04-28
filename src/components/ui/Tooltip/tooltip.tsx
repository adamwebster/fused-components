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
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    setSelf(ref.current);
    window.addEventListener('scroll', function() {
      const scroll = this.scrollY;
      setScrollY(scroll);
    });
  }, [toolTipVisible]);

  if (targetElementId === 'body') {
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
  if (targetElement !== null) {
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
  trigger?: string;
}

export const Tooltip = ({ children, content, targetElementId = '', trigger }: Props): ReactElement => {
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

  let triggerProps: any = {
    onMouseOver: (): void => showTooltip(),
  };
  if (trigger === 'click') {
    triggerProps = {
      onClick: (): void => showTooltip(),
    };
  }

  return (
    <ToolTipWrapper trigger={trigger} {...triggerProps} onMouseLeave={(): void => hideTooltip()} ref={ref}>
      {toolTipVisible && parentNode && (
        <TooltipPopover
          targetElementId={targetElementId}
          targetElement={target}
          toolTipVisible={toolTipVisible}
          content={content}
          parentRef={parentNode}
        />
      )}
      {children}
    </ToolTipWrapper>
  );
};

export default Tooltip;
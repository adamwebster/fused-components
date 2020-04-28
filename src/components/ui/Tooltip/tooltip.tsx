import React, { ReactNode, ReactElement, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ToolTipWrapper, StyledTooltip } from './style';

interface TooltipPopoverProps {
  parentRef: any;
  content: ReactNode;
  toolTipVisible: boolean;
  targetElement: HTMLElement | null;
  targetElementId: string;
  position: string;
}
const TooltipPopover = ({
  parentRef,
  content,
  targetElement,
  targetElementId,
  toolTipVisible,
  position = 'top',
}: TooltipPopoverProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [self, setSelf] = useState<any>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const rect = parentRef.getBoundingClientRect();

  useEffect(() => {
    setSelf(ref.current);
    window.addEventListener('scroll', function() {
      const scroll = this.scrollY;
      setScrollY(scroll);
    });
  }, [toolTipVisible]);

  let leftPosition = 0;
  let divHeight = 0;
  if (self) {
    divHeight = -self.offsetHeight;
    if (targetElementId === 'body') {
      switch (position) {
        case 'top':
          leftPosition = rect.left - self.offsetWidth / 2 + parentRef.offsetWidth / 2;
          divHeight = rect.top - self.offsetHeight + scrollY;
          break;
        case 'right':
          leftPosition = rect.left + parentRef.offsetWidth + 7;
          divHeight = rect.top - self.offsetHeight + scrollY;
          break;
        default:
          leftPosition = rect.left - self.offsetWidth / 2 + parentRef.offsetWidth / 2;
          divHeight = rect.top - self.offsetHeight + scrollY;
      }
    } else if (targetElement !== null) {
      switch (position) {
        case 'top':
          leftPosition = targetElement.offsetWidth / 2 - self.offsetWidth / 2;
          break;
        case 'right':
          leftPosition = targetElement.offsetWidth + 7;
          break;
        default:
          leftPosition = targetElement.offsetWidth / 2 - self.offsetWidth / 2;
      }
    } else {
      switch (position) {
        case 'top':
          leftPosition = parentRef.offsetWidth / 2 - self.offsetWidth / 2;
          break;
        case 'right':
          leftPosition = parentRef.offsetWidth + 7;
          break;
        default:
          leftPosition = parentRef.offsetWidth / 2 - self.offsetWidth / 2;
      }
    }
  }

  if (targetElementId === 'body') {
    return ReactDOM.createPortal(
      <StyledTooltip
        ref={ref}
        self={self}
        leftPosition={self ? leftPosition : 0}
        divHeight={self ? divHeight : 0}
        position={position}
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
        leftPosition={self ? leftPosition : 0}
        divHeight={self ? divHeight : 0}
        position={position}
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
      leftPosition={leftPosition}
      divHeight={self ? divHeight : 0}
      position={position}
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
  visible?: boolean;
  position?: string;
}

export const Tooltip = ({
  children,
  content,
  targetElementId = '',
  trigger,
  visible = false,
  position = 'top',
}: Props): ReactElement => {
  const [parentNode, setParentNode] = useState<any>(document.body);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [target, setTarget] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParentNode(ref.current);
    if (targetElementId) {
      setTarget(document.getElementById(targetElementId));
    }
    if (visible) {
      setToolTipVisible(true);
    }
  }, []);

  const showTooltip = (): void => {
    setToolTipVisible(true);
  };
  const hideTooltip = (): void => {
    if (!visible) {
      setToolTipVisible(false);
    }
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
          position={position}
        />
      )}
      {children}
    </ToolTipWrapper>
  );
};

export default Tooltip;

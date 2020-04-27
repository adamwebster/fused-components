import React, { ReactNode, ReactElement, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ToolTipWrapper, StyledTooltip } from './style';

interface TooltipPopoverProps {
  parentRef: any;
  content: ReactNode;
  toolTipVisible: boolean;
  targetElement: HTMLElement | null;
}
const TooltipPopover = ({ parentRef, content, targetElement, toolTipVisible }: TooltipPopoverProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [self, setSelf] = useState<any>(null);
  useEffect(() => {
    setSelf(ref.current);
    console.log(parentRef.offsetWidth);
  }, [toolTipVisible]);

  if (targetElement && toolTipVisible) {
    return ReactDOM.createPortal(
      <StyledTooltip
        ref={ref}
        leftPosition={self ? targetElement.offsetWidth / 2 - self.offsetWidth / 2 : 0}
        divHeight={self ? self.offsetHeight : 0}
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
        leftPosition={self ? parentRef.offsetWidth / 2 - self.offsetWidth / 2 : 0}
        divHeight={self ? self.offsetHeight : 0}
      >
        {content}
      </StyledTooltip>
    );
  return <></>;
};
interface Props {
  children?: ReactNode;
  content?: ReactNode;
  targetElementId: string;
}

const Tooltip = ({ children, content, targetElementId = '' }: Props): ReactElement => {
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
    <ToolTipWrapper onMouseOver={(): void => showTooltip()} onMouseOut={(): void => hideTooltip()} ref={ref}>
      <TooltipPopover targetElement={target} toolTipVisible={toolTipVisible} content={content} parentRef={parentNode} />
      {children}
    </ToolTipWrapper>
  );
};

export default Tooltip;

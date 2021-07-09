import React, { useState, useEffect, useContext, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import PanelComponent from './panelComponent';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** Set the style for the panel. "danger" | "warning" | "info" | "success" */
  fcStyle?: fcStyles;
  /** Set the tile for the panel */
  title?: string;
  /** What should happen when the close button is clicked */
  onCloseClick?: () => void;
  /** What should happen when the save button is clicked */
  onSaveClick?: () => void;
  /**
   * @ignore
   */
  fixed?: boolean;
  /** If the panel is visible */
  visible?: boolean;
  /**
   * @ignore
   */
  children: ReactNode;
  /** The position of the panel. left | right */
  position?: 'left' | 'right';
  /** If the overlay is shown */
  showOverlay?: boolean;
  /** What element that should have focus when the panel opens */
  focusElement?: string;
}
export const Panel = ({
  fcStyle,
  title,
  onCloseClick = (): void => undefined,
  onSaveClick = (): void => undefined,
  fixed = true,
  visible = true,
  children,
  position = 'right',
  showOverlay = false,
  focusElement,
  id,
  ...rest
}: Props): ReactElement => {
  const [show, setShow] = useState(false);
  const theme = useContext(FCTheme);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, 500);
    } else {
      setShow(true);
    }
  }, [visible]);

  const panelProps = {
    fcStyle,
    title,
    onCloseClick,
    onSaveClick,
    position,
    showOverlay,
    theme,
    fixed,
    visible,
    focusElement,
    id,
  };
  if (!fixed)
    return (
      <PanelComponent {...panelProps} {...rest}>
        {children}
      </PanelComponent>
    );
  return ReactDOM.createPortal(
    <>
      {show && (
        <PanelComponent {...panelProps} {...rest}>
          {children}
        </PanelComponent>
      )}
    </>,
    document.body,
  );
};

export default Panel;

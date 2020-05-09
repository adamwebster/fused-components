import React, { useState, useEffect, useContext, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import PanelComponent from './panelComponent';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props {
  /** Set the style for the panel */
  fcStyle?: fcStyles;
  /** Set the tile for the panel */
  title?: string;
  /** What should happen when the close button is clicked */
  onCloseClick?: () => void;
  /** What should happen when the save button is clicked */
  onSaveClick?: () => void;
  /** If the panel should have a fixed position */
  fixed?: boolean;
  /** If the panel is visible */
  visible?: boolean;
  children: ReactNode;
  /** The position of the panel */
  position?: 'left' | 'right';
  /** If the overlay is shown */
  showOverlay?: boolean;
  focusElement?: string;
  id: string;
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
  if (!fixed) return <PanelComponent {...panelProps}>{children}</PanelComponent>;
  return ReactDOM.createPortal(
    <>{show && <PanelComponent {...panelProps}>{children}</PanelComponent>}</>,
    document.body,
  );
};

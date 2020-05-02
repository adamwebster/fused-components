import React, { useState, useEffect, useContext, ReactElement, ReactNode } from 'react';
import { StyledPanel, DialogTitle, DialogContent, DialogText, DialogFooter, CloseButton, Overlay } from './style';
import { Button } from '../Button';
import { color } from '../../../styles/styles';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props {
  /** Set the style for the panel */
  fcStyle?: fcStyles;
  /** Set the tile for the panel */
  title?: string;
  /** What should happen when the close button is clicked */
  onCloseClick?: (e: unknown) => void;
  /** What should happen when the save button is clicked */
  onSaveClick?: (e: unknown) => void;
  /** If the panel should have a fixed position */
  fixed?: boolean;
  /** If the panel is visible */
  visible?: boolean;
  children: ReactNode;
  /** The position of the panel */
  position?: 'left' | 'right';
  /** If the overlay is shown */
  showOverlay?: boolean;
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

  return (
    <>
      {show && showOverlay && (
        <Overlay data-testid="panel-overlay" onClick={(e: unknown): void => onCloseClick(e)}></Overlay>
      )}
      {show && (
        <StyledPanel
          role="dialog"
          theme={theme.theme}
          fcStyle={fcStyle}
          position={position}
          visible={visible}
          fixed={fixed}
        >
          <DialogTitle theme={theme.theme} fcStyle={fcStyle}>
            {title && title}
            <CloseButton
              title="Close panel"
              theme={theme.theme}
              onClick={(e: unknown): void => onCloseClick(e)}
              aria-label="Close"
            >
              <Icon icon="times" />
            </CloseButton>
          </DialogTitle>
          <DialogContent>
            <DialogText>{children}</DialogText>
          </DialogContent>
          <DialogFooter fcStyle={fcStyle} theme={theme.theme}>
            <Button
              buttonColor={theme.theme === 'dark' ? color.darkModeLight : color.mediumdark}
              onClick={(e): void => onCloseClick(e)}
            >
              Close
            </Button>
            <Button onClick={e => onSaveClick(e)} fcStyle={fcStyle} primary>
              Save
            </Button>
          </DialogFooter>
        </StyledPanel>
      )}
    </>
  );
};

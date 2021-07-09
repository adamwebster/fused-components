import React, { ReactNode, ReactElement, useEffect, useRef } from 'react';
import { StyledPanel, DialogTitle, DialogContent, DialogText, DialogFooter, CloseButton, Overlay } from './style';
import { fcStyles } from '../../../common/types';
import { Button } from '../Button';
import { color } from '../../../styles/styles';
import { Icon } from '../../icon';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
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
  children: ReactNode;
  /** The position of the panel */
  position?: 'left' | 'right';
  /** If the overlay is shown */
  showOverlay?: boolean;
  theme?: any;
  show?: boolean;
  visible?: boolean;
  id: string;
  focusElement?: string;
}

const PanelComponent = ({
  fcStyle,
  title,
  onCloseClick = (): void => undefined,
  onSaveClick = (): void => undefined,
  fixed = true,
  visible = true,
  children,
  position = 'right',
  showOverlay,
  theme,
  id,
  focusElement,
  ...rest
}: Props): ReactElement => {
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const cancelButton = useRef<HTMLButtonElement | null>(null);
  const confirmButton = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (fixed)
      if (focusElement) {
        document.getElementById(focusElement)?.focus();
      } else {
        closeButton.current?.focus();
      }
  }, []);

  const handleDialogKeyDown = (e: any): void => {
    if (e.key === 'Tab') {
      if (cancelButton) {
        if (document.activeElement === confirmButton.current) {
          e.preventDefault();
          closeButton.current?.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onCloseClick();
    }
  };
  return (
    <>
      {showOverlay && <Overlay data-testid="panel-overlay" onClick={(): void => onCloseClick()}></Overlay>}
      <StyledPanel
        id={id}
        role="dialog"
        onKeyDown={(e: { key: string }): void => handleDialogKeyDown(e)}
        theme={theme.theme}
        fcStyle={fcStyle}
        position={position}
        visible={visible}
        fixed={fixed}
        aria-labelledby={`${id}_title`}
        ref={panelRef}
        {...rest}
      >
        <DialogTitle theme={theme.theme} fcStyle={fcStyle}>
          <h2 id={`${id}_title`}>{title}</h2>
          <CloseButton title="Close panel" theme={theme.theme} onClick={(): void => onCloseClick()} ref={closeButton}>
            <Icon icon="times" aria-label="Close" />
          </CloseButton>
        </DialogTitle>
        <DialogContent>
          <DialogText>{children}</DialogText>
        </DialogContent>
        <DialogFooter fcStyle={fcStyle} theme={theme.theme}>
          <Button
            buttonColor={theme.theme === 'dark' ? color.darkModeLight : color.mediumdark}
            onClick={(): void => onCloseClick()}
            ref={cancelButton}
          >
            Close
          </Button>
          <Button ref={confirmButton} onClick={() => onSaveClick()} fcStyle={fcStyle} primary>
            Save
          </Button>
        </DialogFooter>
      </StyledPanel>
    </>
  );
};

export default PanelComponent;

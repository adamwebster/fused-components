import React, { useEffect, useState, ReactNode, ReactElement } from 'react';
import {
  CornerDialogStyled,
  DialogTitle,
  DialogContent,
  DialogText,
  DialogFooter,
  CloseButton,
  IconStyled,
} from './style';
import { Button } from '../Button';
import { color } from '../../../styles/styles';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props {
  fixed?: boolean;
  onCloseClick?: () => void;
  visible?: boolean;
  cancelText?: string;
  confirmText?: string;
  title?: string;
  fcStyle?: fcStyles;
  icon?: string;
  children: ReactNode;
  onConfirmClick?: () => void;
}
export const CornerDialog = ({
  fixed = true,
  onCloseClick = (): void => undefined,
  onConfirmClick = (): void => undefined,
  visible = true,
  cancelText = 'Cancel',
  confirmText = 'Learn More',
  title,
  children,
  fcStyle,
  icon,
}: Props): ReactElement => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, 150);
    } else {
      setShow(true);
    }
  }, [visible]);

  const handleUserKeyPress = (e: any): void => {
    e.preventDefault();
    if (show) {
      // Escape Key
      if (e.keyCode === 27) {
        setShow(false);
        onCloseClick();
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <>
          {show && (
            <CornerDialogStyled
              role="alertdialog"
              title="Click escape to close this dialog."
              visible={visible}
              fcStyle={fcStyle}
              fixed={fixed}
              theme={themeContext.theme}
            >
              <DialogTitle fcStyle={fcStyle} theme={themeContext.theme}>
                {title && title}
                <CloseButton
                  title="Close"
                  theme={themeContext.theme}
                  onClick={(): void => onCloseClick()}
                  aria-label="Close"
                >
                  <Icon icon="times" />
                </CloseButton>
              </DialogTitle>
              <DialogContent theme={themeContext.theme}>
                {icon && (
                  <IconStyled theme={themeContext.theme} fcStyle={fcStyle}>
                    <Icon icon={icon} />
                  </IconStyled>
                )}
                <DialogText>{children}</DialogText>
              </DialogContent>
              <DialogFooter fcStyle={fcStyle} theme={themeContext.theme}>
                <Button
                  buttonColor={themeContext.theme === 'dark' ? color.darkModeLight : color.mediumdark}
                  onClick={(): void => onCloseClick()}
                >
                  {cancelText}
                </Button>
                <Button onClick={(): void => onConfirmClick()} fcStyle={fcStyle} primary>
                  {confirmText}
                </Button>
              </DialogFooter>
            </CornerDialogStyled>
          )}
        </>
      )}
    </FCThemeConsumer>
  );
};

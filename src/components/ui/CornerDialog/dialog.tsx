import React, { useEffect, useState, ReactNode, ReactElement, useRef } from 'react';
import { FCThemeConsumer } from '../../../theming/FCTheme';
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

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
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
  id: string;
}

const CornerDialogPopover = ({
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
  id,
  ...rest
}: Props): ReactElement => {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const componentChildren = children;
  const componentIcon = icon;

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, 150);
    } else {
      setShow(true);
    }
  }, [visible]);

  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <>
          {show && (
            <CornerDialogStyled
              ref={dialogRef}
              role="alertdialog"
              visible={visible}
              fcStyle={fcStyle}
              fixed={fixed}
              theme={themeContext.theme}
              id={id}
              tabIndex={fixed ? 0 : -1}
              {...rest}
            >
              <DialogTitle id={`${id}-title`} fcStyle={fcStyle} theme={themeContext.theme}>
                {title && title}
                <CloseButton theme={themeContext.theme} onClick={(): void => onCloseClick()}>
                  <Icon title="Close" icon="times" />
                </CloseButton>
              </DialogTitle>
              <DialogContent id={`${id}-body`} theme={themeContext.theme}>
                {componentIcon && (
                  <IconStyled theme={themeContext.theme} fcStyle={fcStyle}>
                    <Icon icon={componentIcon} />
                  </IconStyled>
                )}
                <DialogText>{componentChildren}</DialogText>
              </DialogContent>
              <DialogFooter fcStyle={fcStyle} theme={themeContext.theme}>
                <Button
                  buttonColor={themeContext.theme === 'dark' ? color.darkModeLight : color.dark}
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
export default CornerDialogPopover;

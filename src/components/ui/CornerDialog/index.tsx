import React, { useEffect, useState, ReactNode } from "react";
import {
  CornerDialogStyled,
  DialogTitle,
  DialogContent,
  DialogText,
  DialogFooter,
  CloseButton,
  IconStyled
} from "./style";
import { Button } from "../Button";
import { color } from "../../../styles/styles";
import { Icon } from "../../icon";
import { fcStyles } from "../../../common/types";
import { FCThemeConsumer } from "../../../theming/FCTheme";
import { darken } from "polished";

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
  onCloseClick = () => {},
  onConfirmClick = () => {},
  visible = true,
  cancelText = "Cancel",
  confirmText = "Learn More",
  title,
  children,
  fcStyle,
  icon,
  ...rest
}: Props) => {
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

  return (
    <FCThemeConsumer>
      {themeContext => (
        <>
          {show && (
            <CornerDialogStyled
              visible={visible}
              fcStyle={fcStyle}
              fixed={fixed}
              theme={themeContext?.theme}
            >
              <DialogTitle fcStyle={fcStyle} theme={themeContext?.theme}>
                {title && title}
                <CloseButton
                  theme={themeContext?.theme}
                  onClick={(e: any) => onCloseClick()}
                  aria-label="Close"
                >
                  <Icon icon="times" />
                </CloseButton>
              </DialogTitle>
              <DialogContent theme={themeContext?.theme}>
                {icon && (
                  <IconStyled fcStyle={fcStyle}>
                    <Icon icon={icon} />
                  </IconStyled>
                )}
                <DialogText>{children}</DialogText>
              </DialogContent>
              <DialogFooter fcStyle={fcStyle} theme={themeContext?.theme}>
                <Button
                  buttonColor={
                    themeContext?.theme === "dark"
                      ? color.darkModeMedium
                      : color.mediumdark
                  }
                  onClick={() => onCloseClick()}
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={() => onConfirmClick()}
                  fcStyle={fcStyle}
                  primary
                >
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

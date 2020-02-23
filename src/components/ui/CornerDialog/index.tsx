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
    <>
      {show && (
        <CornerDialogStyled
          visible={visible}
          fcStyle={fcStyle}
          fixed={fixed}
        >
          <DialogTitle fcStyle={fcStyle}>
            {title && title}
            <CloseButton
              onClick={(e: any) => onCloseClick()}
              aria-label="Close"
            >
              <Icon icon="times" />
            </CloseButton>
          </DialogTitle>
          <DialogContent>
            {icon && (
              <IconStyled fcStyle={fcStyle}>
                <Icon icon={icon} />
              </IconStyled>
            )}
            <DialogText>{children}</DialogText>
          </DialogContent>
          <DialogFooter>
            <Button
              buttonColor={color.mediumdark}
              onClick={() => onCloseClick()}
            >
              {cancelText}
            </Button>
            <Button onClick={() => onConfirmClick()} fcStyle={fcStyle} primary>
              {confirmText}
            </Button>
          </DialogFooter>
        </CornerDialogStyled>
      )}
    </>
  );
};

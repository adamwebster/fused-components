import React from "react";
import { Button } from "../Button";
import {
  StyledDialog,
  DialogTitle,
  DialogContent,
  CloseButton,
  DialogFooter,
  Overlay
} from "./style";
import { color } from "../../../styles/styles";
import { Icon } from "../../icon";
import { fcStyles } from "../../../common/types";

export interface Props {
  /** Sets if the dialog has a box shadow */
  boxShadow?: boolean,
  /** Sets the tile of the dialog */
  title: string,
  /** Sets if the dialog should be visible */
  visible: boolean,
  /** Set the text for the confirm button */
  confirmText?: string,
  /** Sets what should happen when the close button is clicked */
  onCloseClick: () => void;
  /** Sets if the dialog should have a fixed position */
  fixed?: boolean,
  /** Set the style for the Dialog */
  fcStyle?: fcStyles,
  /** Set to show or not show the overlay */
  showOverlay?: boolean,
  /** Set the text for the cancel button */
  cancelText?: string,
  children: any,
}
export const Dialog = ({
  boxShadow = true,
  title,
  visible = false,
  confirmText = "Yes",
  children,
  onCloseClick = () => {},
  fixed = true,
  fcStyle,
  showOverlay = true,
  cancelText = "Cancel"
}:Props) => {
  return (
    <>
      {visible && (
        <>
          {showOverlay && <Overlay onClick={() => onCloseClick()} />}
          <StyledDialog fcStyle={fcStyle} visible={visible} fixed={fixed} boxShadow={boxShadow}>
            <DialogTitle fcStyle={fcStyle}> 
              <h2>{title}</h2>
              <CloseButton aria-label="Close" onClick={() => onCloseClick()}>
                <Icon icon="times" />
              </CloseButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogFooter>
              <Button
                buttonColor={color.mediumdark}
                onClick={() => onCloseClick()}
              >
                {cancelText}
              </Button>

              <Button primary fcStyle={fcStyle}>{confirmText}</Button>
            </DialogFooter>
          </StyledDialog>
        </>
      )}
    </>
  );
};
